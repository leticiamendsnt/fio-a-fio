import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useChat } from '../../context/ApiChatContext';
import { Avatar } from '../ui/Avatar';
import {
  Home,
  Search,
  MessageCircle,
  Video,
  User,
  ShieldAlert,
  BookOpen
} from 'lucide-react';

export const BottomNavbar = () => {
  const { currentRole, currentUser } = useRole();
  const location = useLocation();
  const { totalUnreadCount } = useChat();

  if (['/login', '/cadastro', '/registro', '/stories'].includes(location.pathname)) {
    return null;
  }

  const getNavItems = () => {
    const isLogged = currentRole !== 'guest' && Boolean(currentUser?.id);

    if (!isLogged) {
      return [
        { to: '/', label: 'Início', icon: Home },
        { to: '/pesquisa', label: 'Explorar', icon: Search },
        { to: '/videoaulas', label: 'Aulas', icon: Video },
        { to: '/materiais', label: 'Materiais', icon: BookOpen },
        { to: '/login', label: 'Entrar', icon: User },
      ];
    }

    if (currentRole === 'admin') {
      return [
        { to: '/admin/dashboard', label: 'Painel', icon: ShieldAlert },
        { to: '/feed', label: 'Feed', icon: Home },
        { to: '/chat', label: 'Mensagens', icon: MessageCircle, badge: totalUnreadCount },
        { to: '/admin/publicacoes', label: 'Moderar', icon: BookOpen },
        { to: '/perfil', label: 'Perfil', icon: User, isAvatar: true },
      ];
    }

    if (currentRole === 'creator') {
      return [
        { to: '/feed', label: 'Feed', icon: Home },
        { to: '/pesquisa', label: 'Pesquisar', icon: Search },
        { to: '/chat', label: 'Mensagens', icon: MessageCircle, badge: totalUnreadCount },
        { to: '/criador/videoaulas', label: 'Aulas', icon: Video },
        { to: '/perfil', label: 'Perfil', icon: User, isAvatar: true },
      ];
    }

    return [
      { to: '/feed', label: 'Feed', icon: Home },
      { to: '/pesquisa', label: 'Pesquisar', icon: Search },
      { to: '/chat', label: 'Mensagens', icon: MessageCircle, badge: totalUnreadCount },
      { to: '/videoaulas', label: 'Aulas', icon: Video },
      { to: '/perfil', label: 'Perfil', icon: User, isAvatar: true },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8CCD4] bg-white/95 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-[0_-4px_18px_rgba(37,29,32,0.06)] backdrop-blur-xl"
      aria-label="Navegação Principal Inferior"
    >
      <div className="mx-auto flex w-full max-w-md items-stretch justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== '/' && item.to !== '/feed' && location.pathname.startsWith(item.to));

          if (item.highlight) {
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 group focus-visible:outline-offset-[-2px]"
                aria-label={item.label}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#B94F70] hover:bg-[#963B58] text-white flex items-center justify-center shadow-md shadow-[#B94F70]/25 group-hover:scale-110 group-active:scale-95 transition-all duration-200">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <span className="text-[10px] font-bold text-[#B94F70] mt-0.5">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 transition-colors duration-200 group focus-visible:outline-offset-[-2px] ${
                isActive ? 'bg-[#F6DDE5] text-[#963B58] font-bold' : 'text-[#715B62] hover:bg-[#F8E9ED] hover:text-[#963B58]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.isAvatar && currentUser?.avatar ? (
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <div className={`rounded-full p-[1.5px] transition-all duration-200 ${
                    isActive
                      ? 'ring-2 ring-[#B94F70] ring-offset-1 ring-offset-white'
                      : 'ring-1 ring-transparent group-hover:ring-[#D98CA1]'
                  }`}>
                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="xs" className="w-5 h-5 object-cover rounded-full" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={`transition-transform duration-200 ${isActive ? 'text-[#963B58]' : 'group-hover:text-[#963B58]'}`}
                  />
                  {item.badge > 0 && (
                    <span aria-label={`${item.badge} mensagens não lidas`} className="absolute -top-1.5 -right-2 bg-[#B94F70] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse-glow">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
              )}

              <span className={`max-w-full truncate text-[10px] leading-tight tracking-tight transition-all ${
                isActive ? 'font-black text-[#963B58]' : 'font-semibold text-[#715B62]'
              }`}>
                {item.label}
              </span>

              {isActive && !item.isAvatar && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#963B58]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
