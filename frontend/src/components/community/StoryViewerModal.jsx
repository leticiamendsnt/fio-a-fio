import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { getStories } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';

export const StoryViewerModal = ({ story: initialStory, onClose }) => {
  const { data: stories = [] } = useApiData('stories', getStories);
  const storiesList = stories.filter(story => story.hasStory);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = storiesList.findIndex(s => s.id === initialStory?.id);
    return idx >= 0 ? idx : 0;
  });

  // Sincroniza índice quando a lista de stories carrega ou o story inicial muda
  useEffect(() => {
    if (initialStory && storiesList.length > 0) {
      const idx = storiesList.findIndex(s => s.id === initialStory.id);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, [initialStory?.id, storiesList.length]);

  const currentStory = storiesList[currentIndex] || initialStory || storiesList[0];

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Timer loop for story progress
  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentIndex < storiesList.length - 1) {
              setCurrentIndex(c => c + 1);
              return 0;
            } else {
              clearInterval(timer);
              onClose();
              return 100;
            }
          }
          return prev + 1.5;
        });
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, onClose, storiesList.length]);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex < storiesList.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
    }
  };

  // Keyboard controls: Space (Pause), ArrowLeft (Prev), ArrowRight (Next), Escape (Close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose]);

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#251D20]/85 backdrop-blur-xl p-4 animate-fade-in">
      {/* Ambient Blurred Background for Depth */}
      {currentStory.mediaUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-3xl scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${currentStory.mediaUrl})` }}
        />
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 text-white hover:text-[#B94F70] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg border border-white/20"
        aria-label="Fechar Story"
      >
        <X size={22} />
      </button>

      {/* Prev Story Arrow Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden sm:flex absolute left-6 z-50 text-white hover:text-[#B94F70] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg border border-white/20"
          aria-label="Story Anterior"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next Story Arrow Button */}
      {currentIndex < storiesList.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute right-6 z-50 text-white hover:text-[#B94F70] p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg border border-white/20"
          aria-label="Próximo Story"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Main Story Card Player Container */}
      <div
        className="relative w-full max-w-sm h-[min(82dvh,640px)] aspect-[9/16] bg-[#251D20] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#E8CCD4]/30 select-none group z-10"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Story Progress Indicators Header */}
        <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5 items-center">
          {storiesList.map((st, idx) => {
            let itemProgress = 0;
            if (idx < currentIndex) itemProgress = 100;
            else if (idx === currentIndex) itemProgress = progress;

            return (
              <div key={st.id} className="h-1.5 bg-white/30 rounded-full flex-1 overflow-hidden backdrop-blur-xs">
                <div
                  className="h-full bg-[#B94F70] transition-all duration-100 ease-linear shadow-xs"
                  style={{ width: `${itemProgress}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Story Author Header */}
        <div className="absolute top-7 left-4 right-4 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={currentStory.avatar} alt={currentStory.authorName} size="sm" className="border-2 border-[#B94F70]" />
            <div className="text-white drop-shadow-md">
              <p className="text-xs font-black leading-none">{currentStory.authorName}</p>
              <p className="text-[10px] font-semibold text-white/80 mt-0.5">{currentStory.createdAt}</p>
            </div>
          </div>

          {/* Pause / Play Manual Toggle Button */}
          <div className="flex items-center gap-2">
            {isPaused && (
              <span className="bg-[#B94F70] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
                Pausado
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPaused(!isPaused);
              }}
              className="p-2 text-white bg-black/40 hover:bg-[#B94F70] backdrop-blur-md rounded-full transition-colors border border-white/20"
              title={isPaused ? "Continuar Story (Espaço)" : "Pausar Story (Espaço)"}
              aria-label={isPaused ? "Continuar" : "Pausar"}
            >
              {isPaused ? <Play size={16} className="translate-x-0.5" /> : <Pause size={16} />}
            </button>
          </div>
        </div>

        {/* Touch tap left/right overlay areas */}
        <div
          onClick={handlePrev}
          className="absolute left-0 top-16 bottom-20 w-1/3 z-20 cursor-pointer"
        />
        <div
          onClick={handleNext}
          className="absolute right-0 top-16 bottom-20 w-1/3 z-20 cursor-pointer"
        />

        {/* Story Media Image */}
        <img
          src={currentStory.mediaUrl}
          alt={currentStory.caption || 'Story'}
          className="w-full h-full object-cover"
        />

        {/* Caption Overlay */}
        {currentStory.caption && (
          <div className="absolute bottom-6 left-4 right-4 z-30 bg-[#251D20]/85 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8CCD4]/30 text-white text-xs text-center font-medium leading-relaxed shadow-lg">
            {currentStory.caption}
          </div>
        )}
      </div>

      {/* Miniaturas de carrossel para navegação rápida entre stories */}
      {storiesList.length > 1 && (
        <div className="absolute bottom-3 left-4 right-4 z-40 flex items-center justify-center gap-2.5 overflow-x-auto py-2 no-scrollbar">
          {storiesList.map((st, idx) => (
            <button
              key={st.id}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`p-0.5 rounded-full transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? 'ring-3 ring-[#B94F70] scale-110 shadow-lg bg-white'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
              title={`Story de ${st.authorName}`}
              aria-label={`Ver story ${idx + 1} de ${st.authorName}`}
            >
              <Avatar src={st.avatar} alt={st.authorName} size="xs" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
