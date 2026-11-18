import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { createApp } from '../src/app.js';

describe('Express + Zod Integration Tests', () => {
  let app;
  let server;
  let baseUrl;

  // Helper resiliente que dispara requisições diretamente na instância Express
  // sem depender de abertura de socket TCP de rede (evita EACCES em sandbox e Windows)
  const dispatch = (method, path, body, headers = {}) => {
    return new Promise((resolve, reject) => {
      const socket = {
        remoteAddress: '127.0.0.1',
        destroy: () => {},
        encrypted: false
      };
      const req = new EventEmitter();
      req.method = method;
      req.url = path;
      req.connection = socket;
      req.socket = socket;
      req.headers = { 'content-type': 'application/json', ...headers };

      const res = new EventEmitter();
      res.statusCode = 200;
      res._headers = {};
      res.setHeader = (k, v) => { res._headers[k.toLowerCase()] = v; };
      res.getHeader = (k) => res._headers[k.toLowerCase()];
      let resBody = '';
      res.write = (chunk) => { resBody += chunk; };
      res.end = (chunk) => {
        if (chunk) resBody += chunk;
        let parsed = null;
        try { parsed = JSON.parse(resBody); } catch (_) { parsed = resBody; }
        resolve({ status: res.statusCode, body: parsed });
      };

      try {
        app(req, res);
        if (body) {
          req.emit('data', Buffer.from(JSON.stringify(body)));
        }
        req.emit('end');
      } catch (err) {
        reject(err);
      }
    });
  };

  before((_, done) => {
    process.env.NODE_ENV = 'test';
    app = createApp();
    // Vincula o servidor explicitamente a 127.0.0.1 para compatibilidade de rede
    server = app.listen(0, '127.0.0.1', () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      done();
    });
  });

  after((_, done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  it('deve rejeitar POST /auth/login com 400 e campo faltante', async () => {
    const data = await dispatch('POST', '/auth/login', { email: 'teste@fioafio.com' });

    assert.equal(data.status, 400);
    assert.equal(data.body.error, 'Erro de validação');
    assert.ok(data.body.details.some(d => d.field === 'password'));
  });

  it('deve rejeitar POST /posts com 400 quando título e conteúdo forem curtos', async () => {
    const data = await dispatch('POST', '/posts', { title: 'A', content: 'B' });

    assert.equal(data.status, 400);
    assert.equal(data.body.error, 'Erro de validação');
    assert.ok(data.body.details.some(d => d.field === 'title'));
    assert.ok(data.body.details.some(d => d.field === 'content'));
  });

  it('deve rejeitar POST /comments com 400 quando campos obrigatórios faltarem', async () => {
    const data = await dispatch('POST', '/comments', { text: '' });

    assert.equal(data.status, 400);
    assert.equal(data.body.error, 'Erro de validação');
    assert.ok(data.body.details.some(d => d.field === 'postId'));
    assert.ok(data.body.details.some(d => d.field === 'text'));
  });
});
