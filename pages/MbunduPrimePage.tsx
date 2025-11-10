
import React from 'react';
import { PrimeIcon } from '../constants';

interface MbunduPrimePageProps {
    isSubscribed: boolean;
    onSubscribe: () => void;
}

const MbunduPrimePage: React.FC<MbunduPrimePageProps> = ({ isSubscribed, onSubscribe }) => {
    
    const benefits = [
        "Cashback em todos os serviços",
        "Descontos exclusivos em parceiros",
        "Prioridade no agendamento",
        "Atendimento ao cliente premium",
        "Ofertas especiais todos os meses"
    ];

    return (
        <div className="font-roboto text-center bg-petroleum-blue text-white min-h-full">
            <div className="p-8">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-prime-gold rounded-full flex items-center justify-center shadow-lg">
                         <h1 className="text-3xl font-bold text-petroleum-blue tracking-wider font-poppins">M</h1>
                    </div>
                </div>
                <h2 className="text-3xl font-bold font-poppins text-prime-gold">Mbundu Prime</h2>
                <p className="mt-2 text-lg opacity-80">A experiência premium de serviços.</p>
            </div>
            
            <div className="p-6 bg-light-gray text-petroleum-blue rounded-t-3xl">
                <h3 className="text-xl font-bold mb-4 font-poppins">Vantagens Exclusivas</h3>
                <ul className="space-y-3 text-left">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                            <PrimeIcon className="w-6 h-6 text-prime-gold mr-3 flex-shrink-0 mt-1" />
                            <span className="text-dark-gray">{benefit}</span>
                        </li>
                    ))}
                </ul>
                
                <div className="my-8 p-6 bg-gradient-to-br from-petroleum-blue to-soft-teal text-white rounded-xl shadow-lg">
                    <p className="opacity-80">Acesso a todas as vantagens por apenas</p>
                    <p className="text-4xl font-bold my-2">
                        1.500 AOA
                        <span className="text-lg font-normal opacity-80">/mês</span>
                    </p>
                </div>
                
                {isSubscribed ? (
                     <div className="font-semibold text-success-green p-3 bg-success-green/10 rounded-lg">
                        <p>Você já é um membro Prime!</p>
                        <p className="text-sm font-normal">A sua subscrição é válida até 24/08/2024</p>
                    </div>
                ) : (
                    <button 
                        onClick={onSubscribe}
                        className="w-full bg-prime-gold hover:opacity-90 text-petroleum-blue font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-opacity duration-300 text-lg shadow-md"
                    >
                        Aderir ao Prime
                    </button>
                )}
            </div>
        </div>
    );
};

export default MbunduPrimePage;