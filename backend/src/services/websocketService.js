import crypto from 'crypto';

const clients = new Set();

const createFrame = (text) => {
  const payload = Buffer.from(text, 'utf-8');
  const length = payload.length;
  let header;

  if (length <= 125) {
    header = Buffer.from([0x81, length]);
  } else if (length <= 65535) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  return Buffer.concat([header, payload]);
};

/**
 * Transmite mensagem para todos os clientes conectados via WebSocket em tempo real.
 */
export const broadcastWebSocketMessage = (data) => {
  const json = JSON.stringify({ type: 'new_message', message: data });
  const frame = createFrame(json);
  for (const socket of clients) {
    try {
      if (!socket.destroyed) {
        socket.write(frame);
      } else {
        clients.delete(socket);
      }
    } catch {
      clients.delete(socket);
    }
  }
};

/**
 * Servidor WebSocket nativo (RFC 6455) sem dependências externas.
 */
export const setupWebSocketServer = (httpServer) => {
  httpServer.on('upgrade', (req, socket) => {
    const url = req.url || '';
    if (!url.startsWith('/ws') && !url.startsWith('/api/ws')) {
      socket.destroy();
      return;
    }

    const key = req.headers['sec-websocket-key'];
    if (!key) {
      socket.destroy();
      return;
    }

    const acceptKey = crypto
      .createHash('sha1')
      .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
      .digest('base64');

    const responseHeaders = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${acceptKey}`,
      '\r\n'
    ];

    socket.write(responseHeaders.join('\r\n'));
    clients.add(socket);

    socket.on('data', (buffer) => {
      try {
        const opcode = buffer[0] & 0x0f;

        if (opcode === 8) {
          clients.delete(socket);
          socket.end();
          return;
        }

        if (opcode === 9) {
          socket.write(Buffer.from([0x8a, 0x00]));
          return;
        }

        if (opcode === 1) {
          const isMasked = (buffer[1] & 0x80) === 0x80;
          let length = buffer[1] & 0x7f;
          let offset = 2;

          if (length === 126) {
            length = buffer.readUInt16BE(2);
            offset = 4;
          } else if (length === 127) {
            length = Number(buffer.readBigUInt64BE(2));
            offset = 10;
          }

          let payload;
          if (isMasked) {
            const mask = buffer.slice(offset, offset + 4);
            offset += 4;
            payload = Buffer.alloc(length);
            for (let i = 0; i < length; i++) {
              payload[i] = buffer[offset + i] ^ mask[i % 4];
            }
          } else {
            payload = buffer.slice(offset, offset + length);
          }

          const text = payload.toString('utf-8');
          const data = JSON.parse(text);

          if (data.type === 'send_message' && data.message) {
            broadcastWebSocketMessage(data.message);
          }
        }
      } catch {
        // Frame ignorado em caso de parsing parcial
      }
    });

    socket.on('close', () => clients.delete(socket));
    socket.on('error', () => clients.delete(socket));
  });

  console.log(`[WebSocket] Servidor de mensagens em tempo real ativo em ws://localhost:${httpServer.address()?.port || 3001}/ws`);
};
