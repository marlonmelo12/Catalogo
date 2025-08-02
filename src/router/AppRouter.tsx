import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import FilmesPage from '../pages/FilmesPage';
import LivrosPage from '../pages/LivrosPage';
import PlaylistsPage from '../pages/PlaylistsPage';
import PlaylistDetailPage from '../pages/PlaylistDetailPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};