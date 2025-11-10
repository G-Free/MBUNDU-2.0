import React, { useState, useEffect } from 'react';

interface AutoBookingFormProps {
    onDetailsChange: (details: any) => void;
    isDarkMode?: boolean;
    errors: Record<string, string>;
    clearError: (fieldName: string) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AutoBookingForm: React.FC<AutoBookingFormProps> = ({ onDetailsChange, isDarkMode, errors, clearError, onBlur }) => {
    const [veiculo, setVeiculo] = useState('');
    const [servico, setServico] = useState('');
    const [observacoes, setObservacoes] = useState('');

     useEffect(() => {
        onDetailsChange({ veiculo, servico, observacoes });
    }, [veiculo, servico, observacoes, onDetailsChange]);

     const getInputClassName = (fieldName: string) => `w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-mbundu-orange ${
        isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
        : 'bg-white border-medium-gray'
    } ${errors[fieldName] ? 'border-danger-red' : ''}`;

    const ErrorMessage: React.FC<{ fieldName: string }> = ({ fieldName }) => {
        if (!errors[fieldName]) return null;
        return <p className="text-danger-red text-sm mt-1">⚠️ {errors[fieldName]}</p>;
    };

    return (
        <div>
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Detalhes do Veículo</label>
            <div className="space-y-4">
                <div>
                    <select 
                        name="veiculo"
                        value={veiculo}
                        onChange={e => { setVeiculo(e.target.value); clearError('veiculo'); }}
                        onBlur={onBlur}
                        className={getInputClassName('veiculo')}
                    >
                        <option value="">Tipo de Veículo</option>
                        <option value="ligeiro">Ligeiro</option>
                        <option value="suv">SUV</option>
                        <option value="motorizada">Motorizada</option>
                        <option value="carrinha">Carrinha</option>
                    </select>
                    <ErrorMessage fieldName="veiculo" />
                </div>
                <div>
                     <select 
                        name="servico"
                        value={servico}
                        onChange={e => { setServico(e.target.value); clearError('servico'); }}
                        onBlur={onBlur}
                        className={getInputClassName('servico')}
                    >
                        <option value="">Serviço Desejado</option>
                        <option value="completa">Lavagem Completa</option>
                        <option value="externa">Lavagem Externa</option>
                        <option value="interna">Lavagem Interna</option>
                        <option value="polimento">Polimento</option>
                        <option value="higienizacao">Higienização de Estofos</option>
                    </select>
                    <ErrorMessage fieldName="servico" />
                </div>
                <textarea
                    name="observacoes_auto"
                    value={observacoes}
                    onChange={e => setObservacoes(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Observações (ex: mancha específica, área de atenção)"
                    rows={3}
                    className={getInputClassName('observacoes_auto')}
                ></textarea>
            </div>
        </div>
    );
};

export default AutoBookingForm;
