import React from 'react';
import { ServiceCategory, ServiceProvider, Promotion, Review, User, Order } from './types';

// SVG Icons as React Components
// Using HeroIcons (https://heroicons.com/) for a minimal look

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-4.505c3.423 0 6.544 1.343 9 3.569a11.907 11.907 0 00-2.382-9.528z" /></svg>
);
export const ArrowPathIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 10.5M20 20l-1.5-1.5A9 9 0 003.5 13.5" /></svg>
);
export const ReceiptIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);

export const PaperclipIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
);
export const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
);
export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
);
export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z" /></svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
);
export const LaundryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18M4 4h16v2a2 2 0 01-2 2H6a2 2 0 01-2-2V4zM6 18h12" /></svg>
);
export const CarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM19 17H5M5 17L3 7h18l-2 10zM5 17H3m2-10V5h14v2m-3 0h-8" /></svg>
);
export const UpholsteryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-3 4-3-4m6 18v-4m3 2h-6M12 3c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm0 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" /></svg>
);
export const CleaningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4m-2 4h16m-2-4v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5m4 0V3m6 0v2m-6 6h.01M12 11h.01M15 11h.01" /></svg>
);
export const DomesticWorkerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
export const WrenchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
export const ListIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
export const PrimeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6c0 1.887.863 3.58 2.228 4.633L5 18h10l-1.228-5.367A5.969 5.969 0 0016 8a6 6 0 00-6-6zm-3.05 9.48a4.008 4.008 0 014.1-6.96 4 4 0 11-4.1 6.96z" /><path d="M10 2a6 6 0 00-6 6c0 1.887.863 3.58 2.228 4.633L5 18h10l-1.228-5.367A5.969 5.969 0 0016 8a6 6 0 00-6-6zm-3.05 9.48a4.008 4.008 0 014.1-6.96 4 4 0 11-4.1 6.96z" /></svg>
);
export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);
export const EditProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
);
export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
);
export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
);
export const QuestionMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4-.464 0-.907-.083-1.317-.246l-1.218 1.218A9.01 9.01 0 0012 21a9 9 0 100-18c-3.13 0-5.894 1.63-7.468 4.018" /></svg>
);


export const MOCK_USER: User = {
    id: 'user1',
    name: 'Geiger',
    email: 'geiger@mbundu.co.ao',
    phone: '+244 923 123 456',
    avatarUrl: 'https://i.pravatar.cc/150?u=geiger',
    isMbunduPrime: false,
    role: 'customer',
};


export const MOCK_CATEGORIES: ServiceCategory[] = [
  { id: 'laundry', name: 'Lavandarias', icon: LaundryIcon },
  { id: 'auto', name: 'Estética Automotiva', icon: CarIcon },
  { id: 'upholstery', name: 'Limpeza de Estofos', icon: UpholsteryIcon },
  { id: 'residential', name: 'Limpeza Residencial', icon: CleaningIcon },
  { id: 'domestic', name: 'Trabalhadores Domésticos', icon: DomesticWorkerIcon },
  { id: 'maintenance', name: 'Manutenção & Técnicos', icon: WrenchIcon },
];

const MOCK_REVIEWS: Review[] = [
    { id: 'r1', author: 'Ana Silva', rating: 5, comment: 'Serviço impecável e rápido!', date: '2024-07-20' },
    { id: 'r2', author: 'João Costa', rating: 4, comment: 'Muito bom, mas a comunicação podia ser melhor.', date: '2024-07-18' },
    { id: 'r3', author: 'Carla Dias', rating: 5, comment: 'Recomendo vivamente. O meu carro ficou como novo.', date: '2024-07-15' },
];

export const MOCK_PROVIDERS: ServiceProvider[] = [
  { 
    id: 'p1', 
    name: 'Lavandaria Brilho', 
    category: 'laundry', 
    rating: 4.8, 
    reviewCount: 125, 
    distance: '2.5 km', 
    basePrice: 5000, 
    imageUrl: 'https://picsum.photos/400/300?random=1',
    description: 'Lavagem a seco e a água com produtos de alta qualidade. Recolha e entrega ao domicílio.',
    availability: [
      { day: 'Seg-Sex', hours: '08:00 - 18:00' },
      { day: 'Sábado', hours: '09:00 - 13:00' },
    ],
    reviews: MOCK_REVIEWS,
  },
  { 
    id: 'p2', 
    name: 'Auto Spa Premium', 
    category: 'auto', 
    rating: 4.9, 
    reviewCount: 210, 
    distance: '1.2 km', 
    basePrice: 15000, 
    imageUrl: 'https://picsum.photos/400/300?random=2',
    description: 'Detalhe automotivo completo, incluindo polimento, higienização interna e vitrificação.',
    availability: [
      { day: 'Seg-Sáb', hours: '08:00 - 19:00' },
    ],
    reviews: MOCK_REVIEWS,
  },
  { 
    id: 'p3', 
    name: 'LimpaSofá Já', 
    category: 'upholstery', 
    rating: 4.7, 
    reviewCount: 88, 
    distance: '5.1 km', 
    basePrice: 12000, 
    imageUrl: 'https://picsum.photos/400/300?random=3',
    description: 'Limpeza e higienização profunda de sofás, tapetes e colchões. Removemos manchas e odores.',
    availability: [
      { day: 'Seg-Sex', hours: '09:00 - 17:00' },
    ],
    reviews: MOCK_REVIEWS,
  },
  { 
    id: 'p4', 
    name: 'Casa Limpa Express', 
    category: 'residential', 
    rating: 4.6, 
    reviewCount: 150, 
    distance: '3.0 km', 
    basePrice: 20000, 
    imageUrl: 'https://picsum.photos/400/300?random=4',
    description: 'Serviços de limpeza residencial por hora ou pacote. Profissionais de confiança e verificados.',
    availability: [
      { day: 'Seg-Sáb', hours: '07:00 - 18:00' },
    ],
    reviews: MOCK_REVIEWS,
  },
  { 
    id: 'p5', 
    name: 'Maria Ajuda', 
    category: 'domestic', 
    rating: 4.9, 
    reviewCount: 95, 
    distance: 'N/A', 
    basePrice: 80000, 
    imageUrl: 'https://picsum.photos/400/300?random=5',
    description: 'Agenciamento de trabalhadores domésticos para serviços diários, semanais ou mensais.',
    availability: [
      { day: 'Seg-Sex', hours: 'Horário a combinar' },
    ],
    reviews: MOCK_REVIEWS,
  },
  { 
    id: 'p6', 
    name: 'Lavandaria da Vovó', 
    category: 'laundry', 
    rating: 4.5, 
    reviewCount: 98, 
    distance: '4.5 km', 
    basePrice: 4500, 
    imageUrl: 'https://picsum.photos/400/300?random=6',
    description: 'Cuidado tradicional com as suas roupas. Serviço rápido e de confiança.',
    availability: [
      { day: 'Seg-Sex', hours: '08:00 - 18:00' },
    ],
    reviews: MOCK_REVIEWS,
  },
   { 
    id: 'p7', 
    name: 'Resolve Já - Técnicos', 
    category: 'maintenance', 
    rating: 4.9, 
    reviewCount: 312, 
    distance: 'Disponível em toda a cidade', 
    basePrice: 25000, 
    imageUrl: 'https://picsum.photos/400/300?random=7',
    description: 'Técnicos certificados para ar-condicionado, eletricidade e canalização. Atendimento de emergência 24/7.',
    availability: [
      { day: 'Todos os dias', hours: '24 horas' },
    ],
    reviews: MOCK_REVIEWS,
  },
  { 
    id: 'p8', 
    name: 'Lar Doce Lar Reparos', 
    category: 'maintenance', 
    rating: 4.7, 
    reviewCount: 180, 
    distance: '3.5 km', 
    basePrice: 18000, 
    imageUrl: 'https://picsum.photos/400/300?random=8',
    description: 'Especialistas em pintura, montagem de móveis e pequenas reparações domésticas. Orçamento grátis.',
    availability: [
      { day: 'Seg-Sáb', hours: '08:00 - 18:00' },
    ],
    reviews: MOCK_REVIEWS,
  },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ord1',
        provider: { id: 'p2', name: 'Auto Spa Premium', imageUrl: 'https://picsum.photos/400/300?random=2', category: 'auto' },
        user: { id: 'user1', name: 'Geiger' },
        date: '2024-07-28',
        time: '14:00',
        status: 'In Progress',
        total: 16500,
        orderCode: 'MBND-481516',
        address: 'Rua da Liberdade, 123, Luanda',
        serviceDetails: 'Lavagem Completa (SUV)',
        priceBreakdown: {
            basePrice: 15000,
            serviceFee: 1500,
        }
    },
    {
        id: 'ord2',
        provider: { id: 'p1', name: 'Lavandaria Brilho', imageUrl: 'https://picsum.photos/400/300?random=1', category: 'laundry' },
        user: { id: 'user1', name: 'Geiger' },
        date: '2024-07-25',
        time: '10:30',
        status: 'Completed',
        total: 5500,
        orderCode: 'MBND-234289',
        address: 'Av. Comandante Gika, 45, Luanda',
        serviceDetails: '5kg Roupa Comum (Recolha e Entrega)',
        priceBreakdown: {
            basePrice: 5000,
            serviceFee: 500,
            travelFee: 500,
        }
    },
    {
        id: 'ord3',
        provider: { id: 'p4', name: 'Casa Limpa Express', imageUrl: 'https://picsum.photos/400/300?random=4', category: 'residential' },
        user: { id: 'user1', name: 'Geiger' },
        date: '2024-07-22',
        time: '09:00',
        status: 'Completed',
        total: 22000,
        orderCode: 'MBND-849153',
        address: 'Condomínio Jardim de Rosas, Viana',
        serviceDetails: 'Limpeza Completa (Apartamento T3)',
        priceBreakdown: {
            basePrice: 20000,
            serviceFee: 2000,
        }
    }
];

export const MOCK_PROMOTIONS: Promotion[] = [
  { id: 'promo1', title: 'Seja Mbundu Prime!', description: 'Cashback e descontos exclusivos em todos os serviços.', imageUrl: 'https://picsum.photos/600/300?random=10' },
  { id: 'promo2', title: 'Primeira Lavagem com 20% OFF', description: 'Use o código BEMVINDO20 na sua primeira lavagem.', imageUrl: 'https://picsum.photos/600/300?random=11' },
  { id: 'promo3', title: 'Limpeza de Sofá + Tapete', description: 'Pacote especial com preço reduzido. Agende já!', imageUrl: 'https://picsum.photos/600/300?random=12' },
];