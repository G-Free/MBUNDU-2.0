import React, { useState, useEffect } from 'react';

interface ResidentialBookingFormProps {
    onDetailsChange: (details: any) => void;
    isDarkMode?: boolean;
    errors: Record<string, string>;
    clearError: (fieldName: string) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ResidentialBookingForm: React.FC<ResidentialBookingFormProps> = ({ onDetailsChange, isDarkMode, errors, clearError, onBlur }) => {
    const [tipo, setTipo] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [frequencia, setFrequencia] = useState('unica');
    const [manutencaoTipo, setManutencaoTipo] = useState(''); 
    const [observacoes, setObservacoes] = useState('');

    useEffect(() => {
        const currentDetails: any = { tipo, tamanho, frequencia, observacoes };
        if (tipo === 'manutencao') {
            currentDetails.manutencaoTipo = manutencaoTipo;
        } else {
            if (manutencaoTipo) {
                setManutencaoTipo('');
            }
        }
        onDetailsChange(currentDetails);
    }, [tipo, tamanho, frequencia, manutencaoTipo, observacoes, onDetailsChange]);

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
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Detalhes da Limpeza</label>
            <div className="space-y-4">
                <div>
                    <select 
                        name="tipo"
                        value={tipo}
                        onChange={e => { setTipo(e.target.value); clearError('tipo'); }}
                        onBlur={onBlur}
                        className={getInputClassName('tipo')}
                    >
                        <option value="">Tipo de Limpeza</option>
                        <option value="manutencao">Manutenção</option>
                        <option value="completa">Completa / Profunda</option>
                        <option value="pos-obra">Pós-Obra</option>
                        <option value="pos-evento">Pós-Evento</option>
                    </select>
                    <ErrorMessage fieldName="tipo" />
                </div>
                {tipo === 'manutencao' && (
                    <input 
                        name="manutencaoTipo"
                        type="text"
                        value={manutencaoTipo}
                        onChange={(e) => setManutencaoTipo(e.target.value)}
                        onBlur={onBlur}
                        placeholder="Especifique o tipo de manutenção (ex: vidros, armários)"
                        className={getInputClassName('manutencaoTipo')}
                    />
                )}
                 <div>
                     <select 
                        name="tamanho"
                        value={tamanho}
                        onChange={e => { setTamanho(e.target.value); clearError('tamanho'); }}
                        onBlur={onBlur}
                        className={getInputClassName('tamanho')}
                    >
                        <option value="">Tamanho do Espaço</option>
                        <option value="t1/t2">Apartamento T1/T2</option>
                        <option value="t3+">Apartamento T3+</option>
                        <option value="moradia">Moradia</option>
                        <option value="escritorio">Escritório</option>
                    </select>
                    <ErrorMessage fieldName="tamanho" />
                </div>
                <select 
                    name="frequencia"
                    value={frequencia}
                    onChange={e => setFrequencia(e.target.value)}
                    onBlur={onBlur}
                    className={getInputClassName('frequencia')}
                >
                    <option value="unica">Única</option>
                    <option value="semanal">Semanal</option>
                    <option value="quinzenal">Quinzenal</option>
                    <option value="mensal">Mensal</option>
                </select>
                <textarea
                    name="observacoes_residencial"
                    value={observacoes}
                    onChange={e => setObservacoes(e.target.value)}
                    onBlur={onBlur}
                    placeholder="Observações (ex: áreas de foco, produtos a evitar, animais de estimação em casa)"
                    rows={3}
                    className={getInputClassName('observacoes_residencial')}
                ></textarea>
            </div>
        </div>
    );
};

export default ResidentialBookingForm;
