import React from 'react';
import { Link } from 'react-router-dom';
import { getPurchases } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Library, PlayCircle, Star, ShoppingBag, Video } from 'lucide-react';

export const StudentLibraryPage = () => {
  const { currentUser } = useRole();
  const { data: purchases = [] } = useApiData('purchases', getPurchases);

  // Filter purchases for the active logged-in user (excluding cancelled)
  const userPurchases = currentUser?.id
    ? purchases.filter((item) => item.userId === currentUser.id && item.status !== 'Cancelado')
    : purchases.filter((item) => item.status !== 'Cancelado');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#B94F70] via-[#D98CA1] to-[#B94F70] rounded-3xl p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-white mb-2">
            <Library size={14} />
            Área do Aluno
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Minha Biblioteca de Cursos</h1>
          <p className="text-xs text-rose-100 mt-1">
            {currentUser?.name ? `Aulas adquiridas por ${currentUser.name}.` : 'Todas as vídeo-aulas adquiridas ficam salvas aqui para você assistir quando quiser.'}
          </p>
        </div>
        <Link to="/compras">
          <Button variant="secondary" size="sm" className="bg-white text-[#251D20] hover:bg-[#F6DDE5] font-extrabold border-none shadow-xs">
            <ShoppingBag size={14} />
            <span> Histórico de Compras</span>
          </Button>
        </Link>
      </div>

      {/* Course List or Empty State */}
      {userPurchases.length === 0 ? (
        <EmptyState
          icon={Video}
          title="Nenhuma vídeo-aula adquirida ainda"
          description="Quando você adquirir uma vídeo-aula de crochê, ela aparecerá aqui com acesso vitalício e progresso dos seus estudos."
          actionText="Explorar Catálogo de Vídeo-aulas"
          actionTo="/videoaulas"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPurchases.map((item) => (
            <Card key={item.id} hoverable className="flex flex-col justify-between border-[#E8CCD4]">
              <div>
                <div className="relative h-44 overflow-hidden bg-zinc-900">
                  <img src={item.lesson.thumbnail} alt={item.lesson.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-zinc-950/20 flex items-center justify-center">
                    <PlayCircle size={48} className="text-white drop-shadow-md" />
                  </div>
                </div>

                <CardBody className="space-y-3">
                  <p className="text-xs font-bold text-[#B94F70]">
                    Professora: {item.lesson.creator?.name || item.lesson.creatorName || 'Professora'}
                  </p>
                  <h3 className="font-bold text-base text-[#251D20] line-clamp-1">{item.lesson.title}</h3>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-500 font-semibold">
                      <span>Progresso do Curso</span>
                      <span>{item.lesson.progressPercent || 0}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F6DDE5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#B94F70] rounded-full"
                        style={{ width: `${item.lesson.progressPercent || 0}%` }}
                      />
                    </div>
                  </div>
                </CardBody>
              </div>

              <div className="p-4 bg-[#F8E9ED]/50 border-t border-[#E8CCD4] flex items-center justify-between gap-2">
                <Link to={`/avaliacao/${item.lesson.id}`}>
                  <Button variant="ghost" size="sm" className="text-[#715B62] hover:text-[#B94F70]">
                    <Star size={14} />
                    <span>Avaliar</span>
                  </Button>
                </Link>
                <Link to={`/assistir/${item.lesson.id}`}>
                  <Button variant="primary" size="sm" className="bg-[#B94F70] hover:bg-[#963B58] text-white">
                    <PlayCircle size={16} />
                    <span>Continuar Aula</span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
