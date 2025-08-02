import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById, removeItemFromPlaylist } from '../api/playlistService';
import type { Playlist } from '../types';
import { Card } from '../components/ui/Card';

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  const fetchPlaylist = useCallback(async () => {
    if (id) {
        try {
            const data = await getPlaylistById(Number(id));
            setPlaylist(data);
        } catch (error) {
            console.error("Playlist não encontrada");
            setPlaylist(null);
        }
    }
  }, [id]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  const handleRemoveItem = async (itemType: 'Filme' | 'Livro', itemId: number) => {
    if (window.confirm("Remover este item da playlist?")) {
      await removeItemFromPlaylist(Number(id), itemType, itemId);
      fetchPlaylist();
    }
  };

  if (!playlist) return <div className="text-center">Carregando ou playlist não encontrada...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2">{playlist.nome}</h1>
      <p className="text-gray-400 mb-8">{playlist.itens.length} itens na playlist</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {playlist.itens.map((item, index) => {
          const entity = item.filme || item.livro;
          if (!entity) return null;
          
          return (
            <Card
              key={`${item.tipo}-${entity.id}-${index}`}
              title={entity.titulo}
              subtitle={item.filme ? `Diretor: ${item.filme.diretor}` : `Autor: ${item.livro!.autor}`}
              imageUrl={entity.urlCapa}
              onDeleteClick={() => handleRemoveItem(item.tipo, entity.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistDetailPage;