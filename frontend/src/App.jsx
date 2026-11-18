import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "./context/RoleContext";
import { ChatProvider } from "./context/ApiChatContext";
import { MainLayout } from "./components/layout/MainLayout";

// Auth Pages
import { LandingPage } from "./pages/auth/LandingPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

// Community Pages
import { FeedPage } from "./pages/community/FeedPage";
import { PostDetailPage } from "./pages/community/PostDetailPage";
import { CreatePostPage } from "./pages/community/CreatePostPage";
import { StoriesPage } from "./pages/community/StoriesPage";
import { CreateStoryPage } from "./pages/community/CreateStoryPage";
import { ProfilePage } from "./pages/community/ProfilePage";
import { EditProfilePage } from "./pages/community/EditProfilePage";
import { SearchPage } from "./pages/community/SearchPage";
import { ChatPage } from "./pages/community/ChatPage";

// Learning Pages
import { MaterialsCatalogPage } from "./pages/learning/MaterialsCatalogPage";
import { MaterialDetailPage } from "./pages/learning/MaterialDetailPage";
import { VideoCatalogPage } from "./pages/learning/VideoCatalogPage";
import { VideoDetailPage } from "./pages/learning/VideoDetailPage";

// Checkout Pages
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { PaymentPage } from "./pages/checkout/PaymentPage";
import { OrderConfirmationPage } from "./pages/checkout/OrderConfirmationPage";

// Student Pages
import { StudentLibraryPage } from "./pages/student/StudentLibraryPage";
import { WatchVideoPage } from "./pages/student/WatchVideoPage";
import { RateVideoPage } from "./pages/student/RateVideoPage";
import { PurchaseHistoryPage } from "./pages/student/PurchaseHistoryPage";

// Creator Pages
import { ManageVideosPage } from "./pages/creator/ManageVideosPage";
import { CreateVideoPage } from "./pages/creator/CreateVideoPage";
import { EditVideoPage } from "./pages/creator/EditVideoPage";
import { SalesReportPage } from "./pages/creator/SalesReportPage";

// Admin Pages
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { PersistedUserManagementPage as UserManagementPage } from "./pages/admin/PersistedUserManagementPage";
import { PersistedPostModerationPage as PostModerationPage } from "./pages/admin/PersistedPostModerationPage";
import { PersistedContentManagementPage as ContentManagementPage } from "./pages/admin/PersistedContentManagementPage";

export function App() {
  return (
    <RoleProvider>
      <ChatProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Auth / Landing */}
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="cadastro" element={<RegisterPage />} />

              {/* Community */}
              <Route path="feed" element={<FeedPage />} />
              <Route path="publicacao/:id" element={<PostDetailPage />} />
              <Route path="publicacao/criar" element={<CreatePostPage />} />
              <Route path="stories" element={<StoriesPage />} />
              <Route path="stories/criar" element={<CreateStoryPage />} />
              <Route path="perfil" element={<ProfilePage />} />
              <Route path="perfil/editar" element={<EditProfilePage />} />
              <Route path="pesquisa" element={<SearchPage />} />
              <Route path="chat" element={<ChatPage />} />

              {/* Learning */}
              <Route path="materiais" element={<MaterialsCatalogPage />} />
              <Route path="materiais/:id" element={<MaterialDetailPage />} />
              <Route path="videoaulas" element={<VideoCatalogPage />} />
              <Route path="videoaulas/:id" element={<VideoDetailPage />} />

              {/* Checkout */}
              <Route path="compra/:id" element={<CheckoutPage />} />
              <Route path="pagamento/:id" element={<PaymentPage />} />
              <Route
                path="confirmacao-compra/:id"
                element={<OrderConfirmationPage />}
              />

              {/* Student */}
              <Route path="biblioteca" element={<StudentLibraryPage />} />
              <Route path="assistir/:id" element={<WatchVideoPage />} />
              <Route path="avaliacao/:id" element={<RateVideoPage />} />
              <Route path="compras" element={<PurchaseHistoryPage />} />

              {/* Creator */}
              <Route path="criador/videoaulas" element={<ManageVideosPage />} />
              <Route
                path="criador/videoaulas/cadastrar"
                element={<CreateVideoPage />}
              />
              <Route
                path="criador/videoaulas/editar/:id"
                element={<EditVideoPage />}
              />
              <Route path="criador/vendas" element={<SalesReportPage />} />

              {/* Admin */}
              <Route path="admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="admin/usuarios" element={<UserManagementPage />} />
              <Route
                path="admin/publicacoes"
                element={<PostModerationPage />}
              />
              <Route
                path="admin/conteudos"
                element={<ContentManagementPage />}
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </RoleProvider>
  );
}

export default App;
