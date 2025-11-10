import React from 'react';

// A fallback form for categories without a specific booking model
const DefaultBookingForm: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
    const textareaClassName = `w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-mbundu-orange ${
        isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
        : 'bg-white border-medium-gray'
    }`;
    return (
        <div>
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Observações</label>
            <textarea
                placeholder="Adicione aqui qualquer instrução especial para o seu serviço."
                rows={4}
                className={textareaClassName}
            ></textarea>
        </div>
    );
};

export default DefaultBookingForm;