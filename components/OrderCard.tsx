import React from 'react';
import { Order } from '../types';

interface OrderCardProps {
    order: Order;
    onSelectOrder: (order: Order) => void;
    onStartChat: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onSelectOrder, onStartChat }) => {
    const statusInfo = {
        'In Progress': { bg: 'bg-info-blue/10', text: 'text-info-blue', border: 'border-info-blue', label: 'Em Andamento' },
        'Completed': { bg: 'bg-success-green/10', text: 'text-success-green', border: 'border-success-green', label: 'Concluído' },
        'Cancelled': { bg: 'bg-danger-red/10', text: 'text-danger-red', border: 'border-danger-red', label: 'Cancelado' },
    };

    const currentStatus = statusInfo[order.status] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-400', label: order.status };


    return (
        <div onClick={() => onSelectOrder(order)} className={`bg-white rounded-xl shadow-md overflow-hidden mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 ${currentStatus.border}`}>
            <div className="flex">
                <img className="w-1/4 h-auto object-cover" src={order.provider.imageUrl} alt={order.provider.name} />
                <div className="w-3/4 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-petroleum-blue text-md font-poppins flex-1 pr-2">{order.provider.name}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${currentStatus.bg} ${currentStatus.text}`}>
                                {currentStatus.label}
                            </span>
                        </div>
                        <p className="text-sm text-dark-gray mt-1">{`Pedido #${order.orderCode}`}</p>
                        <p className="text-sm text-dark-gray">{`${new Date(order.date + 'T00:00:00').toLocaleDateString('pt-AO', { day: '2-digit', month: 'short', year: 'numeric'})} às ${order.time}`}</p>
                    </div>
                    <p className="text-right font-semibold text-petroleum-blue text-lg mt-2">
                        {order.total.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                    </p>
                </div>
            </div>
            <div className="border-t border-medium-gray p-2 flex justify-end gap-2 bg-light-gray/50">
                 <button 
                    onClick={(e) => { e.stopPropagation(); onStartChat(order); }}
                    className="px-3 py-1.5 text-sm font-semibold bg-petroleum-blue text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Abrir Chat
                </button>
                 <button 
                    onClick={() => onSelectOrder(order)}
                    className="px-3 py-1.5 text-sm font-semibold bg-mbundu-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                    Ver Detalhes
                </button>
            </div>
        </div>
    );
};

export default OrderCard;