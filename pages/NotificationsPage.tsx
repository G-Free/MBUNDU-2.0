import React, { useState } from 'react';

const Toggle: React.FC<{ label: string; enabled: boolean; onToggle: () => void }> = ({ label, enabled, onToggle }) => (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
        <span className="font-semibold text-petroleum-blue">{label}</span>
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mbundu-orange ${
                enabled ? 'bg-success-green' : 'bg-medium-gray'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);


const NotificationsPage: React.FC = () => {
    const [promoEnabled, setPromoEnabled] = useState(true);
    const [orderUpdatesEnabled, setOrderUpdatesEnabled] = useState(true);
    const [remindersEnabled, setRemindersEnabled] = useState(false);

    return (
        <div className="p-4 font-roboto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-petroleum-blue font-poppins">Gerir Notificações</h2>
                <p className="text-dark-gray mt-1">Escolha como pretende receber as nossas comunicações.</p>
            </div>
            <div className="space-y-3">
                <Toggle 
                    label="Promoções e Ofertas" 
                    enabled={promoEnabled} 
                    onToggle={() => setPromoEnabled(!promoEnabled)} 
                />
                 <Toggle 
                    label="Atualizações de Pedidos" 
                    enabled={orderUpdatesEnabled} 
                    onToggle={() => setOrderUpdatesEnabled(!orderUpdatesEnabled)} 
                />
                 <Toggle 
                    label="Lembretes de Agendamento" 
                    enabled={remindersEnabled} 
                    onToggle={() => setRemindersEnabled(!remindersEnabled)} 
                />
            </div>
        </div>
    );
};

export default NotificationsPage;