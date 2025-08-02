import { useEffect, useState, useCallback } from 'react';
import { getLivros, createLivro, updateLivro, deleteLivro } from '../api/livroService';
import type { Livro, CreateLivroDto, UpdateLivroDto } from '../types';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { CreateLivroForm } from '../components/forms/CreateLivroForm';
import { EditLivroForm } from '../components/forms/EditLivroForm';
import { AddToPlaylistModal } from '../components/forms/AddToPlaylistModal';

const LivrosPage = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null);

  const fetchLivros = useCallback(async () => {
    setLivros(await getLivros());
  }, []);

  useEffect(() => {
    fetchLivros();
  }, [fetchLivros]);

  const handleCreate = async (data: CreateLivroDto) => {
    await createLivro(data);
    setCreateModalOpen(false);
    fetchLivros();
  };
  
  const handleEdit = (livro: Livro) => {
    setSelectedLivro(livro);
    setEditModalOpen(true);
  };

  const handleUpdate = async (data: UpdateLivroDto) => {
    if (!selectedLivro) return;
    await updateLivro(selectedLivro.id, data);
    setEditModalOpen(false);
    setSelectedLivro(null);
    fetchLivros();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja deletar este livro?")) {
      await deleteLivro(id);
      fetchLivros();
    }
  };

  const handleOpenAddToPlaylist = (livro: Livro) => {
    setSelectedLivro(livro);
    setAddToPlaylistModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Livros</h1>
        <button onClick={() => setCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Adicionar Livro</button>
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Adicionar Novo Livro">
        <CreateLivroForm onSubmit={handleCreate} onClose={() => setCreateModalOpen(false)} />
      </Modal>

      {selectedLivro && (
        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Livro">
          <EditLivroForm initialData={selectedLivro} onSubmit={handleUpdate} onClose={() => setEditModalOpen(false)} />
        </Modal>
      )}

      <AddToPlaylistModal
        item={selectedLivro}
        itemType="Livro"
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setAddToPlaylistModalOpen(false)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {livros.map((livro) => (
          <Card 
            key={livro.id} 
            title={livro.titulo} 
            subtitle={livro.autor} 
            imageUrl={livro.urlCapa} 
            onAddClick={() => handleOpenAddToPlaylist(livro)}
            onEditClick={() => handleEdit(livro)} 
            onDeleteClick={() => handleDelete(livro.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default LivrosPage;