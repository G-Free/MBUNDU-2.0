import React from 'react';
import { HomeIcon, ListIcon, UserIcon } from '../constants';
import { AppView } from '../types';

interface BottomNavBarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { view: AppView.HOME, icon: HomeIcon, label: 'Início' },
    { view: AppView.ORDERS, icon: ListIcon, label: 'Pedidos' },
    { view: AppView.PROFILE, icon: UserIcon, label: 'Perfil' },
  ];

  const itemGroups: Record<string, AppView[]> = {
    [AppView.HOME]: [AppView.HOME, AppView.SERVICE_LIST, AppView.SERVICE_DETAILS, AppView.BOOKING],
    [AppView.ORDERS]: [AppView.ORDERS, AppView.ORDER_DETAILS],
    [AppView.PROFILE]: [AppView.PROFILE, AppView.MBUNDU_PRIME, AppView.FAVORITES, AppView.EDIT_PROFILE, AppView.CHANGE_PASSWORD, AppView.NOTIFICATIONS, AppView.SUPPORT],
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-medium-gray shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around max-w-lg mx-auto h-16">
        {navItems.map((item) => {
           const isActive = itemGroups[item.view]?.includes(activeView);
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`relative flex flex-col items-center justify-center w-full pt-1 text-sm transition-colors duration-200 ${
                isActive ? 'text-mbundu-orange' : 'text-dark-gray hover:text-petroleum-blue'
              }`}
            >
              {isActive && <div className="absolute top-0 w-1/2 h-0.5 bg-mbundu-orange rounded-b-full"></div>}
              <item.icon className="h-6 w-6 mb-1" />
              <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;