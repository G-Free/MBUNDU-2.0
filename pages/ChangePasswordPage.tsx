import React, { useState } from 'react';

interface ChangePasswordPageProps {
    onSave: () => void;
}

const ChangePasswordPage: React.FC<ChangePasswordPageProps> = ({ onSave }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('As novas senhas não coincidem.');
            return;
        }
        if (newPassword.length < 6) {
            alert('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }
        alert('Senha alterada com sucesso!');
        onSave();
    };

    return (
        <div className="p-4 font-roboto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-petroleum-blue font-poppins">Segurança da Conta</h2>
                <p className="text-dark-gray mt-1">Altere a sua senha regularmente para manter a sua conta segura.</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                <div>
                    <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="current-password">
                        Senha Atual
                    </label>
                    <input 
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" 
                        placeholder="******************"
                    />
                </div>
                <div>
                    <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="new-password">
                        Nova Senha
                    </label>
                    <input 
                        id="new-password"
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" 
                        placeholder="******************"
                    />
                </div>
                <div>
                    <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="confirm-password">
                        Confirmar Nova Senha
                    </label>
                    <input 
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" 
                        placeholder="******************"
                    />
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-mbundu-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">
                        Alterar Senha
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
