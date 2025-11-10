
import React from 'react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center h-16">
      {onBack && (
        <button onClick={onBack} className="mr-4 text-petroleum-blue">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h1 className="text-xl font-semibold text-petroleum-blue font-poppins">{title}</h1>
    </header>
  );
};

export default Header;
