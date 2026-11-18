import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useChat } from '../../context/ApiChatContext';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import {
  MessageCircle,
  User,
  Search,
  BookOpen,
  Video,
  Home,
  Sparkles,
  ShieldAlert,
  LogOut
} from 'lucide-react';

export const Navbar = () => {
  const { currentRole, currentUser, logout } = useRole();
  const location = useLocation();
  const { totalUnreadCount } = useChat();

  const isLogged = currentRole !== 'guest' && Boolean(currentUser?.id);

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-[#E8CCD4] shadow-2xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo - Always links to Initial Page ('/') */}
          <Link to="/" title="Ir para a Página Inicial">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#F6DDE5]/80 p-1.5 rounded-full border border-[#E8CCD4]">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/'
                  ? 'bg-[#B94F70] text-white shadow-xs'
                  : 'text-[#251D20] hover:text-[#B94F70] hover:bg-white/60'
              }`}
            >
              <Home size={15} />
              <span>Início</span>
            </Link>
            <Link
              to="/feed"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/feed'
                  ? 'bg-[#B94F70] text-white shadow-xs'
                  : 'text-[#251D20] hover:text-[#B94F70] hover:bg-white/60'
              }`}
            >
              <Sparkles size={15} />
              <span>Feed</span>
            </Link>
            <Link
              to="/pesquisa"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname === '/pesquisa'
                  ? 'bg-[#B94F70] text-white shadow-xs'
                  : 'text-[#251D20] hover:text-[#B94F70] hover:bg-white/60'
              }`}
            >
              <Search size={15} />
              <span>Explorar</span>
            </Link>
            <Link
              to="/videoaulas"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname.startsWith('/videoaulas')
                  ? 'bg-[#B94F70] text-white shadow-xs'
                  : 'text-[#251D20] hover:text-[#B94F70] hover:bg-white/60'
              }`}
            >
              <Video size={15} />
              <span>Aulas</span>
            </Link>
            <Link
              to="/materiais"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                location.pathname.startsWith('/materiais')
                  ? 'bg-[#B94F70] text-white shadow-xs'
                  : 'text-[#251D20] hover:text-[#B94F70] hover:bg-white/60'
              }`}
            >
              <BookOpen size={15} />
              <span>Materiais</span>
            </Link>

            {/* Link para Criadora se estiver logada com perfil de criadora */}
            {currentRole === 'creator' && (
              <Link
                to="/criador/videoaulas"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                  location.pathname.startsWith('/criador')
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-purple-700 hover:text-purple-900 hover:bg-purple-100/60'
                }`}
              >
                <Video size={15} />
                <span>Minhas Aulas</span>
              </Link>
            )}

            {/* Link para Admin se for admin */}
            {currentRole === 'admin' && (
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-[#251D20] text-white shadow-xs'
                    : 'text-[#251D20] hover:text-[#B94F70] hover:bg-white/60'
                }`}
              >
                <ShieldAlert size={15} />
                <span>Painel Admin</span>
              </Link>
            )}

            {/* Link para Perfil na barra de navegação exibido apenas para usuário logado */}
            {isLogged && (
              <Link
                to="/perfil"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  location.pathname === '/perfil'
                    ? 'bg-[#B94F70] text-white shadow-xs'
                    : 'text-[#251D20] hover:text-[#B94F70] hover:bg-white/60'
                }`}
              >
                <User size={15} />
                <span>Perfil</span>
              </Link>
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Top Right Site Icon Button linking to Initial Page */}
            <Link
              to="/"
              className={`hidden sm:block p-2.5 text-[#251D20] hover:text-[#B94F70] hover:bg-[#F6DDE5] rounded-full transition-all duration-200 ${
                location.pathname === '/' ? 'text-[#B94F70] bg-[#F6DDE5]' : ''
              }`}
              title="Página Inicial"
              aria-label="Página Inicial"
            >
              <Home size={20} />
            </Link>

            {/* Quick Chat Shortcut Icon */}
            <Link
              to="/chat"
              className="relative p-2.5 text-[#251D20] hover:text-[#B94F70] hover:bg-[#F6DDE5] rounded-full transition-all duration-200"
              title="Mensagens Privadas"
              aria-label="Mensagens"
            >
              <MessageCircle size={20} className={location.pathname === '/chat' ? 'text-[#B94F70] fill-[#F6DDE5]' : ''} />
              {totalUnreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#B94F70] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse-glow">
                  {totalUnreadCount}
                </span>
              )}
            </Link>

            {!isLogged ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="rounded-full text-xs font-bold text-[#B94F70]">Entrar</Button>
                </Link>
                <Link to="/cadastro">
                  <Button variant="primary" size="sm" className="rounded-full text-xs font-black bg-[#B94F70] text-white">Criar Conta</Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/perfil"
                  className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
                    location.pathname === '/perfil'
                      ? 'bg-[#B94F70] text-white border-[#B94F70] shadow-2xs'
                      : 'bg-white text-[#251D20] hover:bg-[#F6DDE5] hover:text-[#B94F70] border-[#E8CCD4]'
                  }`}
                  title={`Logado como: ${currentUser?.name || 'Perfil'}`}
                >
                  <User size={15} />
                  <span>{currentUser?.name ? currentUser.name.split(' ')[0] : 'Perfil'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="hidden sm:flex p-2 text-[#715B62] hover:text-[#B94F70] hover:bg-[#F6DDE5] rounded-full transition-all"
                  title="Sair da conta"
                  aria-label="Sair"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
