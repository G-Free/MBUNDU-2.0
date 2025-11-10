import React, { useState, useEffect } from 'react';

interface LaundryBookingFormProps {
    onDetailsChange: (details: any) => void;
    isDarkMode?: boolean;
    errors: Record<string, string>;
    clearError: (fieldName: string) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const LaundryBookingForm: React.FC<LaundryBookingFormProps> = ({ onDetailsChange, isDarkMode, errors, clearError, onBlur }) => {
    const [tipoRoupa, setTipoRoupa] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [entrega, setEntrega] = useState('48h');
    const [observacoes, setObservacoes] = useState('');

    useEffect(() => {
        onDetailsChange({
            tipoRoupa,
            quantidade: parseFloat(quantidade) || 0,
            entrega,
            observacoes,
        });
    }, [tipoRoupa, quantidade, entrega, observacoes, onDetailsChange]);

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
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Detalhes do Serviço</label>
            <div className="space-y-4">
                <div>
                    <select 
                        name="tipoRoupa"
                        value={tipoRoupa}
                        onChange={(e) => { setTipoRoupa(e.target.value); clearError('tipoRoupa'); }}
                        onBlur={onBlur}
                        className={getInputClassName('tipoRoupa')}
                    >
                        <option value="">Tipo de Roupa</option>
                        <option value="comum">Roupa Comum</option>
                        <option value="cama">Roupa de Cama</option>
                        <option value="uniformes">Uniformes</option>
                        <option value="delicados">Têxteis Delicados</option>
                    </select>
                    <ErrorMessage fieldName="tipoRoupa" />
                </div>
                <div>
                    <input 
                        name="quantidade"
                        type="text" 
                        value={quantidade}
                        onChange={(e) => { setQuantidade(e.target.value); clearError('quantidade'); }}
                        onBlur={onBlur}
                        placeholder="Quantidade (ex: 5kg ou 10 peças)"
                        className={getInputClassName('quantidade')}
                    />
                    <ErrorMessage fieldName="quantidade" />
                </div>
                <select 
                    name="entrega"
                    value={entrega}
                    onChange={(e) => setEntrega(e.target.value)}
                    onBlur={onBlur}
                    className={getInputClassName('entrega')}
                >
                    <option value="48h">Entrega em 48h</option>
                    <option value="24h">Entrega em 24h</option>
                    <option value="urgente">Entrega no mesmo dia (Urgente)</option>
                </select>
                <textarea
                    name="observacoes_lavandaria"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Observações (ex: roupa branca, tecido delicado)"
                    rows={3}
                    className={getInputClassName('observacoes_lavandaria')}
                ></textarea>
            </div>
        </div>
    );
}

export default LaundryBookingForm;
