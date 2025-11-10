import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import { fetchOrders } from '../services/api';
import OrderCard from '../components/OrderCard';

interface OrdersPageProps {
    onSelectOrder: (order: Order) => void;
    onStartChat: (order: Order) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ onSelectOrder, onStartChat }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'inProgress' | 'completed'>('inProgress');
    
    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            // In a real app, you'd pass the current user's ID
            const userOrders = await fetchOrders('user1');
            setOrders(userOrders);
            setLoading(false);
        };
        loadOrders();
    }, []);

    const inProgressOrders = orders.filter(o => o.status === 'In Progress');
    const completedOrders = orders.filter(o => o.status === 'Completed' || o.status === 'Cancelled');

    return (
        <div className="p-4">
            <div className="flex border-b border-medium-gray mb-4">
                <button 
                    onClick={() => setActiveTab('inProgress')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'inProgress' ? 'text-mbundu-orange border-b-2 border-mbundu-orange' : 'text-dark-gray'}`}
                >
                    Em Andamento
                </button>
                <button 
                    onClick={() => setActiveTab('completed')}
                    className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === 'completed' ? 'text-mbundu-orange border-b-2 border-mbundu-orange' : 'text-dark-gray'}`}
                >
                    Histórico
                </button>
            </div>

            {loading ? (
                <div className="text-center p-8">A carregar pedidos...</div>
            ) : (
                <div>
                    {activeTab === 'inProgress' && (
                        inProgressOrders.length > 0 ? inProgressOrders.map(order => <OrderCard key={order.id} order={order} onSelectOrder={onSelectOrder} onStartChat={onStartChat} />) : <p className="text-center text-dark-gray p-8">Nenhum pedido em andamento.</p>
                    )}
                    {activeTab === 'completed' && (
                        completedOrders.length > 0 ? completedOrders.map(order => <OrderCard key={order.id} order={order} onSelectOrder={onSelectOrder} onStartChat={onStartChat} />) : <p className="text-center text-dark-gray p-8">Nenhum pedido no histórico.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;