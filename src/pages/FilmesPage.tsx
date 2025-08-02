import { useEffect, useState, useCallback } from 'react';
import { getFilmes, createFilme, updateFilme, deleteFilme } from '../api/filmeService';
import type { Filme, CreateFilmeDto, UpdateFilmeDto } from '../types';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { CreateFilmeForm } from '../components/forms/CreateFilmeForm';
import { EditFilmeForm } from '../components/forms/EditFilmeForm';
import { AddToPlaylistModal } from '../components/forms/AddToPlaylistModal';
import { FaPlus } from 'react-icons/fa';

const FilmesPage = () => {
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
    const [selectedFilme, setSelectedFilme] = useState<Filme | null>(null);

    const fetchFilmes = useCallback(async () => {
        setFilmes(await getFilmes());
    }, []);

    useEffect(() => {
        fetchFilmes();
    }, [fetchFilmes]);

    const handleCreate = async (data: CreateFilmeDto) => {
        await createFilme(data);
        setCreateModalOpen(false);
        fetchFilmes();
    };

    const handleEdit = (filme: Filme) => {
        setSelectedFilme(filme);
        setEditModalOpen(true);
    };

    const handleUpdate = async (data: UpdateFilmeDto) => {
        if (!selectedFilme) return;
        await updateFilme(selectedFilme.id, data);
        setEditModalOpen(false);
        setSelectedFilme(null);
        fetchFilmes();
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Tem certeza que deseja deletar este filme?")) {
            await deleteFilme(id);
            fetchFilmes();
        }
    };

    const handleOpenAddToPlaylist = (filme: Filme) => {
        setSelectedFilme(filme);
        setAddToPlaylistModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Filmes</h1>
                <button onClick={() => setCreateModalOpen(true)} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
                    <FaPlus />
                    <span>Adicionar Filme</span>
                </button>
            </div>

            <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Adicionar Novo Filme">
                <CreateFilmeForm onSubmit={handleCreate} onClose={() => setCreateModalOpen(false)} />
            </Modal>

            {selectedFilme && (
                <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} title="Editar Filme">
                    <EditFilmeForm initialData={selectedFilme} onSubmit={handleUpdate} onClose={() => setEditModalOpen(false)} />
                </Modal>
            )}

            <AddToPlaylistModal
                item={selectedFilme}
                itemType="Filme"
                isOpen={isAddToPlaylistModalOpen}
                onClose={() => setAddToPlaylistModalOpen(false)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filmes.map((filme) => (
                    <Card
                        key={filme.id}
                        title={filme.titulo}
                        subtitle={filme.diretor}
                        imageUrl={filme.urlCapa}
                        onAddClick={() => handleOpenAddToPlaylist(filme)}
                        onEditClick={() => handleEdit(filme)}
                        onDeleteClick={() => handleDelete(filme.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FilmesPage;