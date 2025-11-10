import React from 'react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => (
    <details className="bg-white p-4 rounded-lg shadow-sm cursor-pointer group transition-colors duration-300 open:bg-soft-teal/10">
        <summary className="font-semibold text-petroleum-blue flex justify-between items-center list-none">
            {question}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </summary>
        <div className="mt-3 text-dark-gray text-sm leading-relaxed">
            {children}
        </div>
    </details>
);

const SupportPage: React.FC = () => {
    return (
        <div className="p-4 font-roboto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-petroleum-blue font-poppins">Precisa de Ajuda?</h2>
                <p className="text-dark-gray mt-1">Encontre respostas para as perguntas mais frequentes.</p>
            </div>

            <div className="space-y-3">
                <FaqItem question="Como funciona o pagamento?">
                    <p>Aceitamos pagamentos via Multicaixa Express, e-Kwanza e Referência de Pagamento. No final do agendamento, ser-lhe-á apresentado o método de pagamento selecionado para finalizar a transação de forma segura.</p>
                </FaqItem>
                <FaqItem question="Posso cancelar um serviço agendado?">
                    <p>Sim, pode cancelar um serviço. Aceda a "Meus Pedidos", encontre o pedido que deseja cancelar e siga as instruções. Tenha em atenção que cancelamentos feitos muito perto da hora agendada podem estar sujeitos a uma taxa.</p>
                </FaqItem>
                <FaqItem question="O que é o Mbundu Prime?">
                    <p>Mbundu Prime é o nosso serviço de assinatura premium. Os membros beneficiam de cashback, descontos exclusivos, prioridade nos agendamentos e suporte ao cliente dedicado. Pode subscrever e gerir a sua assinatura na secção "Perfil".</p>
                </FaqItem>
                <FaqItem question="Os prestadores de serviço são de confiança?">
                    <p>Absolutamente. Todos os nossos prestadores passam por um rigoroso processo de verificação, que inclui verificação de antecedentes e validação de competências, para garantir a sua segurança e a qualidade do serviço.</p>
                </FaqItem>
            </div>
            
            <div className="mt-8 text-center bg-white p-6 rounded-lg shadow-sm">
                 <h3 className="font-bold text-petroleum-blue text-lg">Ainda com dúvidas?</h3>
                 <p className="text-dark-gray my-2">Contacte a nossa equipa de suporte.</p>
                 <a href="mailto:suporte@mbundu.co.ao" className="inline-block bg-mbundu-orange text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors">
                    Enviar Email
                 </a>
            </div>
        </div>
    );
};

export default SupportPage;