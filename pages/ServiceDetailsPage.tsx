import React, { useEffect, useState } from 'react';
import { ServiceProvider } from '../types';
import { fetchProviderDetails } from '../services/api';
import StarRating from '../components/StarRating';
import { HeartIcon } from '../constants';

interface ServiceDetailsPageProps {
  providerId: string;
  onBook: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onStartChat: (provider: ServiceProvider) => void;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({ providerId, onBook, isFavorite, onToggleFavorite, onStartChat }) => {
  const [provider, setProvider] = useState<ServiceProvider | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProvider = async () => {
      setLoading(true);
      const data = await fetchProviderDetails(providerId);
      setProvider(data || null);
      setLoading(false);
    };
    loadProvider();
  }, [providerId]);

  if (loading) {
    return <div className="flex items-center justify-center h-full p-8">A carregar detalhes...</div>;
  }

  if (!provider) {
    return <div className="text-center p-8">Prestador de serviço não encontrado.</div>;
  }

  return (
    <div className="font-roboto">
      <div className="h-48 bg-gray-200 relative">
        <img src={provider.imageUrl} alt={provider.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-4 -mt-10">
        <div className="bg-white rounded-t-lg p-4 shadow-lg">
            <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-petroleum-blue font-poppins flex-1">{provider.name}</h2>
                <button 
                    onClick={onToggleFavorite} 
                    className="ml-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Adicionar aos favoritos"
                >
                    <HeartIcon className={`w-8 h-8 ${isFavorite ? 'text-danger-red fill-current' : 'text-dark-gray'}`} />
                </button>
            </div>
            <div className="flex items-center my-2">
              <StarRating rating={provider.rating} />
              <span className="text-sm text-dark-gray ml-2">{provider.rating.toFixed(1)} ({provider.reviewCount} avaliações)</span>
            </div>
            <p className="text-lg font-semibold text-mbundu-orange mb-4">
              A partir de {provider.basePrice.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
            </p>
        </div>
        
        <div className="bg-white p-4">
            <p className="text-dark-gray leading-relaxed mb-6">{provider.description}</p>
            
            <button 
                onClick={() => onStartChat(provider)}
                className="w-full mb-6 py-3 px-4 rounded-lg bg-soft-teal text-white font-semibold hover:bg-opacity-90 transition-colors">
              Iniciar Chat com Prestador
            </button>

            <div className="mb-6">
              <h3 className="font-bold text-soft-teal text-lg mb-2 font-poppins">Horário</h3>
              <ul className="text-dark-gray space-y-1">
                {provider.availability.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.day}</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
        
            <div>
              <h3 className="font-bold text-soft-teal text-lg mb-4 font-poppins">Avaliações</h3>
              <div className="space-y-4">
                {provider.reviews.map(review => (
                  <div key={review.id} className="border-b border-medium-gray pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-petroleum-blue">{review.author}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-sm text-dark-gray italic">"{review.comment}"</p>
                    <p className="text-xs text-gray-400 text-right mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
      
      {/* Sticky book button */}
      <div className="sticky bottom-16 left-0 right-0 p-4 bg-white border-t border-medium-gray">
          <button onClick={onBook} className="w-full bg-mbundu-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg">
              Agendar Serviço
          </button>
      </div>

    </div>
  );
};

export default ServiceDetailsPage;