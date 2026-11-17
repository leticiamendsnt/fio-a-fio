import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { useChat } from "../../context/ApiChatContext";
import { getUsers } from "../../services/api";
import { useApiData } from "../../hooks/useApiData";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import {
  MessageCircle,
  Send,
  Search,
  User,
  ArrowLeft,
  CheckCheck,
  Check,
  Plus,
} from "lucide-react";

export const ChatPage = () => {
  const { currentUser } = useRole();
  const {
    conversations,
    conversationsLoaded,
    activeConversationId,
    setActiveConversationId,
    activeConversation,
    sendMessage,
    markAsRead,
    getOrCreateConversationWithUser,
    isWsConnected,
  } = useChat();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: users = [] } = useApiData("users", getUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Disable body scroll when ChatPage is active to prevent outer page scrollbar
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Check query param (e.g., /chat?userId=usr-2 or /chat?user=mariabordadeira)
  useEffect(() => {
    if (!conversationsLoaded) return;
    const targetUserId = searchParams.get("userId") || searchParams.get("user");
    if (targetUserId) {
      const foundUser = users.find(
        (u) => u.id === targetUserId || u.username === targetUserId,
      );
      if (foundUser) {
        getOrCreateConversationWithUser(currentUser.id, foundUser).then(
          setActiveConversationId,
        );
      }
    } else if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [searchParams, conversations, conversationsLoaded, users]);

  // Mark conversation as read on select
  useEffect(() => {
    if (activeConversationId) {
      markAsRead(activeConversationId);
    }
  }, [activeConversationId]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, inputText, currentUser.id);
    setInputText("");
  };

  // Helper seguro para identificar o outro participante na conversa
  const getOtherParticipant = (conv) => {
    if (
      !conv ||
      !Array.isArray(conv.participants) ||
      conv.participants.length === 0
    ) {
      return {
        id: "usr-fallback",
        name: "Usuária Fio a Fio",
        username: "crocheteira",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "user",
      };
    }
    const other = conv.participants.find(
      (p) =>
        p && p.id !== currentUser?.id && p.username !== currentUser?.username,
    );
    return (
      other ||
      conv.participants[0] || {
        id: "usr-fallback",
        name: "Usuária Fio a Fio",
        username: "crocheteira",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "user",
      }
    );
  };

  const filteredConversations = conversations.filter((conv) => {
    const other = getOtherParticipant(conv);
    const search = searchTerm.trim().toLowerCase();
    if (!search) return true;
    const nameMatch = other?.name
      ? other.name.toLowerCase().includes(search)
      : false;
    const usernameMatch = other?.username
      ? other.username.toLowerCase().includes(search)
      : false;
    return nameMatch || usernameMatch;
  });

  const activeOtherUser = activeConversation
    ? getOtherParticipant(activeConversation)
    : null;

  return (
    <div className="fixed inset-x-0 top-14 sm:top-16 bottom-16 sm:bottom-20 z-30 flex items-center justify-center p-3 sm:p-6 bg-[#F8E9ED]">
      <Card className="w-full max-w-5xl h-full min-h-0 flex overflow-hidden border border-[#E8CCD4] shadow-2xl rounded-2xl sm:rounded-3xl bg-white">
        {/* Left Column: Conversations List with Internal Scrollbar */}
        <div
          className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-[#E8CCD4] bg-[#F6DDE5]/40 shrink-0 ${
            activeConversationId ? "hidden md:flex" : "flex"
          }`}
        >
          {/* List Header */}
          <div className="p-4 border-b border-[#E8CCD4] bg-white/95 backdrop-blur-md shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F6DDE5] text-[#B94F70] flex items-center justify-center font-bold">
                  💬
                </div>
                <h1 className="font-extrabold text-lg text-[#251D20]">
                  Mensagens
                </h1>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B94F70]"
              />
              <input
                type="text"
                placeholder="Buscar conversa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-full border border-[#E8CCD4] text-[#251D20] placeholder-[#715B62] focus:outline-none focus:ring-2 focus:ring-[#B94F70]/50 shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Conversations Items: Dedicated Internal Scrollbar on Left */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 space-y-1.5 divide-y divide-[#F6DDE5]">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-[#715B62] space-y-2">
                <MessageCircle size={32} className="mx-auto text-[#D98CA1]" />
                <p className="text-xs font-semibold">
                  Nenhuma conversa encontrada
                </p>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const other = getOtherParticipant(conv);
                const isSelected = conv.id === activeConversationId;
                const unread = conv.unreadCount > 0;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 text-left ${
                      isSelected
                        ? "bg-[#B94F70] text-white shadow-md shadow-[#B94F70]/20 scale-[1.01]"
                        : "hover:bg-[#F6DDE5] bg-white/60 text-[#251D20]"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <Avatar
                        src={other?.avatar}
                        alt={other?.name || "Usuária"}
                        size="md"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-extrabold truncate ${isSelected ? "text-white" : "text-[#251D20]"}`}
                        >
                          {other?.name || "Usuária"}
                        </span>
                        {conv.lastMessage && (
                          <span
                            className={`text-[10px] font-medium ${isSelected ? "text-[#F6DDE5]" : "text-[#715B62]"}`}
                          >
                            {conv.lastMessage.timestamp}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-0.5">
                        <p
                          className={`text-[11px] truncate ${
                            isSelected
                              ? "text-[#F6DDE5] font-medium"
                              : unread
                                ? "font-bold text-[#251D20]"
                                : "text-[#715B62]"
                          }`}
                        >
                          {conv.lastMessage?.text || "Sem mensagens"}
                        </p>
                        {unread && !isSelected && (
                          <span className="ml-1.5 shrink-0 bg-[#B94F70] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Chat Thread */}
        <div
          className={`flex-1 flex flex-col bg-[#F8E9ED]/30 ${
            !activeConversationId ? "hidden md:flex" : "flex"
          }`}
        >
          {activeConversation && activeOtherUser ? (
            <>
              {/* Thread Header */}
              <div className="p-3.5 px-3 sm:px-6 border-b border-[#E8CCD4] bg-white/95 backdrop-blur-md flex items-center justify-between gap-2 shadow-2xs shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConversationId(null)}
                    className="md:hidden p-1.5 text-[#251D20] hover:text-[#B94F70] rounded-full hover:bg-[#F6DDE5]"
                    aria-label="Voltar para conversas"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <Avatar
                    src={activeOtherUser?.avatar}
                    alt={activeOtherUser?.name || "Conversa"}
                    size="md"
                  />

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-extrabold text-sm text-[#251D20]">
                        {activeOtherUser?.name || "Conversa"}
                      </h2>
                      {activeOtherUser?.role === "creator" && (
                        <span className="bg-[#F6DDE5] text-[#B94F70] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#D98CA1]/50">
                          Professora 🧶
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[11px] text-[#715B62]">
                        @{activeOtherUser?.username || "crocheteira"} • On-line
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                          isWsConnected
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${isWsConnected ? "bg-emerald-500 animate-pulse" : "bg-zinc-400"}`}
                        />
                        {isWsConnected ? "WebSocket Ativo" : "Sincronizado"}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate(`/perfil?user=${activeOtherUser?.username || ""}`)
                  }
                  className="rounded-full text-xs font-bold border-[#E8CCD4] text-[#251D20] hover:bg-[#F6DDE5] hover:text-[#B94F70]"
                >
                  <User size={14} />
                  <span className="hidden sm:inline">Ver Perfil</span>
                </Button>
              </div>

              {/* Messages Container */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-3 bg-[#FFF9FB]">
                <div className="text-center my-2">
                  <span className="bg-[#F6DDE5] text-[#B94F70] text-[10px] font-bold px-3.5 py-1 rounded-full border border-[#D98CA1]/60 shadow-2xs">
                    Conversa segura e privada no Fio a Fio 🧶
                  </span>
                </div>

                {activeConversation.messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[70%] ${
                        isMe ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`p-3.5 px-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isMe
                            ? "bg-[#B94F70] text-white rounded-2xl rounded-br-xs font-medium shadow-sm"
                            : "bg-white text-[#251D20] border border-[#E8CCD4] rounded-2xl rounded-bl-xs font-normal"
                        }`}
                      >
                        {msg.text}
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-[10px] text-[#715B62] px-1">
                        <span>{msg.timestamp}</span>
                        {isMe && (
                          <CheckCheck size={12} className="text-[#B94F70]" />
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSend}
                className="p-3 sm:p-4 bg-white border-t border-[#E8CCD4] flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  placeholder="Escreva sua mensagem com carinho..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#F6DDE5]/50 border border-[#E8CCD4] rounded-full text-xs sm:text-sm text-[#251D20] placeholder-[#715B62] focus:outline-none focus:ring-2 focus:ring-[#B94F70]/60 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-10 h-10 rounded-full bg-[#B94F70] hover:bg-[#963B58] text-white flex items-center justify-center shadow-md shadow-[#B94F70]/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 shrink-0"
                  aria-label="Enviar mensagem"
                >
                  <Send size={18} className="translate-x-0.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#FFF9FB] space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F6DDE5] text-[#B94F70] flex items-center justify-center text-2xl shadow-inner">
                💬
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="font-extrabold text-base text-[#251D20]">
                  Suas Conversas no Fio a Fio
                </h3>
                <p className="text-xs text-[#715B62]">
                  Selecione uma pessoa ao lado para conversar sobre receitas,
                  fios e tirar dúvidas.
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
