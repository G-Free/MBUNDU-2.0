import React, { useState } from 'react';
import { User } from '../types';

interface EditProfilePageProps {
    user: User;
    onSave: (updatedData: Partial<User>) => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, onSave }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (!name.trim() || !email.trim() || !phone.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        onSave({ name, email, phone });
        alert('Perfil atualizado com sucesso!');
    };

    return (
        <div className="p-4 font-roboto">
            <div className="flex flex-col items-center mb-8">
                <div className="relative">
                    <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
                    <button className="absolute bottom-0 right-0 bg-mbundu-orange text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSaveChanges} className="space-y-4">
                <div>
                    <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="name">
                        Nome Completo
                    </label>
                    <input 
                        id="name"
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" 
                    />
                </div>
                <div>
                    <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" 
                    />
                </div>
                <div>
                    <label className="block text-dark-gray text-sm font-bold mb-2" htmlFor="phone">
                        Telefone
                    </label>
                    <input 
                        id="phone"
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-dark-gray leading-tight focus:outline-none focus:ring-2 focus:ring-mbundu-orange" 
                    />
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-mbundu-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300">
                        Guardar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePage;
