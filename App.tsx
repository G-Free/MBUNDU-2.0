import React, { useState, useEffect, useMemo } from 'react';
import { AppView, ServiceCategory, ServiceProvider, User, ChatMessage, Order } from './types';
import { MOCK_PROVIDERS } from './constants';
import SplashScreen from './components/SplashScreen';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import BookingPage from './pages/BookingPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProfilePage from './pages/ProfilePage';
import MbunduPrimePage from './pages/MbunduPrimePage';
import ChatPage from './components/ChatPage';
import { fetchProvidersByCategory, fetchUser } from './services/api';
import ServiceCard from './components/ServiceCard';
import EditProfilePage from './pages/EditProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import NotificationsPage from './pages/NotificationsPage';
import SupportPage from './pages/SupportPage';


const ServiceListPage: React.FC<{
  category: ServiceCategory;
  onSelectProvider: (provider: ServiceProvider) => void;
  favoriteProviderIds: string[];
  onToggleFavorite: (providerId: string) => void;
}> = ({ category, onSelectProvider, favoriteProviderIds, onToggleFavorite }) => {
  type SortByType = 'distance' | 'rating' | 'price_asc' | 'price_desc';

  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortByType>('distance');

  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);
      const data = await fetchProvidersByCategory(category.id);
      setProviders(data);
      setLoading(false);
    };
    loadProviders();
  }, [category]);

  const sortedProviders = useMemo(() => {
    return [...providers].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_asc':
          return a.basePrice - b.basePrice;
        case 'price_desc':
          return b.basePrice - a.basePrice;
        case 'distance':
        default:
          const distA = parseFloat(a.distance.replace(/[^0-9.]/g, ''));
          const distB = parseFloat(b.distance.replace(/[^0-9.]/g, ''));
          return distA - distB;
      }
    });
  }, [providers, sortBy]);

  const SortButton: React.FC<{ value: SortByType; label: string }> = ({ value, label }) => (
    <button
      onClick={() => setSortBy(value)}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
        sortBy === value
          ? 'bg-petroleum-blue text-white'
          : 'bg-white text-dark-gray border border-medium-gray hover:bg-light-gray'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="text-sm text-dark-gray mb-2">Ordenar por:</p>
        <div className="flex flex-wrap gap-2">
            <SortButton value="distance" label="Distância" />
            <SortButton value="rating" label="Avaliação" />
            <SortButton value="price_asc" label="Preço (menor)" />
            <SortButton value="price_desc" label="Preço (maior)" />
        </div>
      </div>
      {loading ? (
        <div className="text-center pt-8">A procurar prestadores...</div>
      ) : sortedProviders.length > 0 ? (
        sortedProviders.map(provider => (
          <ServiceCard 
            key={provider.id} 
            provider={provider} 
            onClick={() => onSelectProvider(provider)}
            isFavorite={favoriteProviderIds.includes(provider.id)}
            onToggleFavorite={(e) => {
                e.stopPropagation();
                onToggleFavorite(provider.id);
            }}
          />
        ))
      ) : (
        <div className="text-center pt-8">Nenhum prestador encontrado para esta categoria.</div>
      )}
    </div>
  );
};

const FavoritesPage: React.FC<{
    onSelectProvider: (provider: ServiceProvider) => void;
    favoriteProviderIds: string[];
    onToggleFavorite: (providerId: string) => void;
}> = ({ onSelectProvider, favoriteProviderIds, onToggleFavorite }) => {
    
    const favoriteProviders = useMemo(() => 
        MOCK_PROVIDERS.filter(p => favoriteProviderIds.includes(p.id)), 
        [favoriteProviderIds]
    );

    return (
        <div className="p-4">
            {favoriteProviders.length > 0 ? (
                favoriteProviders.map(provider => (
                    <ServiceCard
                        key={provider.id}
                        provider={provider}
                        onClick={() => onSelectProvider(provider)}
                        isFavorite={true}
                        onToggleFavorite={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(provider.id);
                        }}
                    />
                ))
            ) : (
                <div className="text-center pt-16 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-medium-gray mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                    <h3 className="text-xl font-semibold text-petroleum-blue">Ainda sem favoritos</h3>
                    <p className="text-dark-gray mt-2">Toque no coração para guardar os seus prestadores preferidos.</p>
                </div>
            )}
        </div>
    );
};


const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.SPLASH);
  const [previousView, setPreviousView] = useState<AppView>(AppView.HOME);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [favoriteProviderIds, setFavoriteProviderIds] = useState<string[]>(['p2', 'p7']);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatPartner, setChatPartner] = useState<{ id: string; name: string; imageUrl: string } | null>(null);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    if (view === AppView.SPLASH) {
      const timer = setTimeout(() => {
        setView(AppView.LOGIN);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const handleLogin = async () => {
    const user = await fetchUser('user1');
    setCurrentUser(user);
    setView(AppView.HOME);
  };
  
  const handleUpdateUser = (updatedData: Partial<User>) => {
    if (currentUser) {
        setCurrentUser(prev => ({...prev!, ...updatedData}));
    }
    handleBack(); // Go back to profile page after saving
  };


  const handleLogout = () => {
      setCurrentUser(null);
      setView(AppView.LOGIN);
  };

  const handleSelectCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setView(AppView.SERVICE_LIST);
  };

  const handleSelectProvider = (provider: ServiceProvider) => {
      setSelectedProvider(provider);
      setView(AppView.SERVICE_DETAILS);
  };
  
  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setView(AppView.ORDER_DETAILS);
  }
  
  const toggleFavorite = (providerId: string) => {
      setFavoriteProviderIds(prev =>
        prev.includes(providerId)
          ? prev.filter(id => id !== providerId)
          : [...prev, providerId]
      );
    };

  const getBotResponse = (userMessage: string): ChatMessage => {
      const text = userMessage.toLowerCase();
      let responseText = "Desculpe, não entendi a sua questão. Quer que eu passe para um assistente humano?";

      if (text.includes("cancelar")) {
          responseText = "Para cancelar um serviço, vá para a secção 'Pedidos', encontre o pedido que deseja cancelar e siga as instruções. Posso ajudar com mais alguma coisa?";
      } else if (text.includes("ajuda") || text.includes("suporte")) {
          responseText = "Olá! Sou o Mbundu Assist. Como posso ajudar? Pode perguntar sobre cancelamentos, pagamentos ou o Mbundu Prime.";
      } else if (text.includes("prime")) {
          responseText = "O Mbundu Prime oferece cashback, descontos e prioridade no agendamento. Pode saber mais e subscrever na secção 'Perfil'.";
      } else if (text.includes("pagamento") || text.includes("pagar")) {
          responseText = "Aceitamos Multicaixa Express, e-Kwanza e pagamento por referência. Pode selecionar o seu método preferido no momento do agendamento.";
      }

      return {
          id: `bot-${Date.now()}`,
          sender: 'provider',
          text: responseText,
          timestamp: new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
      };
  }

  const handleSendMessage = (text: string) => {
      const userMessage: ChatMessage = {
          id: `user-${Date.now()}`,
          sender: 'user',
          text,
          timestamp: new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
          isRead: false,
      };
      setChatMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate bot response and read receipt
      setTimeout(() => {
          const botResponse = getBotResponse(text);
          setChatMessages(prev => 
              prev.map(msg => msg.id === userMessage.id ? { ...msg, isRead: true } : msg)
          );
          setChatMessages(prev => [...prev, botResponse]);
          setIsTyping(false);
      }, 1500);
  };
  
  const handleStartChat = (provider: ServiceProvider | Order['provider'], order?: Order) => {
      setChatPartner({
          id: provider.id,
          name: provider.name,
          imageUrl: provider.imageUrl
      });
      const initialMessages: ChatMessage[] = [];
      if (order) {
          initialMessages.push({
              id: `system-${Date.now()}`,
              sender: 'system',
              text: `Chat sobre o pedido ${order.orderCode}`,
              timestamp: '',
              type: 'system'
          });
      }
      initialMessages.push({
          id: `bot-welcome-${Date.now()}`,
          sender: 'provider',
          text: `Olá! Sou o assistente virtual de ${provider.name}. Como posso ajudar?`,
          timestamp: new Date().toLocaleTimeString('pt-AO', { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
      });
      setChatMessages(initialMessages);
      setPreviousView(view);
      setView(AppView.CHAT);
  };


  const handleBack = () => {
    if (view === AppView.SERVICE_LIST) { setView(AppView.HOME); setSelectedCategory(null); }
    else if (view === AppView.SERVICE_DETAILS) { setView(AppView.SERVICE_LIST); setSelectedProvider(null); }
    else if (view === AppView.ORDER_DETAILS) { setView(AppView.ORDERS); setSelectedOrder(null); }
    else if (view === AppView.BOOKING) setView(AppView.SERVICE_DETAILS);
    else if (view === AppView.CHAT) { setView(previousView); setIsTyping(false); }
    else if ([AppView.MBUNDU_PRIME, AppView.FAVORITES, AppView.EDIT_PROFILE, AppView.CHANGE_PASSWORD, AppView.NOTIFICATIONS, AppView.SUPPORT].includes(view)) setView(AppView.PROFILE);
    else { setView(AppView.HOME) }
  };

  const handleNavigate = (targetView: AppView) => {
      if (targetView === AppView.HOME) {
          setSelectedCategory(null);
          setSelectedProvider(null);
          setSelectedOrder(null);
      }
      setPreviousView(view);
      setView(targetView);
  }

  const renderHeader = () => {
    if (view === AppView.CHAT) return null; // ChatPage has its own header

    const headerTitles: Partial<Record<AppView, string>> = {
        [AppView.SERVICE_LIST]: selectedCategory?.name || 'Serviços',
        [AppView.SERVICE_DETAILS]: 'Detalhes do Serviço',
        [AppView.BOOKING]: 'Agendamento',
        [AppView.ORDERS]: 'Meus Pedidos',
        [AppView.ORDER_DETAILS]: 'Detalhes do Pedido',
        [AppView.PROFILE]: 'Meu Perfil',
        [AppView.MBUNDU_PRIME]: 'Mbundu Prime',
        [AppView.FAVORITES]: 'Meus Favoritos',
        [AppView.EDIT_PROFILE]: 'Editar Perfil',
        [AppView.CHANGE_PASSWORD]: 'Alterar Senha',
        [AppView.NOTIFICATIONS]: 'Notificações',
        [AppView.SUPPORT]: 'Ajuda e Suporte',
    };
    
    const title = headerTitles[view];
    const showBack = ![AppView.HOME, AppView.ORDERS, AppView.PROFILE, AppView.LOGIN, AppView.SPLASH].includes(view);

    if (!title) return null;
    return <Header title={title} onBack={showBack ? handleBack : undefined} />;
  }

  const renderContent = () => {
    switch (view) {
      case AppView.SPLASH:
        return <SplashScreen />;
      case AppView.LOGIN:
        return <LoginPage onLoginSuccess={handleLogin} />;
      case AppView.HOME:
        return <HomePage user={currentUser} onSelectCategory={handleSelectCategory} />;
      case AppView.SERVICE_LIST:
        return selectedCategory && <ServiceListPage category={selectedCategory} onSelectProvider={handleSelectProvider} favoriteProviderIds={favoriteProviderIds} onToggleFavorite={toggleFavorite} />;
      case AppView.SERVICE_DETAILS:
        return selectedProvider && <ServiceDetailsPage providerId={selectedProvider.id} onBook={() => setView(AppView.BOOKING)} isFavorite={favoriteProviderIds.includes(selectedProvider.id)} onToggleFavorite={() => toggleFavorite(selectedProvider.id)} onStartChat={handleStartChat} />;
      case AppView.BOOKING:
        return selectedProvider && <BookingPage provider={selectedProvider} user={currentUser} onBookingComplete={() => setView(AppView.ORDERS)} />;
      case AppView.ORDERS:
        return <OrdersPage onSelectOrder={handleSelectOrder} onStartChat={(order) => handleStartChat(order.provider, order)} />;
       case AppView.ORDER_DETAILS:
        return selectedOrder && <OrderDetailsPage order={selectedOrder} onStartChat={(order) => handleStartChat(order.provider, order)} />;
      case AppView.PROFILE:
        return <ProfilePage user={currentUser} onNavigate={handleNavigate} onLogout={handleLogout}/>;
      case AppView.MBUNDU_PRIME:
        return <MbunduPrimePage isSubscribed={currentUser?.isMbunduPrime || false} onSubscribe={() => alert('Funcionalidade de subscrição em desenvolvimento.')} />;
      case AppView.FAVORITES:
        return <FavoritesPage onSelectProvider={handleSelectProvider} favoriteProviderIds={favoriteProviderIds} onToggleFavorite={toggleFavorite} />;
      case AppView.CHAT:
        return chatPartner && <ChatPage partner={chatPartner} messages={chatMessages} onSendMessage={handleSendMessage} onBack={handleBack} isTyping={isTyping} />;
      case AppView.EDIT_PROFILE:
        return currentUser && <EditProfilePage user={currentUser} onSave={handleUpdateUser} />;
      case AppView.CHANGE_PASSWORD:
        return <ChangePasswordPage onSave={handleBack} />;
      case AppView.NOTIFICATIONS:
        return <NotificationsPage />;
      case AppView.SUPPORT:
        return <SupportPage />;
      default:
        return <HomePage user={currentUser} onSelectCategory={handleSelectCategory} />;
    }
  };

  const showNav = view !== AppView.SPLASH && view !== AppView.LOGIN && view !== AppView.CHAT;
  const isChatView = view === AppView.CHAT;
  
  return (
    <div className="max-w-lg mx-auto bg-light-gray min-h-screen font-roboto shadow-2xl relative">
      {!isChatView && renderHeader()}
      <main className={`${!isChatView ? 'pb-20' : ''} ${!showNav && !isChatView ? 'h-screen' : ''} ${isChatView ? 'h-screen' : ''}`}>
        {renderContent()}
      </main>
      {showNav && <BottomNavBar activeView={view} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;