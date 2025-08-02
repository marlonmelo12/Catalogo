import { useEffect, useState } from 'react';
import { getPlaylists, addItemToPlaylist } from '../../api/playlistService';
import type { Playlist, Filme, Livro } from '../../types';
import { Modal } from '../ui/Modal';

interface Props {
  item: Filme | Livro | null;
  itemType: 'Filme' | 'Livro';
  isOpen: boolean;
  onClose: () => void;
}

export const AddToPlaylistModal = ({ item, itemType, isOpen, onClose }: Props) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getPlaylists()
        .then(setPlaylists)
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const handleSelectPlaylist = async (playlistId: number) => {
    if (!item) return;

    try {
      await addItemToPlaylist(playlistId, {
        itemId: item.id,
        tipo: itemType,
      });
      alert(`'${item.titulo}' adicionado à playlist!`); // Feedback simples
      onClose();
    } catch (error) {
      alert('Falha ao adicionar o item.');
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Adicionar "${item?.titulo}" em...`}>
      {loading ? (
        <p>Carregando playlists...</p>
      ) : (
        <ul className="space-y-2">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <button
                onClick={() => handleSelectPlaylist(playlist.id)}
                className="w-full text-left p-3 bg-gray-700 hover:bg-blue-600 rounded-lg transition-colors"
              >
                {playlist.nome}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};