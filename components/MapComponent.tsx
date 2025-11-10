import React, { useState, useEffect } from 'react';

interface MapComponentProps {
    onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setLocation(newLocation);
                    onLocationSelect(newLocation);
                    setLoading(false);
                },
                (err) => {
                    setError(`Erro ao obter localização: ${err.message}. Por favor, insira o seu endereço manualmente.`);
                    setLoading(false);
                },
                { timeout: 10000 }
            );
        } else {
            setError("Geolocalização não é suportada por este navegador.");
            setLoading(false);
        }
    }, [onLocationSelect]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-48 bg-light-gray rounded-lg">
                <div className="w-6 h-6 border-4 border-t-mbundu-orange border-gray-200 rounded-full animate-spin"></div>
                <p className="text-dark-gray ml-3">A obter a sua localização...</p>
            </div>
        );
    }

    if (error) {
        return <p className="text-red-600 text-sm p-2 bg-red-50 rounded-md">{error}</p>;
    }
    
    const mapPlaceholder = (
        <div className="relative w-full h-48 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center text-white">
            <img src="https://picsum.photos/seed/mapview/600/400" alt="Mapa" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30"></div>
            {/* Map Pin in the center */}
            <div className="absolute transform -translate-y-1/2">
                <svg className="w-10 h-10 text-mbundu-orange drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            </div>
             <p className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-1 rounded">Mapa simulado</p>
        </div>
    );


    return (
        <div>
            {mapPlaceholder}
            {location && (
                <p className="text-xs text-dark-gray mt-1 text-center">
                    Localização detectada. Arraste o mapa para ajustar.
                </p>
            )}
        </div>
    );
};

export default MapComponent;
