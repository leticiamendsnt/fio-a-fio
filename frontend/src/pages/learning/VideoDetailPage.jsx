import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVideoLessons, getLessonReviews } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StarRating } from '../../components/ui/StarRating';
import { ArrowLeft, Clock, ShoppingCart, CheckCircle, PlayCircle, Award, Edit, Star } from 'lucide-react';

export const VideoDetailPage = () => {
  const { id } = useParams();
  const { currentUser, currentRole } = useRole();
  const { data: lessons = [] } = useApiData('videoLessons', getVideoLessons);
  const lesson = lessons.find((v) => v.id === id) || lessons[0];
  const { data: reviews = [] } = useApiData(['lessonReviews', lesson?.id], () => getLessonReviews(lesson?.id));

  if (!lesson) return <p role="status" className="p-8 text-center text-sm">Carregando informações da aula…</p>;

  const isOwner = currentUser?.id === lesson.creator?.id || currentUser?.id === lesson.creatorId;

  if (lesson.isActive === false && !isOwner && currentRole !== 'admin') {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-rose-100 bg-white p-6 text-center shadow-sm sm:p-10">
        <h1 className="text-lg font-extrabold text-zinc-900">Esta vídeo-aula não está disponível</h1>
        <p className="mt-2 text-sm text-zinc-600">O conteúdo foi desativado pela administração.</p>
        <Link to="/videoaulas" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-rose-700 px-5 text-sm font-bold text-white">Voltar ao catálogo</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/videoaulas" className="inline-flex items-center gap-1 text-xs font-bold text-[#B94F70] hover:underline">
        <ArrowLeft size={16} />
        Voltar para o Catálogo de Vídeo-aulas
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-[#E8CCD4]">
            <div className="relative h-64 sm:h-80 overflow-hidden bg-zinc-950">
              <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-zinc-950/30 flex items-center justify-center">
                <PlayCircle size={64} className="text-white drop-shadow-lg opacity-90 hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>

            <CardBody className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="rose" size="sm">{lesson.category}</Badge>
                  <Badge variant="gray" size="sm">{lesson.level}</Badge>
                </div>
                <h1 className="text-2xl font-extrabold text-[#251D20]">{lesson.title}</h1>
                <p className="text-sm text-[#715B62] font-medium">{lesson.subtitle}</p>
              </div>

              {/* Creator Info vinculada dinamicamente ao usuário do db.json */}
              <Link
                to={`/perfil?user=${lesson.creator?.username || lesson.creator?.id || ''}`}
                className="flex items-center gap-3 p-3 bg-[#F8E9ED] hover:bg-[#F6DDE5] rounded-2xl border border-[#E8CCD4] transition-colors"
                title="Ver perfil da professora"
              >
                <Avatar src={lesson.creator?.avatar} alt={lesson.creator?.name || 'Professora'} size="md" />
                <div>
                  <p className="text-xs font-bold text-[#251D20]">{lesson.creator?.name || 'Professora Fio a Fio'}</p>
                  <p className="text-[11px] text-[#715B62]">
                    @{lesson.creator?.username || 'professora'} • Criadora & Professora de Crochê
                  </p>
                </div>
              </Link>

              {/* Rating & Specs */}
              <div className="flex items-center gap-6 text-xs text-[#715B62] py-3 border-y border-[#E8CCD4]/60">
                <div className="flex items-center gap-1.5 font-bold">
                  <StarRating rating={lesson.rating} size={16} />
                  <span>{lesson.rating} ({lesson.reviewsCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-1 font-semibold">
                  <Clock size={16} className="text-[#B94F70]" />
                  <span>{lesson.duration}</span>
                </div>
              </div>

              {/* Course Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-[#251D20] uppercase tracking-wider">Descrição Completa</h3>
                <p className="text-sm text-[#715B62] leading-relaxed">{lesson.description}</p>
              </div>

              {/* What You Will Learn */}
              {lesson.whatYouWillLearn && lesson.whatYouWillLearn.length > 0 && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E8CCD4]">
                  <h3 className="font-bold text-sm text-[#251D20] uppercase tracking-wider flex items-center gap-2">
                    <Award size={18} className="text-[#B94F70]" />
                    O que você vai aprender
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#715B62] font-medium">
                    {lesson.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Avaliações reais gravadas no MongoDB */}
              <div className="space-y-4 pt-4 border-t border-[#E8CCD4]/60">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#251D20] uppercase tracking-wider flex items-center gap-2">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    Avaliações das Alunas ({reviews.length})
                  </h3>
                  <Link to={`/avaliacao/${lesson.id}`}>
                    <Button variant="outline" size="sm" className="text-xs font-bold border-[#E8CCD4] text-[#B94F70] hover:bg-[#F6DDE5]">
                      + Avaliar esta Aula
                    </Button>
                  </Link>
                </div>

                {reviews.length === 0 ? (
                  <p className="text-xs text-[#715B62] italic bg-[#F8E9ED]/50 p-4 rounded-2xl border border-[#E8CCD4]">
                    Esta aula ainda não possui avaliações no banco de dados. Seja a primeira aluna a avaliar! 🧶
                  </p>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 bg-[#F8E9ED]/40 rounded-2xl border border-[#E8CCD4] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar src={rev.userAvatar} alt={rev.userName} size="xs" />
                            <span className="text-xs font-bold text-[#251D20]">{rev.userName}</span>
                          </div>
                          <StarRating rating={rev.rating} size={14} />
                        </div>
                        <p className="text-xs text-[#715B62] pl-7">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Purchase Sticky Sidebar */}
        <div className="space-y-6">
          <Card className="sticky top-20 border-[#E8CCD4] shadow-md">
            <CardBody className="p-6 space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase font-bold text-zinc-400">Preço de Acesso Vitalício</span>
                <div className="text-3xl font-black text-[#B94F70]">
                  R$ {Number(lesson.price || 0).toFixed(2).replace('.', ',')}
                </div>
                <p className="text-[11px] text-[#715B62]">Pagamento único • Acesso imediato no painel</p>
              </div>

              {isOwner ? (
                <Link to={`/criador/videoaulas/editar/${lesson.id}`} className="block">
                  <Button variant="secondary" fullWidth size="lg" className="shadow-md font-bold bg-[#F6DDE5] text-[#B94F70] hover:bg-[#E8CCD4]">
                    <Edit size={16} />
                    Editar esta Vídeo-aula
                  </Button>
                </Link>
              ) : (
                <Link to={currentRole === 'guest' ? `/login?redirect=/compra/${lesson.id}` : `/compra/${lesson.id}`} className="block">
                  <Button variant="primary" fullWidth size="lg" className="shadow-md bg-[#B94F70] hover:bg-[#963B58] text-white">
                    <ShoppingCart size={18} />
                    Comprar Vídeo-aula
                  </Button>
                </Link>
              )}

              <div className="pt-4 border-t border-[#E8CCD4]/60 space-y-2 text-xs text-[#715B62]">
                <p className="flex items-center gap-2 font-semibold">
                  <CheckCircle size={14} className="text-[#B94F70]" />
                  Assista no celular, tablet ou computador
                </p>
                <p className="flex items-center gap-2 font-semibold">
                  <CheckCircle size={14} className="text-[#B94F70]" />
                  Suporte a dúvidas com a professora
                </p>
                <p className="flex items-center gap-2 font-semibold">
                  <CheckCircle size={14} className="text-[#B94F70]" />
                  Divisão transparente: 85% para a criadora
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
