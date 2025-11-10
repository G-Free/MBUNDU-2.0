import React from 'react';
import { Order } from '../types';
import { ReceiptIcon, ArrowPathIcon } from '../constants';
import MapComponent from '../components/MapComponent';

interface OrderDetailsPageProps {
  order: Order;
  onStartChat: (order: Order) => void;
}

const DetailRow: React.FC<{ label: string; value: React.ReactNode; isBold?: boolean; className?: string }> = ({ label, value, isBold, className = '' }) => (
    <div className={`flex justify-between py-2 ${className}`}>
        <span className="text-dark-gray">{label}</span>
        <span className={`text-petroleum-blue text-right ${isBold ? 'font-bold' : ''}`}>{value}</span>
    </div>
);

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ order, onStartChat }) => {
    const statusInfo = {
        'In Progress': { bg: 'bg-info-blue/10', text: 'text-info-blue', label: 'Em Andamento' },
        'Completed': { bg: 'bg-success-green/10', text: 'text-success-green', label: 'Concluído' },
        'Cancelled': { bg: 'bg-danger-red/10', text: 'text-danger-red', label: 'Cancelado' },
    };
    const currentStatus = statusInfo[order.status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: order.status };


    return (
        <div className="font-roboto">
            {/* Provider Header */}
            <div className="p-4 flex items-center bg-white">
                <img src={order.provider.imageUrl} alt={order.provider.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
                <div>
                    <h2 className="text-xl font-bold text-petroleum-blue font-poppins">{order.provider.name}</h2>
                    <p className="text-sm text-dark-gray">{order.provider.category}</p>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Order Status & Info */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg text-petroleum-blue">Pedido {order.orderCode}</h3>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${currentStatus.bg} ${currentStatus.text}`}>
                            {currentStatus.label}
                        </span>
                    </div>
                    <div className="text-dark-gray space-y-1">
                        <p><strong>Data:</strong> {new Date(order.date + 'T00:00:00').toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric'})}</p>
                        <p><strong>Hora:</strong> {order.time}</p>
                    </div>
                </div>

                {/* Service & Address */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                     <h3 className="font-bold text-lg text-petroleum-blue mb-3 border-b pb-2">Detalhes do Serviço</h3>
                     <p className="text-dark-gray mb-4">{order.serviceDetails}</p>
                     <h4 className="font-semibold text-petroleum-blue mb-2">Morada de Atendimento</h4>
                     <p className="text-dark-gray mb-3">{order.address}</p>
                     <div className="h-40 rounded-lg overflow-hidden">
                        <MapComponent onLocationSelect={() => {}} />
                     </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg text-petroleum-blue mb-2 flex items-center"><ReceiptIcon className="w-6 h-6 mr-2" />Resumo Financeiro</h3>
                    <div className="border-t">
                        <DetailRow label="Preço Base" value={order.priceBreakdown.basePrice.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })} />
                        <DetailRow label="Taxa de Serviço" value={<span>+ {order.priceBreakdown.serviceFee.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>} />
                        {order.priceBreakdown.travelFee && <DetailRow label="Deslocação" value={<span>+ {order.priceBreakdown.travelFee.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>} />}
                        {order.priceBreakdown.primeDiscount && <DetailRow label="Desconto Prime" className="text-success-green" value={<span>- {order.priceBreakdown.primeDiscount.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>} />}
                        <div className="border-t my-1"></div>
                        <DetailRow label="Total" value={order.total.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })} isBold />
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                     <button 
                        onClick={() => onStartChat(order)}
                        className="w-full py-3 px-4 rounded-lg bg-soft-teal text-white font-semibold hover:bg-opacity-90 transition-colors">
                        Contactar Prestador
                    </button>
                    {order.status === 'Completed' && (
                         <button 
                            onClick={() => alert('Funcionalidade "Pedir Novamente" em desenvolvimento.')}
                            className="w-full py-3 px-4 rounded-lg bg-mbundu-orange text-white font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center">
                            <ArrowPathIcon className="w-5 h-5 mr-2" />
                            Pedir Novamente
                        </button>
                    )}
                     {order.status === 'Completed' && (
                         <button 
                            onClick={() => alert('Funcionalidade "Avaliar" em desenvolvimento.')}
                            className="w-full py-3 px-4 rounded-lg bg-white border border-petroleum-blue text-petroleum-blue font-semibold hover:bg-light-gray transition-colors">
                            Avaliar Serviço
                        </button>
                    )}
                    {order.status === 'In Progress' && (
                        <>
                             <button 
                                onClick={() => alert('Funcionalidade "Reagendar" em desenvolvimento.')}
                                className="w-full py-3 px-4 rounded-lg bg-white border border-petroleum-blue text-petroleum-blue font-semibold hover:bg-light-gray transition-colors">
                                Reagendar
                            </button>
                            <button 
                                onClick={() => alert('Funcionalidade "Cancelar" em desenvolvimento.')}
                                className="w-full py-3 px-4 rounded-lg bg-transparent text-danger-red font-semibold hover:bg-danger-red/10 transition-colors">
                                Cancelar Pedido
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;