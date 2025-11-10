
import React from 'react';
import { ServiceProvider } from '../types';
import StarRating from './StarRating';
import { HeartIcon } from '../constants';

interface ServiceCardProps {
  provider: ServiceProvider;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ provider, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      onClick={onClick} 
      className="bg-white rounded-xl shadow-md overflow-hidden flex mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 relative"
    >
        <button 
            onClick={onToggleFavorite} 
            className="absolute top-2 right-2 z-10 p-2 bg-white/70 rounded-full hover:bg-white transition-colors"
            aria-label="Adicionar aos favoritos"
        >
            <HeartIcon className={`w-6 h-6 ${isFavorite ? 'text-danger-red fill-current' : 'text-dark-gray'}`} />
        </button>
      <img className="w-1/3 h-auto object-cover" src={provider.imageUrl} alt={provider.name} />
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-petroleum-blue text-lg font-poppins">{provider.name}</h3>
          <div className="flex items-center mt-1">
            <StarRating rating={provider.rating} />
            <span className="text-xs text-dark-gray ml-2">({provider.reviewCount} avaliações)</span>
          </div>
          <p className="text-sm text-dark-gray mt-2">{provider.distance}</p>
        </div>
        <p className="text-right font-semibold text-mbundu-orange text-lg mt-2">
          A partir de {provider.basePrice.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;