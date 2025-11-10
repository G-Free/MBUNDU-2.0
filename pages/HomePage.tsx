
import React, { useState, useEffect } from 'react';
import { ServiceCategory, Promotion, User } from '../types';
import { fetchCategories, fetchPromotions } from '../services/api';

interface HomePageProps {
  user: User | null;
  onSelectCategory: (category: ServiceCategory) => void;
}

// Internal component for the promotion carousel
const PromotionCarousel: React.FC<{ promotions: Promotion[] }> = ({ promotions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentIndex, promotions.length]);

    if (!promotions.length) return null;

    return (
        <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-lg">
            {promotions.map((promo, index) => (
                 <div
                    key={promo.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end">
                        <h3 className="text-white font-bold text-lg">{promo.title}</h3>
                        <p className="text-white text-sm">{promo.description}</p>
                    </div>
                </div>
            ))}
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {promotions.map((_, index) => (
                    <div key={index} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}></div>
                ))}
            </div>
        </div>
    );
};

const categoryGradients = [
    'from-blue-400 to-blue-600',
    'from-orange-400 to-orange-600',
    'from-teal-400 to-teal-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-green-400 to-green-600',
];


const HomePage: React.FC<HomePageProps> = ({ user, onSelectCategory }) => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [cats, promos] = await Promise.all([fetchCategories(), fetchPromotions()]);
      setCategories(cats);
      setPromotions(promos);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="p-4 font-roboto">
      {/* Header Greeting */}
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-petroleum-blue font-poppins">Olá, {user?.name || 'Cliente'}!</h2>
            <p className="text-dark-gray">O que precisa hoje?</p>
        </div>
        <img src={user?.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 flex items-center gap-2">
        <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Procurar por um serviço..." 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-medium-gray focus:outline-none focus:ring-2 focus:ring-mbundu-orange"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <button 
            onClick={() => alert('Funcionalidade de filtros em desenvolvimento.')}
            className="p-3 bg-white border border-medium-gray rounded-lg hover:bg-light-gray transition-colors"
            aria-label="Filtros"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-petroleum-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
        </button>
      </div>
      
      {/* Promotions Carousel */}
      <div className="mb-8">
        <PromotionCarousel promotions={promotions} />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xl font-semibold text-petroleum-blue mb-4 font-poppins">Categorias</h3>
        {loading ? (
            <div className="text-center p-8">A carregar categorias...</div>
        ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
                <div 
                  key={category.id} 
                  onClick={() => onSelectCategory(category)}
                  className="flex flex-col items-center p-3 bg-white rounded-xl shadow-sm cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
                >
                <div className={`w-14 h-14 bg-gradient-to-br ${categoryGradients[index % categoryGradients.length]} rounded-full flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-center text-sm font-medium text-petroleum-blue mt-2">{category.name}</p>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;