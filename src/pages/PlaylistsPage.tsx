import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylists, createPlaylist, deletePlaylist } from '../api/playlistService';
import type { Playlist } from '../types';
import { Modal } from '../components/ui/Modal';

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const fetchPlaylists = useCallback(async () => {
    setPlaylists(await getPlaylists());
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      await createPlaylist({ nome: newPlaylistName });
      fetchPlaylists();
      setIsModalOpen(false);
      setNewPlaylistName("");
    }
  };

  const handleDeletePlaylist = async (e: React.MouseEvent, playlistId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Tem certeza que deseja deletar esta playlist e todos os seus itens?")) {
        await deletePlaylist(playlistId);
        fetchPlaylists();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Minhas Playlists</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Nova Playlist
        </button>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Criar Nova Playlist">
        <form onSubmit={handleCreatePlaylist} className="space-y-4">
          <input value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} placeholder="Nome da Playlist" required className="w-full px-3 py-2 bg-gray-700 rounded-lg"/>
          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Criar</button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <Link key={playlist.id} to={`/playlists/${playlist.id}`} className="relative bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors shadow-lg flex flex-col justify-between">
            <button onClick={(e) => handleDeletePlaylist(e, playlist.id)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 z-10" aria-label="Deletar Playlist">🗑️</button>
            <h2 className="text-2xl font-semibold mb-2">{playlist.nome}</h2>
            <p className="text-gray-400">{playlist.itens?.length ?? 0} itens</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsPage;