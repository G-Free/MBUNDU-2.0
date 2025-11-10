import React, { useState, useEffect } from 'react';

interface MaintenanceBookingFormProps {
    onDetailsChange: (details: any) => void;
    isDarkMode?: boolean;
    errors: Record<string, string>;
    clearError: (fieldName: string) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => void;
}

const MaintenanceBookingForm: React.FC<MaintenanceBookingFormProps> = ({ onDetailsChange, isDarkMode, errors, clearError, onBlur }) => {
    const [tipoServico, setTipoServico] = useState('');
    const [tipoManutencao, setTipoManutencao] = useState('');
    const [emergencia, setEmergencia] = useState(false);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        onDetailsChange({
            tipoServico,
            tipoManutencao,
            emergencia,
            descricao,
        });
    }, [tipoServico, tipoManutencao, emergencia, descricao, onDetailsChange]);

    const getInputClassName = (fieldName: string) => `w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-mbundu-orange ${
        isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
        : 'bg-white border-medium-gray'
    } ${errors[fieldName] ? 'border-danger-red' : ''}`;
    
    const ErrorMessage: React.FC<{ fieldName: string }> = ({ fieldName }) => {
        if (!errors[fieldName]) return null;
        return <p className="text-danger-red text-sm mt-1">⚠️ {errors[fieldName]}</p>;
    };

    const checkboxLabelClassName = `flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
        isDarkMode
        ? 'border-gray-600'
        : 'border-medium-gray'
    } ${
        emergencia
        ? 'bg-red-500/20 border-red-500 text-red-500'
        : (isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-light-gray')
    }`;

    return (
        <div>
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Detalhes da Manutenção</label>
            <div className="space-y-4">
                <div>
                    <select 
                        name="tipoServico"
                        value={tipoServico}
                        onChange={(e) => { setTipoServico(e.target.value); clearError('tipoServico'); }}
                        onBlur={onBlur}
                        className={getInputClassName('tipoServico')}
                    >
                        <option value="">Tipo de Serviço</option>
                        <option value="ac">Ar-Condicionado</option>
                        <option value="electricidade">Eletricidade</option>
                        <option value="canalizacao">Canalização</option>
                        <option value="pintura">Pintura</option>
                        <option value="montagem">Montagem de Móveis</option>
                        <option value="outros">Outros</option>
                    </select>
                    <ErrorMessage fieldName="tipoServico" />
                </div>
                <div>
                    <select 
                        name="tipoManutencao"
                        value={tipoManutencao}
                        onChange={(e) => { setTipoManutencao(e.target.value); clearError('tipoManutencao'); }}
                        onBlur={onBlur}
                        className={getInputClassName('tipoManutencao')}
                    >
                        <option value="">Tipo de Manutenção</option>
                        <option value="preventiva">Preventiva</option>
                        <option value="corretiva">Corretiva</option>
                        <option value="instalacao">Instalação</option>
                    </select>
                    <ErrorMessage fieldName="tipoManutencao" />
                </div>
                <div>
                    <textarea
                        name="descricao"
                        value={descricao}
                        onChange={(e) => { setDescricao(e.target.value); clearError('descricao'); }}
                        onBlur={onBlur}
                        placeholder="Descreva o problema ou o serviço necessário (ex: 'O AC não gela', 'Instalar 3 tomadas novas')"
                        rows={3}
                        className={getInputClassName('descricao')}
                    />
                    <ErrorMessage fieldName="descricao" />
                </div>
                 <label htmlFor="emergencia-checkbox" className={checkboxLabelClassName}>
                    <input 
                        id="emergencia-checkbox"
                        name="emergencia"
                        type="checkbox" 
                        checked={emergencia}
                        onChange={(e) => setEmergencia(e.target.checked)}
                        onBlur={onBlur as (e: React.FocusEvent<HTMLInputElement>) => void}
                        className="h-5 w-5 rounded text-mbundu-orange focus:ring-mbundu-orange border-gray-300 mr-3"
                    />
                    <span>Serviço de Emergência (Taxa Adicional)</span>
                </label>
            </div>
        </div>
    );
}

export default MaintenanceBookingForm;
