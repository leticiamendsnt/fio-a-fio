import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createRecord, getConversations, getUsers, updateRecord } from '../services/api';
import { useApiData } from '../hooks/useApiData';

const ChatContext = createContext();

const getWsUrl = () => {
  if (import.meta.env.VITE_WS_URL) return import.meta.env.VITE_WS_URL;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  return apiUrl.replace(/^http/, 'ws') + '/ws';
};

export const ChatProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { data: conversations = [], isFetched: conversationsLoaded } = useApiData('conversations', getConversations);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);

  const activeConversation = conversations.find(item => item.id === activeConversationId) || null;
  const totalUnreadCount = conversations.reduce((total, item) => total + (item.unreadCount || 0), 0);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['conversations'] });

  // Conexão WebSocket para mensagens em tempo real
  useEffect(() => {
    let isMounted = true;

    const connectWebSocket = () => {
      try {
        const wsUrl = getWsUrl();
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!isMounted) return;
          setIsWsConnected(true);
        };

        ws.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'new_message' && data.message) {
              const incoming = data.message;

              // Atualiza o cache do React Query em tempo real instantaneamente
              queryClient.setQueryData(['conversations'], (old = []) => {
                return old.map((conv) => {
                  if (conv.id === incoming.conversationId) {
                    const exists = conv.messages?.some((m) => m.id === incoming.id);
                    if (exists) return conv;
                    const updatedMessages = [...(conv.messages || []), incoming];
                    return {
                      ...conv,
                      messages: updatedMessages,
                      lastMessage: incoming,
                      unreadCount: incoming.conversationId === activeConversationId ? 0 : (conv.unreadCount || 0) + 1,
                    };
                  }
                  return conv;
                });
              });

              refresh();
            }
          } catch {
            // Ignora falha de parse
          }
        };

        ws.onclose = () => {
          if (!isMounted) return;
          setIsWsConnected(false);
          // Reconecta automaticamente após 3 segundos
          reconnectTimerRef.current = setTimeout(connectWebSocket, 3000);
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch {
        if (!isMounted) return;
        setIsWsConnected(false);
        reconnectTimerRef.current = setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [activeConversationId, queryClient]);

  const sendMessage = async (conversationId, text, senderId) => {
    if (!text.trim()) return;
    const cleanText = text.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const localId = 'msg-' + Math.random().toString(36).substring(2, 9);

    const messagePayload = {
      id: localId,
      conversationId,
      senderId,
      text: cleanText,
      timestamp,
      read: true,
    };

    // 1. Atualização otimista imediata na interface
    queryClient.setQueryData(['conversations'], (old = []) => {
      return old.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...(conv.messages || []), messagePayload],
            lastMessage: messagePayload,
          };
        }
        return conv;
      });
    });

    // 2. Emissão via WebSocket caso conectado
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(
          JSON.stringify({
            type: 'send_message',
            message: messagePayload,
          })
        );
      } catch (err) {
        console.warn('[WebSocket] Falha no envio via socket:', err);
      }
    }

    // 3. Persistência permanente no banco de dados via REST
    try {
      await createRecord('messages', {
        conversationId,
        senderId,
        text: cleanText,
        timestamp,
        read: true,
      });
      await updateRecord('conversations', conversationId, { unreadCount: 0 });
    } catch {
      // Ignora falha de rede temporária se offline
    }
    await refresh();
  };

  const markAsRead = async (conversationId) => {
    const conversation = conversations.find(item => item.id === conversationId);
    if (!conversation || (!conversation.unreadCount && conversation.lastMessage?.read)) return;
    const lastMessage = conversation.messages?.at(-1);
    if (lastMessage) await updateRecord('messages', lastMessage.id, { read: true });
    await updateRecord('conversations', conversationId, { unreadCount: 0 });
    await refresh();
  };

  const getOrCreateConversationWithUser = async (currentUserId, targetUser) => {
    const existing = conversations.find(item =>
      item.participants?.some(user => user && user.id === currentUserId) &&
      item.participants?.some(user => user && user.id === targetUser.id)
    );
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const users = await getUsers();
    const currentUser = users.find(user => user.id === currentUserId) || users[0];
    const conversation = await createRecord('conversations', {
      participantIds: [currentUser.id, targetUser.id],
      unreadCount: 0,
    });
    await createRecord('messages', {
      conversationId: conversation.id,
      senderId: currentUser.id,
      text: 'Olá! Gostaria de conversar com você sobre o seu conteúdo no Fio a Fio 🧶',
      timestamp: 'Agora',
      read: true,
    });
    await refresh();
    setActiveConversationId(conversation.id);
    return conversation.id;
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        conversationsLoaded,
        activeConversationId,
        setActiveConversationId,
        activeConversation,
        totalUnreadCount,
        sendMessage,
        markAsRead,
        getOrCreateConversationWithUser,
        isWsConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
