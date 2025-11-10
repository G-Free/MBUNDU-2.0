
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-petroleum-blue font-poppins">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white tracking-wider">MBUNDU</h1>
        <p className="text-xl font-light text-mbundu-orange">2.0</p>
      </div>
      <div className="absolute bottom-20 flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-t-mbundu-orange border-white rounded-full animate-spin"></div>
        <p className="text-white mt-4">A carregar...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
