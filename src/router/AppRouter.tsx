import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PlaylistsPage from '../pages/PlaylistsPage';
import PlaylistDetailPage from '../pages/PlaylistDetailPage';
import FilmesPage from '../pages/FilmesPage';
import { ProtectedRoute } from './ProtectedRoute';
import LivrosPage from '../pages/LivrosPage';

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
          <Route path="/filmes" element={<FilmesPage />} />
          <Route path="/livros" element={<LivrosPage />} />
          <Route path="/" element={<PlaylistsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
