import React, { useState, useRef } from "react";
import { Avatar } from "../ui/Avatar";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getStories } from "../../services/api";
import { useApiData } from "../../hooks/useApiData";
import { useRole } from "../../context/RoleContext";
import { StoryViewerModal } from "./StoryViewerModal";

export const StoryBar = () => {
  const { currentUser, currentRole } = useRole();
  const [activeStory, setActiveStory] = useState(null);
  const { data: stories = [] } = useApiData("stories", getStories);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group bg-white rounded-2xl p-4 border border-[#E8CCD4] shadow-craft mb-6 max-w-full">
      {/* Botão anterior do carrossel */}
      <button
        onClick={() => scroll("left")}
        aria-label="Rolar stories para a esquerda"
        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/95 text-[#B94F70] rounded-full items-center justify-center border border-[#E8CCD4] shadow-md hover:scale-110 hover:bg-[#F6DDE5] transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Conteúdo rolável */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth px-1"
      >
        {/* Adicionar Story com dados do usuário logado */}
        <Link
          to={currentRole === "guest" ? "/login" : "/stories/criar"}
          className="flex flex-col items-center gap-1.5 group cursor-pointer shrink-0"
        >
          <div className="relative">
            <Avatar
              src={currentUser?.avatar}
              alt={currentUser?.name || "Seu Story"}
              size="lg"
            />
            <div className="absolute bottom-0 right-0 bg-[#B94F70] text-white p-1 rounded-full border-2 border-white shadow-xs group-hover:scale-110 transition-transform">
              <Plus size={12} strokeWidth={3} />
            </div>
          </div>
          <span className="text-xs font-bold text-[#251D20] group-hover:text-[#B94F70] transition-colors">
            Seu Story
          </span>
        </Link>

        {/* Stories da comunidade */}
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none shrink-0"
          >
            <Avatar
              src={story.avatar}
              alt={story.authorName}
              size="lg"
              hasStory={story.hasStory}
              isUnseen={story.hasUnseen}
              className="group-hover:scale-105 transition-transform"
            />
            <span className="text-xs font-bold text-[#251D20] group-hover:text-[#B94F70] max-w-[72px] truncate transition-colors">
              {story.authorName}
            </span>
          </button>
        ))}
      </div>

      {/* Botão próximo do carrossel */}
      <button
        onClick={() => scroll("right")}
        aria-label="Rolar stories para a direita"
        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/95 text-[#B94F70] rounded-full items-center justify-center border border-[#E8CCD4] shadow-md hover:scale-110 hover:bg-[#F6DDE5] transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={16} />
      </button>

      {activeStory && (
        <StoryViewerModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </div>
  );
};
