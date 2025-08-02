import { useState, type FormEvent } from 'react';
import type { CreateLivroDto } from '../../types';

interface Props {
  onSubmit: (data: CreateLivroDto) => Promise<void>;
  onClose: () => void;
}

export const CreateLivroForm = ({ onSubmit, onClose }: Props) => {
  const [formData, setFormData] = useState<CreateLivroDto>({ titulo: '', ano: new Date().getFullYear(), autor: '', urlCapa: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'ano' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" required className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
      <input name="ano" value={formData.ano} onChange={handleChange} placeholder="Ano" type="number" required className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
      <input name="autor" value={formData.autor} onChange={handleChange} placeholder="Autor" required className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
      <input name="urlCapa" value={formData.urlCapa} onChange={handleChange} placeholder="URL da Capa" type="url" required className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">Cancelar</button>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Salvar</button>
      </div>
    </form>
  );
};