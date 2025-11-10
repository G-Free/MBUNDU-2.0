import React, { useState, useEffect } from 'react';

interface UpholsteryBookingFormProps {
    onDetailsChange: (details: any) => void;
    isDarkMode?: boolean;
    errors: Record<string, string>;
    clearError: (fieldName: string) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const UpholsteryBookingForm: React.FC<UpholsteryBookingFormProps> = ({ onDetailsChange, isDarkMode, errors, clearError, onBlur }) => {
    const [item, setItem] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [observacoes, setObservacoes] = useState('');

    useEffect(() => {
        onDetailsChange({ item, tamanho, quantidade, observacoes });
    }, [item, tamanho, quantidade, observacoes, onDetailsChange]);

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
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Detalhes do Item</label>
            <div className="space-y-4">
                <div>
                    <select 
                        name="item"
                        value={item}
                        onChange={e => { setItem(e.target.value); clearError('item'); }}
                        onBlur={onBlur}
                        className={getInputClassName('item')}
                    >
                        <option value="">Tipo de Item</option>
                        <option value="sofa">Sofá</option>
                        <option value="colchao">Colchão</option>
                        <option value="tapete">Tapete</option>
                        <option value="cortina">Cortina</option>
                        <option value="cadeira">Cadeira</option>
                    </select>
                    <ErrorMessage fieldName="item" />
                </div>
                <div>
                    <select 
                        name="tamanho"
                        value={tamanho}
                        onChange={e => { setTamanho(e.target.value); clearError('tamanho'); }}
                        onBlur={onBlur}
                        className={getInputClassName('tamanho')}
                    >
                        <option value="">Dimensão / Tamanho</option>
                        <option value="pequeno">1 Lugar / Pequeno</option>
                        <option value="medio">2 Lugares / Médio</option>
                        <option value="grande">3+ Lugares / Grande</option>
                    </select>
                    <ErrorMessage fieldName="tamanho" />
                </div>
                <input 
                    name="quantidade_estofos"
                    type="number" 
                    value={quantidade}
                    onChange={e => setQuantidade(parseInt(e.target.value) || 1)}
                    onBlur={onBlur}
                    placeholder="Quantidade"
                    min="1"
                    className={getInputClassName('quantidade_estofos')}
                />
                <textarea
                    name="observacoes_estofos"
                    value={observacoes}
                    onChange={e => setObservacoes(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Observações (ex: tipo de mancha, material do estofo)"
                    rows={3}
                    className={getInputClassName('observacoes_estofos')}
                ></textarea>
            </div>
        </div>
    );
};

export default UpholsteryBookingForm;
