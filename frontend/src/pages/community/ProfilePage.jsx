import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link, Navigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRole } from "../../context/RoleContext";
import { useChat } from "../../context/ApiChatContext";
import { RoleSwitcher } from "../../components/layout/RoleSwitcher";
import { Card, CardBody } from "../../components/ui/Card";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { PostCard } from "../../components/community/PostCard";
import { CreatePostModal } from "../../components/community/CreatePostModal";
import {
  getUsers,
  getPosts,
  getVideoLessons,
  toggleFollowUser,
} from "../../services/api";
import { useApiData } from "../../hooks/useApiData";
import {
  MapPin,
  Calendar,
  Edit3,
  UserCheck,
  UserPlus,
  Grid,
  Video,
  PlusCircle,
  MessageCircle,
  CheckCircle2,
  BookMarked,
  Sparkles,
  Star,
  Clock,
  PlayCircle,
} from "lucide-react";

export const ProfilePage = () => {
  const { currentUser, currentRole } = useRole();
  const { getOrCreateConversationWithUser } = useChat();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  if (currentRole === 'guest' || !currentUser?.id) {
    return <Navigate to="/login" replace />;
  }
  const { data: users = [] } = useApiData("users", getUsers);
  const { data: posts = [] } = useApiData("posts", getPosts);
  const { data: videoLessons = [] } = useApiData(
    "videoLessons",
    getVideoLessons,
  );

  // Determine profile user (either specified in query param or current context user)
  const targetUsername =
    searchParams.get("user") || searchParams.get("username");
  const profileUser = targetUsername
    ? users.find(
        (u) => u.username === targetUsername || u.id === targetUsername,
      ) || currentUser
    : currentUser;

  const isOwnProfile =
    profileUser.id === currentUser.id ||
    profileUser.username === currentUser.username;

  // Estado e verificação de relacionamento
  const isInitiallyFollowing = Boolean(
    currentUser?.following?.includes(profileUser?.id) ||
    profileUser?.followers?.includes(currentUser?.id),
  );
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const [followersCount, setFollowersCount] = useState(
    profileUser.followersCount || 0,
  );

  useEffect(() => {
    setIsFollowing(
      Boolean(
        currentUser?.following?.includes(profileUser?.id) ||
        profileUser?.followers?.includes(currentUser?.id),
      ),
    );
    setFollowersCount(profileUser.followersCount || 0);
  }, [
    profileUser.id,
    currentUser?.id,
    currentUser?.following,
    profileUser.followers,
    profileUser.followersCount,
  ]);

  const followMutation = useMutation({
    mutationFn: async () => {
      return await toggleFollowUser(profileUser.id, currentUser?.id);
    },
    onSuccess: (res) => {
      if (res && typeof res.isFollowing === "boolean") {
        setIsFollowing(res.isFollowing);
      }
      if (res && typeof res.followersCount === "number") {
        setFollowersCount(res.followersCount);
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      // Reverter estado otimista
      setIsFollowing((prev) => !prev);
      setFollowersCount((prev) =>
        isFollowing ? prev + 1 : Math.max(0, prev - 1),
      );
    },
  });

  const handleToggleFollow = () => {
    if (currentUser?.role === "guest" || !currentUser?.id) {
      navigate("/login");
      return;
    }
    const nextState = !isFollowing;
    setIsFollowing(nextState);
    setFollowersCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    followMutation.mutate();
  };

  const [activeTab, setActiveTab] = useState("posts"); // 'posts' | 'videoaulas' | 'saved'
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Filter posts by user
  const userPosts = posts.filter(
    (p) =>
      p.author.username === profileUser.username ||
      (isOwnProfile && currentUser.role === "creator"),
  );

  // Filter video lessons by creator
  const userVideoLessons = videoLessons.filter(
    (v) =>
      (v.isActive !== false || isOwnProfile) &&
      (v.creator?.id === profileUser.id ||
        v.creator?.name === profileUser.name),
  );

  const handleSendMessage = async () => {
    const convId = await getOrCreateConversationWithUser(
      currentUser.id,
      profileUser,
    );
    navigate(`/chat?conv=${convId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative animate-fade-in">
      {/* Instagram-style Creator Profile Header Card */}
      <Card className="overflow-hidden border border-[#E8CCD4] shadow-craft bg-white rounded-3xl">
        {/* Soft Rosê Cover Banner with Image Support */}
        <div className="h-40 sm:h-52 bg-gradient-to-r from-[#B94F70] via-[#D98CA1] to-[#B94F70] relative overflow-hidden shadow-inner group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F6DDE5] via-[#E8CCD4] to-[#F1DFD8]" />
          <div className="absolute inset-0 bg-[radial-[#ffffff]_1px,transparent_1px] [background-size:16px_16px] opacity-15" />

          <div className="absolute left-4 top-4 bg-[#F6DDE5]/90 backdrop-blur-md text-[#B94F70] font-black text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm border border-[#D98CA1]/50 flex items-center gap-1.5">
            <Sparkles size={12} />
            Comunidade Fio a Fio 🧶
          </div>
        </div>

        <CardBody className="relative pt-0 px-4 sm:px-8 pb-6 space-y-6">
          {/* Avatar and Top Actions Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            {/* Story Ring Avatar - Occupies full circle */}
            <div className="relative inline-block self-center sm:self-auto">
              <div className="p-1 rounded-full bg-gradient-to-tr from-[#B94F70] via-[#D98CA1] to-[#B94F70] shadow-xl w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <Avatar
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  size="xl"
                  className="w-full h-full border-4 border-white shadow-md rounded-full object-cover"
                />
              </div>
              {profileUser.verifiedCreator && (
                <span
                  className="absolute bottom-1 right-1 bg-[#B94F70] text-white p-1 rounded-full shadow-md border-2 border-white"
                  title="Criadora / Professora Verificada"
                >
                  <CheckCircle2
                    size={18}
                    className="fill-[#B94F70] text-white"
                  />
                </span>
              )}
            </div>

            {/* Action Buttons Row with Integrated RoleSwitcher */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
              {isOwnProfile && (
                <div className="mr-1">
                  <RoleSwitcher />
                </div>
              )}

              {isOwnProfile ? (
                <>
                  <Link to="/perfil/editar">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs font-extrabold border-[#E8CCD4] text-[#251D20] hover:bg-[#F6DDE5]"
                    >
                      <Edit3 size={14} />
                      <span>Editar Perfil</span>
                    </Button>
                  </Link>
                  {profileUser.role === "creator" && (
                    <Link to="/criador/videoaulas/cadastrar">
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-full text-xs font-black bg-[#B94F70] text-white shadow-md"
                      >
                        <PlusCircle size={15} />
                        <span>+ Nova Aula</span>
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant={isFollowing ? "secondary" : "primary"}
                    size="sm"
                    disabled={followMutation.isPending}
                    onClick={handleToggleFollow}
                    className="rounded-full text-xs font-black shadow-sm"
                  >
                    {isFollowing ? (
                      <UserCheck size={15} />
                    ) : (
                      <UserPlus size={15} />
                    )}
                    <span>
                      {followMutation.isPending
                        ? "Salvando..."
                        : isFollowing
                          ? "Seguindo"
                          : "Seguir"}
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendMessage}
                    className="rounded-full text-xs font-bold border-[#E8CCD4] text-[#251D20] hover:bg-[#F6DDE5]"
                  >
                    <MessageCircle size={15} className="text-[#B94F70]" />
                    <span>Enviar Mensagem</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* User Info & Badges */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#251D20]">
                {profileUser.name}
              </h1>
              {profileUser.verifiedCreator && (
                <span className="inline-flex items-center gap-1 bg-[#F6DDE5] text-[#B94F70] text-[11px] font-black px-3 py-0.5 rounded-full border border-[#D98CA1]/60 shadow-2xs">
                  <Sparkles size={12} className="text-[#B94F70]" />
                  Professora Verificada
                </span>
              )}
            </div>
            <p className="text-xs font-extrabold text-[#B94F70]">
              @{profileUser.username}
            </p>
          </div>

          {/* Bio Description */}
          {profileUser.bio && (
            <p className="text-sm text-[#715B62] font-medium leading-relaxed max-w-2xl text-center sm:text-left">
              {profileUser.bio ||
                "Apaixonada por agulhas, fios e por compartilhar a arte do crochê com o mundo! 🧶✨"}
            </p>
          )}

          {/* Location & Joined Date */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-[#715B62] pt-1">
            {profileUser.location && (
              <span className="flex items-center gap-1.5 bg-[#F6DDE5] px-3 py-1 rounded-full text-[#251D20] font-bold border border-[#E8CCD4]">
                <MapPin size={14} className="text-[#B94F70]" />
                {profileUser.location}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[#715B62]">
              <Calendar size={14} className="text-[#D98CA1]" />
              Membro desde {profileUser.joinedDate || "Janeiro 2024"}
            </span>
          </div>

          {/* Instagram-Style Statistics Grid (4 Key Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E8CCD4]">
            <div className="bg-[#F6DDE5] border border-[#E8CCD4] p-3.5 rounded-2xl text-center hover:bg-[#F1DFD8]/60 transition-colors shadow-2xs">
              <span className="block text-2xl font-black text-[#251D20]">
                {userPosts.length}
              </span>
              <span className="text-[11px] font-extrabold text-[#B94F70] uppercase tracking-wider">
                Publicações
              </span>
            </div>

            <div className="bg-[#F6DDE5] border border-[#E8CCD4] p-3.5 rounded-2xl text-center shadow-2xs">
              <span className="block text-2xl font-black text-[#251D20]">
                {(followersCount || 0).toLocaleString("pt-BR")}
              </span>
              <span className="text-[11px] font-extrabold text-[#B94F70] uppercase tracking-wider">
                Seguidores
              </span>
            </div>

            {profileUser.followingCount > 0 && (
              <div className="bg-[#F6DDE5] border border-[#E8CCD4] p-3.5 rounded-2xl text-center shadow-2xs">
                <span className="block text-2xl font-black text-[#251D20]">
                  {profileUser.followingCount}
                </span>
                <span className="text-[11px] font-extrabold text-[#B94F70] uppercase tracking-wider">
                  Seguindo
                </span>
              </div>
            )}

            <div className="bg-[#F1DFD8] border border-[#E8CCD4] p-3.5 rounded-2xl text-center hover:bg-[#F6DDE5] transition-colors shadow-2xs">
              <span className="block text-2xl font-black text-[#251D20]">
                {userVideoLessons.length}
              </span>
              <span className="text-[11px] font-extrabold text-[#715B62] uppercase tracking-wider">
                Vídeo-aulas
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Instagram Navigation Tabs (Publicações | Vídeo-aulas | Salvos) */}
      <div
        role="tablist"
        aria-label="Conteúdo do perfil"
        className="flex border-b border-[#E8CCD4] bg-white rounded-2xl p-1.5 shadow-xs"
      >
        <button
          type="button"
          role="tab"
          id="profile-posts-tab"
          aria-controls="profile-posts-panel"
          aria-selected={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
          className={`min-w-0 flex-1 px-1 py-3 text-[10px] sm:text-xs font-bold rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all ${
            activeTab === "posts"
              ? "bg-[#B94F70] text-white font-black shadow-md"
              : "text-[#715B62] hover:bg-[#F6DDE5] hover:text-[#B94F70]"
          }`}
        >
          <Grid size={14} className="shrink-0 sm:h-4 sm:w-4" />
          <span>Publicações ({userPosts.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          id="profile-videos-tab"
          aria-controls="profile-videos-panel"
          aria-selected={activeTab === "videoaulas"}
          onClick={() => setActiveTab("videoaulas")}
          className={`min-w-0 flex-1 px-1 py-3 text-[10px] sm:text-xs font-bold rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all ${
            activeTab === "videoaulas"
              ? "bg-[#B94F70] text-white font-black shadow-md"
              : "text-[#715B62] hover:bg-[#F6DDE5] hover:text-[#B94F70]"
          }`}
        >
          <Video size={14} className="shrink-0 sm:h-4 sm:w-4" />
          <span>Vídeo-aulas ({userVideoLessons.length})</span>
        </button>

        {isOwnProfile && (
          <button
            type="button"
            role="tab"
            id="profile-saved-tab"
            aria-controls="profile-saved-panel"
            aria-selected={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
            className={`min-w-0 flex-1 px-1 py-3 text-[10px] sm:text-xs font-bold rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all ${
              activeTab === "saved"
                ? "bg-[#B94F70] text-white font-black shadow-md"
                : "text-[#715B62] hover:bg-[#F6DDE5] hover:text-[#B94F70]"
            }`}
          >
            <BookMarked size={14} className="shrink-0 sm:h-4 sm:w-4" />
            <span>Biblioteca</span>
          </button>
        )}
      </div>

      {/* Tab Content 1: Publicações */}
      {activeTab === "posts" && (
        <div
          role="tabpanel"
          id="profile-posts-panel"
          aria-labelledby="profile-posts-tab"
          tabIndex={0}
          className="space-y-4"
        >
          {userPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E8CCD4] shadow-xs space-y-3">
              <Grid size={40} className="mx-auto text-[#D98CA1]" />
              <h3 className="font-extrabold text-[#251D20] text-base">
                Nenhuma publicação ainda
              </h3>
              <p className="text-xs text-[#715B62]">
                As publicações criadas aparecerão nesta área.
              </p>
            </div>
          ) : (
            userPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      )}

      {/* Tab Content 2: Vídeo-aulas do Criador */}
      {activeTab === "videoaulas" && (
        <div
          role="tabpanel"
          id="profile-videos-panel"
          aria-labelledby="profile-videos-tab"
          tabIndex={0}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {userVideoLessons.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-[#E8CCD4] shadow-xs space-y-3">
              <Video size={40} className="mx-auto text-[#D98CA1]" />
              <h3 className="font-extrabold text-[#251D20] text-base">
                Nenhuma vídeo-aula publicada
              </h3>
              <p className="text-xs text-[#715B62]">
                As vídeo-aulas publicadas pela criadora ficarão disponíveis
                aqui.
              </p>
            </div>
          ) : (
            userVideoLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="hover:shadow-xl hover:border-[#B94F70] transition-all duration-300 overflow-hidden flex flex-col group border-[#E8CCD4]"
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-[#251D20]">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute top-2.5 right-2.5 bg-[#B94F70] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    R$ {lesson.price.toFixed(2)}
                  </span>

                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    <Clock size={12} className="text-[#D98CA1]" />
                    {lesson.duration}
                  </span>
                </div>

                {/* Lesson Info */}
                <CardBody className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-black text-[#B94F70] mb-1">
                      <span className="uppercase tracking-wider">
                        {lesson.category}
                      </span>
                      <span className="flex items-center gap-1 text-[#251D20] font-extrabold bg-[#F6DDE5] px-2 py-0.5 rounded-full border border-[#E8CCD4]">
                        <Star
                          size={12}
                          className="fill-[#B94F70] text-[#B94F70]"
                        />
                        {lesson.rating} ({lesson.reviewsCount})
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-[#251D20] line-clamp-2 leading-snug group-hover:text-[#B94F70] transition-colors">
                      {lesson.title}
                    </h3>
                  </div>

                  <Link to={`/videoaulas/${lesson.id}`} className="block">
                    <Button
                      variant="primary"
                      fullWidth
                      size="sm"
                      className="rounded-xl font-extrabold text-xs bg-[#B94F70] text-white"
                    >
                      <PlayCircle size={15} />
                      <span>Ver Detalhes</span>
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Tab Content 3: Biblioteca do Aluno (Saved) */}
      {activeTab === "saved" && (
        <div
          role="tabpanel"
          id="profile-saved-panel"
          aria-labelledby="profile-saved-tab"
          tabIndex={0}
          className="bg-white rounded-3xl p-8 border border-[#E8CCD4] shadow-xs space-y-4"
        >
          <div className="flex items-center gap-3">
            <BookMarked size={24} className="text-[#B94F70]" />
            <h2 className="font-extrabold text-lg text-[#251D20]">
              Sua Biblioteca de Estudos
            </h2>
          </div>
          <p className="text-xs text-[#715B62] font-medium">
            Acesse rapidamente todas as vídeo-aulas adquiridas e receitas salvas
            na sua conta.
          </p>
          <Link to="/biblioteca">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full font-extrabold text-xs border-[#E8CCD4] text-[#251D20]"
            >
              Ir para Minha Biblioteca Completa
            </Button>
          </Link>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />
    </div>
  );
};
