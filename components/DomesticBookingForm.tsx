import React, { useState, useEffect } from 'react';

interface DomesticBookingFormProps {
    onDetailsChange: (details: any) => void;
    isDarkMode?: boolean;
    errors: Record<string, string>;
    clearError: (fieldName: string) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const DomesticBookingForm: React.FC<DomesticBookingFormProps> = ({ onDetailsChange, isDarkMode, errors, clearError, onBlur }) => {
    const [profissional, setProfissional] = useState('');
    const [contrato, setContrato] = useState('diaria');
    const [descontoCode, setDescontoCode] = useState('');
    const [descricao, setDescricao] = useState('');
    const [observacoes, setObservacoes] = useState('');

    useEffect(() => {
        onDetailsChange({ profissional, contrato, descontoCode, descricao, observacoes });
    }, [profissional, contrato, descontoCode, descricao, observacoes, onDetailsChange]);
    
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
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Detalhes da Contratação</label>
            <div className="space-y-4">
                <div>
                    <select 
                        name="profissional"
                        value={profissional}
                        onChange={e => { setProfissional(e.target.value); clearError('profissional'); }}
                        onBlur={onBlur}
                        className={getInputClassName('profissional')}
                    >
                        <option value="">Tipo de Profissional</option>
                        <option value="baba">Babá</option>
                        <option value="jardineiro">Jardineiro</option>
                        <option value="cozinheira">Cozinheira</option>
                        <option value="motorista">Motorista</option>
                    </select>
                    <ErrorMessage fieldName="profissional" />
                </div>
                 <div>
                     <select 
                        name="contrato"
                        value={contrato}
                        onChange={e => { setContrato(e.target.value); clearError('contrato'); }}
                        onBlur={onBlur}
                        className={getInputClassName('contrato')}
                    >
                        <option value="diaria">Diária</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                    </select>
                    <ErrorMessage fieldName="contrato" />
                </div>
                <textarea
                    name="descricao_domestico"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Descrição da função e requisitos..."
                    rows={3}
                    className={getInputClassName('descricao_domestico')}
                ></textarea>
                 <textarea
                    name="observacoes_domestico"
                    value={observacoes}
                    onChange={e => setObservacoes(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Observações (ex: horários preferenciais, alguma condição específica)"
                    rows={3}
                    className={getInputClassName('observacoes_domestico')}
                ></textarea>
                <input
                    name="descontoCode"
                    type="text"
                    value={descontoCode}
                    onChange={e => setDescontoCode(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Código de Desconto (ex: PRIME10)"
                    className={getInputClassName('descontoCode')}
                />
            </div>
        </div>
    );
};

export default DomesticBookingForm;
