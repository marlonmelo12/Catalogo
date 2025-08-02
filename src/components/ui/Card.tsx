import { FaPencilAlt, FaPlus, FaTrashAlt } from "react-icons/fa";

interface CardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  onAddClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export const Card = ({ imageUrl, title, subtitle, onAddClick, onEditClick, onDeleteClick }: CardProps) => (
  <div className="bg-surface rounded-lg overflow-hidden shadow-lg flex flex-col justify-between group">
    <div className="relative">
      <img
        src={imageUrl}
        alt={`Capa de ${title}`}
        className="w-full h-72 object-cover"
        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x450?text=Sem+Imagem'; }}
      />
      <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {onAddClick && <button onClick={onAddClick} className="bg-primary text-white rounded-full p-2 flex items-center justify-center hover:bg-primary-hover transition-transform hover:scale-110" aria-label="Adicionar à playlist"><FaPlus /></button>}
        {onEditClick && <button onClick={onEditClick} className="bg-accent text-white rounded-full p-2 flex items-center justify-center hover:bg-accent-hover transition-transform hover:scale-110" aria-label="Editar"><FaPencilAlt /></button>}
        {onDeleteClick && <button onClick={onDeleteClick} className="bg-secondary text-white rounded-full p-2 flex items-center justify-center hover:bg-secondary-hover transition-transform hover:scale-110" aria-label="Deletar"><FaTrashAlt /></button>}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold truncate text-text-main">{title}</h3>
      <p className="text-sm text-text-secondary truncate">{subtitle}</p>
    </div>
  </div>
);