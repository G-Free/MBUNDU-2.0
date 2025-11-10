import React from 'react';
import { User, AppView } from '../types';
import { PrimeIcon, LogoutIcon, EditProfileIcon, LockIcon, BellIcon, QuestionMarkIcon, HeartIcon } from '../constants';

interface ProfilePageProps {
    user: User | null;
    onNavigate: (view: AppView) => void;
    onLogout: () => void;
}

const ProfileMenuItem: React.FC<{icon: React.ElementType, label: string, onClick: () => void, iconClass?: string}> = ({ icon: Icon, label, onClick, iconClass = "text-mbundu-orange" }) => (
    <button onClick={onClick} className="flex items-center w-full p-4 bg-white rounded-lg shadow-sm hover:bg-light-gray transition-colors">
        <Icon className={`w-6 h-6 ${iconClass}`} />
        <span className="ml-4 font-semibold text-petroleum-blue">{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-gray ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
    </button>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate, onLogout }) => {
    if (!user) {
        return <div className="p-4 text-center">Utilizador não encontrado.</div>;
    }

    return (
        <div className="font-roboto">
            <div className="p-4 flex flex-col items-center bg-gradient-to-br from-petroleum-blue to-soft-teal text-white rounded-b-3xl">
                <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-white/50 shadow-lg" />
                <h2 className="text-2xl font-bold mt-4 font-poppins">{user.name}</h2>
                <p className="opacity-80">{user.email}</p>
                {user.isMbunduPrime && (
                    <div className="mt-2 flex items-center px-3 py-1 bg-prime-gold text-petroleum-blue rounded-full text-sm font-semibold shadow">
                        <PrimeIcon className="w-4 h-4 mr-1"/>
                        Mbundu Prime
                    </div>
                )}
            </div>
            
            <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-dark-gray px-2 mb-2">Conta</h3>
                <ProfileMenuItem icon={EditProfileIcon} label="Editar Perfil" onClick={() => onNavigate(AppView.EDIT_PROFILE)} iconClass="text-info-blue" />
                <ProfileMenuItem icon={HeartIcon} label="Meus Favoritos" onClick={() => onNavigate(AppView.FAVORITES)} iconClass="text-danger-red" />
                <ProfileMenuItem icon={LockIcon} label="Alterar Senha" onClick={() => onNavigate(AppView.CHANGE_PASSWORD)} iconClass="text-info-blue" />
                <ProfileMenuItem icon={PrimeIcon} label="Gerir Assinatura Prime" onClick={() => onNavigate(AppView.MBUNDU_PRIME)} iconClass="text-prime-gold" />
                
                <h3 className="text-lg font-semibold text-dark-gray px-2 mt-6 mb-2">Geral</h3>
                <ProfileMenuItem icon={BellIcon} label="Notificações" onClick={() => onNavigate(AppView.NOTIFICATIONS)} iconClass="text-soft-teal" />
                <ProfileMenuItem icon={QuestionMarkIcon} label="Suporte e FAQ" onClick={() => onNavigate(AppView.SUPPORT)} iconClass="text-soft-teal" />

                <div className="pt-4">
                     <button onClick={onLogout} className="flex items-center w-full p-4 bg-white rounded-lg shadow-sm hover:bg-light-gray transition-colors">
                        <LogoutIcon className="w-6 h-6 text-danger-red" />
                        <span className="ml-4 font-semibold text-danger-red">Sair</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;