import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVideoLessons } from "../../services/api";
import { useApiData } from "../../hooks/useApiData";
import { Card, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, PlayCircle, CheckCircle, Star } from "lucide-react";

export const WatchVideoPage = () => {
  const { id } = useParams();
  const { data: lessons = [], isLoading } = useApiData(
    "videoLessons",
    getVideoLessons,
  );
  const lesson = lessons.find((v) => v.id === id) || lessons[0];

  const getInitialLesson = (currentLesson) => {
    return (
      currentLesson?.modules?.[0]?.lessons?.[0] || {
        id: currentLesson?.id || "default-lesson",
        title: currentLesson?.title || "Aula Inaugural",
        duration: currentLesson?.duration || "15 min",
        videoUrl:
          currentLesson?.videoUrl ||
          "https://www.w3schools.com/html/mov_bbb.mp4",
      }
    );
  };

  const [activeLesson, setActiveLesson] = useState(() =>
    getInitialLesson(lesson),
  );

  useEffect(() => {
    if (lesson) {
      setActiveLesson(getInitialLesson(lesson));
    }
  }, [lesson?.id]);

  if (isLoading || !lesson) {
    return (
      <div
        className="p-12 text-center text-sm font-semibold text-zinc-500"
        role="status"
      >
        Carregando vídeo-aula…
      </div>
    );
  }

  const currentLesson = activeLesson || getInitialLesson(lesson);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Link
          to="/biblioteca"
          className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700"
        >
          <ArrowLeft size={16} />
          Voltar para Minha Biblioteca
        </Link>
        <Link to={`/avaliacao/${lesson.id}`}>
          <Button variant="outline" size="sm">
            <Star size={14} />
            <span>Avaliar esta Vídeo-aula</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
            <video
              src={currentLesson.videoUrl}
              controls
              autoPlay
              className="w-full aspect-video object-cover"
            />
          </div>

          <Card>
            <CardBody className="space-y-2">
              <span className="text-xs font-bold text-rose-600 uppercase">
                Assistindo agora:
              </span>
              <h1 className="text-xl font-bold text-zinc-900">
                {currentLesson.title}
              </h1>
              <p className="text-xs text-zinc-500">
                Curso: {lesson.title} • Por{" "}
                {lesson.creator?.name || "Professora"}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Modules Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardBody className="p-4 space-y-4">
              <h3 className="font-extrabold text-sm text-zinc-900 border-b border-rose-100 pb-2">
                Conteúdo do Curso
              </h3>

              <div className="space-y-3">
                {lesson.modules &&
                  lesson.modules.map((mod, modIdx) => (
                    <div key={modIdx} className="space-y-1.5">
                      <p className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                        {mod.title}
                      </p>
                      <div className="space-y-1">
                        {mod.lessons.map((les) => (
                          <button
                            key={les.id}
                            onClick={() => setActiveLesson(les)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${
                              currentLesson.id === les.id
                                ? "bg-rose-100 text-rose-900 font-bold border border-rose-200"
                                : "bg-zinc-50 text-zinc-700 hover:bg-rose-50"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <PlayCircle
                                size={14}
                                className={
                                  currentLesson.id === les.id
                                    ? "text-rose-600"
                                    : "text-zinc-400"
                                }
                              />
                              <span className="line-clamp-1">{les.title}</span>
                            </div>
                            <span className="text-[10px] text-zinc-400 shrink-0">
                              {les.duration}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
