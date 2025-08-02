import { useState, type FormEvent, useEffect } from 'react';
import type { UpdateFilmeDto } from '../../types';

interface Props {
  initialData: UpdateFilmeDto;
  onSubmit: (data: UpdateFilmeDto) => Promise<void>;
  onClose: () => void;
}

export const EditFilmeForm = ({ initialData, onSubmit, onClose }: Props) => {
  const [formData, setFormData] = useState<UpdateFilmeDto>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

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
      <input name="diretor" value={formData.diretor} onChange={handleChange} placeholder="Diretor" required className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
      <input name="urlCapa" value={formData.urlCapa} onChange={handleChange} placeholder="URL da Capa" type="url" required className="w-full px-3 py-2 bg-gray-700 rounded-lg" />
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">Cancelar</button>
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg">Atualizar</button>
      </div>
    </form>
  );
};