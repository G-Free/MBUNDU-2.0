import React, { useState, useEffect, useCallback } from 'react';
import { ServiceProvider, User } from '../types';

// Import the new form components
import LaundryBookingForm from '../components/LaundryBookingForm';
import AutoBookingForm from '../components/AutoBookingForm';
import UpholsteryBookingForm from '../components/UpholsteryBookingForm';
import ResidentialBookingForm from '../components/ResidentialBookingForm';
import DomesticBookingForm from '../components/DomesticBookingForm';
import MaintenanceBookingForm from '../components/MaintenanceBookingForm';
import DefaultBookingForm from '../components/DefaultBookingForm';
import MapComponent from '../components/MapComponent';

interface BookingPageProps {
  provider: ServiceProvider;
  user: User | null;
  onBookingComplete: () => void;
}

const serviceFeeRates: Record<string, number> = { 
    laundry: 0.15, 
    auto: 0.20, 
    upholstery: 0.20, 
    residential: 0.25, 
    domestic: 0.15,
    maintenance: 0.22
};

const PaymentButton: React.FC<{
    method: string;
    label: string;
    currentPaymentMethod: string;
    isDarkMode: boolean;
    onClick: (method: string) => void;
}> = ({ method, label, currentPaymentMethod, isDarkMode, onClick }) => (
    <button
        onClick={() => onClick(method)}
        className={`w-full p-3 text-left rounded-lg border-2 flex items-center transition-colors ${
            currentPaymentMethod === method 
            ? 'border-mbundu-orange ' + (isDarkMode ? 'bg-mbundu-orange/20 text-mbundu-orange' : 'bg-orange-50')
            : (isDarkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-light-gray' : 'border-medium-gray hover:bg-light-gray')
        }`}
    >
        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${currentPaymentMethod === method ? 'border-mbundu-orange' : (isDarkMode ? 'border-gray-500' : 'border-medium-gray')}`}>
           {currentPaymentMethod === method && <div className="w-2.5 h-2.5 bg-mbundu-orange rounded-full"></div>}
        </div>
        {label}
    </button>
);

const BookingPage: React.FC<BookingPageProps> = ({ provider, user, onBookingComplete }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('motoboy');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [generalObservations, setGeneralObservations] = useState('');

  // State for service-specific details
  const [serviceDetails, setServiceDetails] = useState<any>({});
  
  const [precoBaseCalculado, setPrecoBaseCalculado] = useState(provider.basePrice);
  const [taxaServico, setTaxaServico] = useState(0);
  const [taxaDeslocacao, setTaxaDeslocacao] = useState(0);
  const [acrescimoUrgencia, setAcrescimoUrgencia] = useState(0);
  const [descontoPrime, setDescontoPrime] = useState(0);
  const [descontoPromocional, setDescontoPromocional] = useState(0);
  const [total, setTotal] = useState(0);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isInterviewBooking = provider.category === 'domestic' && serviceDetails.contrato === 'mensal';

  const clearError = useCallback((fieldName: string) => {
    setErrors(prevErrors => {
        if (!prevErrors[fieldName]) {
            return prevErrors;
        }
        const newErrors = { ...prevErrors };
        delete newErrors[fieldName];
        return newErrors;
    });
  }, []);

  useEffect(() => {
    let pb = provider.basePrice;
    switch (provider.category) {
        case 'laundry':
            if (serviceDetails.quantidade > 5) pb += 2000;
            break;
        case 'auto':
            const vehicleMultiplier = { 'suv': 1.2, 'carrinha': 1.3, 'ligeiro': 1, 'motorizada': 0.8 };
            const serviceMultiplier = { 'completa': 1, 'polimento': 1.5, 'interna': 0.7 };
            pb *= (vehicleMultiplier[serviceDetails.veiculo] || 1);
            pb *= (serviceMultiplier[serviceDetails.servico] || 1);
            break;
        case 'upholstery':
            const sizeMultiplier = { 'pequeno': 1, 'medio': 1.5, 'grande': 2 };
            pb *= (sizeMultiplier[serviceDetails.tamanho] || 1);
            pb *= (serviceDetails.quantidade || 1);
            break;
        case 'residential':
            const cleaningMultiplier = { 'completa': 1.5, 'pos-obra': 2, 'manutencao': 1 };
            const spaceMultiplier = { 't3+': 1.4, 'moradia': 1.8, 't1/t2': 1 };
            pb *= (cleaningMultiplier[serviceDetails.tipo] || 1);
            pb *= (spaceMultiplier[serviceDetails.tamanho] || 1);
            break;
        case 'domestic':
            const contractMultiplier = { 'mensal': 30, 'semanal': 7, 'diaria': 1 };
            pb *= (contractMultiplier[serviceDetails.contrato] || 1);
            break;
        case 'maintenance':
            const serviceTypeMultiplier = { 'ac': 1.2, 'electricidade': 1.1, 'canalizacao': 1.3, 'pintura': 1.5, 'montagem': 1 };
            pb *= (serviceTypeMultiplier[serviceDetails.tipoServico] || 1);
            break;
    }
    pb = Math.max(0, pb);
    
    const feeRate = serviceFeeRates[provider.category] || 0.20;
    const ts = pb * feeRate;
    
    let td = 0;
    if (['laundry', 'auto', 'maintenance', 'upholstery', 'residential'].includes(provider.category)) {
        const distance = parseFloat(provider.distance.replace(/[^0-9.]/g, ''));
        if (!isNaN(distance)) {
            if (distance <= 5) td = 500;
            else if (distance <= 10) td = 800;
            else if (distance <= 20) td = 1500;
            else td = 2500;
        }
    }

    let subTotal = pb + ts + td;

    let fu_factor = 0;
    if (provider.category === 'laundry') {
        if (serviceDetails.entrega === '24h') fu_factor = 0.10;
        else if (serviceDetails.entrega === 'urgente') fu_factor = 0.20;
    }
    if (provider.category === 'maintenance' && serviceDetails.emergencia) {
        fu_factor = 0.25;
    }
    
    const dp_factor = user?.isMbunduPrime ? 0.10 : 0;

    let dv_factor = 0;
    if (provider.category === 'residential' && ['semanal', 'mensal'].includes(serviceDetails.frequencia)) {
        dv_factor = 0.05;
    }
    if (provider.category === 'domestic' && serviceDetails.descontoCode?.toUpperCase() === 'PRIME10') {
         dv_factor = 0.10;
    }

    const totalComUrgencia = subTotal * (1 + fu_factor);
    const totalDescontosFactor = 1 - dp_factor - dv_factor;
    const precoFinal = totalComUrgencia * totalDescontosFactor;
    
    const acrescimo = totalComUrgencia - subTotal;

    setPrecoBaseCalculado(pb);
    setTaxaServico(ts);
    setTaxaDeslocacao(td);
    setAcrescimoUrgencia(acrescimo);
    setDescontoPrime(totalComUrgencia * dp_factor);
    setDescontoPromocional(totalComUrgencia * dv_factor);
    setTotal(Math.max(0, precoFinal));

  }, [serviceDetails, provider, deliveryMethod, user]);

  const validateField = (fieldName: string, value: any, details: any): string => {
    switch (fieldName) {
        case 'date':
            return !value ? 'Seleciona a data do serviço.' : '';
        case 'time':
            return !value ? 'Seleciona a hora do serviço.' : '';
        case 'paymentMethod':
            return !value && !isInterviewBooking ? 'Escolhe um método de pagamento.' : '';
        case 'address':
            return !['domestic'].includes(provider.category) && !String(value).trim() ? 'Selecione uma localização válida.' : '';
        case 'tipoRoupa':
            return !value ? 'Escolhe o tipo de roupa.' : '';
        case 'quantidade':
            return !value || parseFloat(value) <= 0 ? 'Informe a quantidade de itens.' : '';
        case 'veiculo':
            return !value ? 'Escolhe o tipo de veículo para continuar.' : '';
        case 'servico':
            return !value ? 'Escolhe uma opção antes de continuar.' : '';
        case 'item':
            return !value ? 'Escolhe uma opção antes de continuar.' : '';
        case 'tamanho':
             if (provider.category === 'upholstery' && !value) return 'Escolhe uma opção antes de continuar.';
             if (provider.category === 'residential' && !value) return 'Seleciona o tamanho do espaço (T1, T2, T3...)';
             return '';
        case 'tipo':
            return !value ? 'Escolhe uma opção antes de continuar.' : '';
        case 'profissional':
            return !value ? 'Seleciona o tipo de trabalhador.' : '';
        case 'contrato':
            return !value ? 'Escolhe o tipo de contrato (diária, semanal, mensal).' : '';
        case 'tipoServico':
            return !value ? 'Escolhe uma opção antes de continuar.' : '';
        case 'tipoManutencao':
            return !value ? 'Escolhe o tipo de manutenção (preventiva, corretiva, etc.).' : '';
        case 'descricao':
            return details.tipoManutencao === 'corretiva' && !String(value).trim() ? 'Descreve o problema antes de continuar.' : '';
        default:
            return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value, serviceDetails);
    setErrors(prev => {
        const newErrors = { ...prev };
        if (error) {
            newErrors[name] = error;
        } else {
            delete newErrors[name];
        }
        return newErrors;
    });
  };

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    const dateError = validateField('date', date, serviceDetails);
    if(dateError) newErrors.date = dateError;

    const timeError = validateField('time', time, serviceDetails);
    if(timeError) newErrors.time = timeError;

    const paymentMethodError = validateField('paymentMethod', paymentMethod, serviceDetails);
    if(paymentMethodError) newErrors.paymentMethod = paymentMethodError;

    const addressError = validateField('address', address, serviceDetails);
    if(addressError) newErrors.address = addressError;


    switch (provider.category) {
        case 'laundry':
            const tipoRoupaError = validateField('tipoRoupa', serviceDetails.tipoRoupa, serviceDetails);
            if(tipoRoupaError) newErrors.tipoRoupa = tipoRoupaError;
            const quantidadeError = validateField('quantidade', serviceDetails.quantidade, serviceDetails);
            if(quantidadeError) newErrors.quantidade = quantidadeError;
            break;
        case 'auto':
            const veiculoError = validateField('veiculo', serviceDetails.veiculo, serviceDetails);
            if(veiculoError) newErrors.veiculo = veiculoError;
            const servicoError = validateField('servico', serviceDetails.servico, serviceDetails);
            if(servicoError) newErrors.servico = servicoError;
            break;
        case 'upholstery':
            const itemError = validateField('item', serviceDetails.item, serviceDetails);
            if(itemError) newErrors.item = itemError;
            const tamanhoError = validateField('tamanho', serviceDetails.tamanho, serviceDetails);
            if(tamanhoError) newErrors.tamanho = tamanhoError;
            break;
        case 'residential':
            const tipoError = validateField('tipo', serviceDetails.tipo, serviceDetails);
            if(tipoError) newErrors.tipo = tipoError;
            const tamanhoResError = validateField('tamanho', serviceDetails.tamanho, serviceDetails);
            if(tamanhoResError) newErrors.tamanho = tamanhoResError;
            break;
        case 'domestic':
            const profissionalError = validateField('profissional', serviceDetails.profissional, serviceDetails);
            if(profissionalError) newErrors.profissional = profissionalError;
            const contratoError = validateField('contrato', serviceDetails.contrato, serviceDetails);
            if(contratoError) newErrors.contrato = contratoError;
            break;
        case 'maintenance':
             const tipoServicoError = validateField('tipoServico', serviceDetails.tipoServico, serviceDetails);
             if(tipoServicoError) newErrors.tipoServico = tipoServicoError;
             const tipoManutencaoError = validateField('tipoManutencao', serviceDetails.tipoManutencao, serviceDetails);
             if(tipoManutencaoError) newErrors.tipoManutencao = tipoManutencaoError;
             const descricaoError = validateField('descricao', serviceDetails.descricao, serviceDetails);
             if(descricaoError) newErrors.descricao = descricaoError;
            break;
    }

    return newErrors;
  }

  const handleBookingAttempt = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        setShowConfirmation(true);
    } else {
        // Optional: focus the first invalid field
        const firstErrorKey = Object.keys(validationErrors)[0];
        const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const executeBooking = () => {
    const orderId = `MBU-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const message = isInterviewBooking
        ? `Agendamento de entrevista confirmado! A nossa equipa entrará em contacto para os próximos passos.`
        : `Agendamento confirmado! A sua referência de pagamento é: ${orderId}. Prossiga com o pagamento.`;
    alert(message);
    setShowConfirmation(false);
    onBookingComplete();
  };


  const handleDetailsChange = useCallback((details: any) => {
    setServiceDetails(prev => ({ ...prev, ...details }));
  }, []);

  const handleLocationSelect = useCallback((location: { lat: number; lng: number }) => {
    setAddress(`Localização Automática: Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`);
    clearError('address');
  }, [clearError]);

  const renderCategorySpecificForm = () => {
      const props = { onDetailsChange: handleDetailsChange, isDarkMode, errors, clearError, onBlur: handleBlur };
      switch(provider.category) {
          case 'laundry':
              return <LaundryBookingForm {...props} />;
          case 'auto':
              return <AutoBookingForm {...props} />;
          case 'upholstery':
              return <UpholsteryBookingForm {...props} />;
          case 'residential':
              return <ResidentialBookingForm {...props} />;
          case 'domestic':
              return <DomesticBookingForm {...props} />;
          case 'maintenance':
              return <MaintenanceBookingForm {...props} />;
          default:
              return <DefaultBookingForm isDarkMode={isDarkMode} />;
      }
  }
  
  const getInputClassName = (fieldName: string) => `w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-mbundu-orange ${isDarkMode ? 'bg-gray-700 placeholder-gray-400 text-white' : 'bg-white border-medium-gray'} ${errors[fieldName] ? 'border-danger-red' : (isDarkMode ? 'border-gray-600' : 'border-medium-gray')}`;

  const ErrorMessage: React.FC<{ fieldName: string }> = ({ fieldName }) => {
    if (!errors[fieldName]) return null;
    return <p className="text-danger-red text-sm mt-1">⚠️ {errors[fieldName]}</p>;
  };
  
  const ConfirmationDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300" aria-modal="true" role="dialog">
        <div className={`rounded-2xl p-6 w-11/12 max-w-md shadow-2xl transform transition-all duration-300 scale-100 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <h3 className={`text-2xl font-bold font-poppins mb-4 ${isDarkMode ? 'text-white' : 'text-petroleum-blue'}`}>{isInterviewBooking ? 'Confirmar Entrevista' : 'Confirmar Agendamento'}</h3>
            <div className={`space-y-3 text-sm border-t border-b py-4 my-4 ${isDarkMode ? 'border-gray-600' : 'border-medium-gray'}`}>
                <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}>Prestador:</span>
                    <span className="font-semibold">{provider.name}</span>
                </div>
                <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}>Data:</span>
                    <span className="font-semibold">{date ? new Date(date + 'T00:00:00').toLocaleDateString('pt-AO', { day: '2-digit', month: 'long', year: 'numeric'}) : ''}</span>
                </div>
                <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}>Hora:</span>
                    <span className="font-semibold">{time}</span>
                </div>
                {!isInterviewBooking && (
                    <div className={`flex justify-between text-lg font-bold mt-2 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <span className={isDarkMode ? 'text-white' : 'text-petroleum-blue'}>Total:</span>
                        <span className="text-mbundu-orange">{total.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                    </div>
                )}
            </div>
            <p className={`text-xs text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-dark-gray'}`}>
                Tem a certeza que pretende confirmar este {isInterviewBooking ? 'agendamento de entrevista' : 'agendamento'}?
            </p>
            <div className="flex justify-between gap-4">
                <button 
                    onClick={() => setShowConfirmation(false)}
                    className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-medium-gray hover:bg-gray-300 text-dark-gray'}`}
                >
                    Cancelar
                </button>
                <button 
                    onClick={executeBooking}
                    className="w-full bg-mbundu-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    Confirmar
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className={`p-4 font-roboto relative ${isDarkMode ? 'bg-petroleum-blue' : ''}`}>
        {showConfirmation && <ConfirmationDialog />}
        <div className="flex justify-between items-center mb-2">
            <h2 className={`text-2xl font-bold font-poppins ${isDarkMode ? 'text-white' : 'text-petroleum-blue'}`}>Agendar Serviço</h2>
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-medium-gray text-petroleum-blue'}`}
                aria-label="Alternar tema"
            >
                {isDarkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </button>
        </div>
      <p className={`mb-6 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Com <span className="font-semibold">{provider.name}</span></p>

      <div className="space-y-6">
        
        <div>
            {renderCategorySpecificForm()}
        </div>

        <div>
            <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Observações Gerais (Opcional)</label>
            <textarea
                name="generalObservations"
                value={generalObservations}
                onChange={(e) => setGeneralObservations(e.target.value)}
                onBlur={handleBlur}
                placeholder="Instruções especiais, pontos de referência ou qualquer outra informação relevante."
                rows={3}
                className={getInputClassName('generalObservations')}
            />
        </div>

        <div>
          <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Selecione a data e hora</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input 
                type="date" 
                name="date"
                value={date}
                onChange={(e) => { setDate(e.target.value); clearError('date'); }}
                onBlur={handleBlur}
                className={getInputClassName('date')}
                style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
              />
              <ErrorMessage fieldName="date" />
            </div>
            <div>
              <input 
                type="time"
                name="time"
                value={time}
                onChange={(e) => { setTime(e.target.value); clearError('time'); }}
                onBlur={handleBlur}
                className={getInputClassName('time')}
                style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
              />
              <ErrorMessage fieldName="time" />
            </div>
          </div>
        </div>
        
        {['laundry', 'auto'].includes(provider.category) ? (
            <div>
                <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Método de Atendimento</label>
                <div className="flex space-x-4">
                    <button 
                        onClick={() => setDeliveryMethod('motoboy')}
                        className={`flex-1 p-3 rounded-lg border-2 transition-colors ${deliveryMethod === 'motoboy' ? 'border-mbundu-orange ' + (isDarkMode ? 'bg-mbundu-orange/20' : 'bg-orange-50') : (isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-medium-gray hover:bg-light-gray')}`}
                    >
                        {provider.category === 'laundry' ? 'Recolha/Entrega' : 'Serviço Móvel'}
                    </button>
                    <button 
                        onClick={() => setDeliveryMethod('presencial')}
                        className={`flex-1 p-3 rounded-lg border-2 transition-colors ${deliveryMethod === 'presencial' ? 'border-mbundu-orange ' + (isDarkMode ? 'bg-mbundu-orange/20' : 'bg-orange-50') : (isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-medium-gray hover:bg-light-gray')}`}
                    >
                        No Estabelecimento
                    </button>
                </div>
            </div>
        ) : null}

        {!['domestic'].includes(provider.category) && (
             <div className={`mt-4 space-y-4 p-4 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-medium-gray'} ${errors.address ? 'border-danger-red' : ''}`}>
                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-petroleum-blue'}`}>Endereço de Atendimento</h4>
                <MapComponent onLocationSelect={handleLocationSelect} />
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); clearError('address'); }}
                    onBlur={handleBlur}
                    placeholder="Insira o seu endereço ou confirme a localização no mapa"
                    className={getInputClassName('address')}
                />
                <ErrorMessage fieldName="address" />
            </div>
        )}

        {!isInterviewBooking && (
            <div>
                <label className={`block font-bold mb-2 ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>Método de Pagamento</label>
                <div className="space-y-3">
                    <PaymentButton method="multicaixa" label="Multicaixa Express" currentPaymentMethod={paymentMethod} isDarkMode={isDarkMode} onClick={(method) => { setPaymentMethod(method); clearError('paymentMethod'); }} />
                    <PaymentButton method="ekwanza" label="e-Kwanza" currentPaymentMethod={paymentMethod} isDarkMode={isDarkMode} onClick={(method) => { setPaymentMethod(method); clearError('paymentMethod'); }} />
                    <PaymentButton method="referencia" label="Pagamento por Referência" currentPaymentMethod={paymentMethod} isDarkMode={isDarkMode} onClick={(method) => { setPaymentMethod(method); clearError('paymentMethod'); }} />
                </div>
                <ErrorMessage fieldName="paymentMethod" />
            </div>
        )}
        
        {!isInterviewBooking && (
            <div className={`border-t pt-4 space-y-2 ${isDarkMode ? 'border-gray-600' : 'border-medium-gray'}`}>
                <h3 className={`font-bold text-lg mb-2 font-poppins ${isDarkMode ? 'text-white' : 'text-petroleum-blue'}`}>Resumo do Pedido</h3>
                
                <div className={`flex justify-between ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>
                    <span>Preço Base</span>
                    <span>{precoBaseCalculado.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                </div>

                <div className={`flex justify-between ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>
                    <span>Taxa de Serviço ({(serviceFeeRates[provider.category] * 100).toFixed(0)}%)</span>
                    <span>+ {taxaServico.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                </div>

                {taxaDeslocacao > 0 && (
                    <div className={`flex justify-between ${isDarkMode ? 'text-medium-gray' : 'text-dark-gray'}`}>
                        <span>Taxa de Deslocação</span>
                        <span>+ {taxaDeslocacao.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                    </div>
                )}

                {acrescimoUrgencia > 0 && (
                    <div className={`flex justify-between text-danger-red`}>
                        <span>Acréscimo de Urgência/Emergência</span>
                        <span>+ {acrescimoUrgencia.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                    </div>
                )}
                
                {(descontoPrime > 0 || descontoPromocional > 0) && (
                    <div className="border-t border-dashed my-2 -mx-4"></div>
                )}

                {descontoPrime > 0 && (
                    <div className="flex justify-between text-success-green">
                        <span>Desconto Mbundu Prime</span>
                        <span>- {descontoPrime.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                    </div>
                )}
                
                {descontoPromocional > 0 && (
                    <div className="flex justify-between text-success-green">
                        <span>Desconto Promocional</span>
                        <span>- {descontoPromocional.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                    </div>
                )}

                <div className={`flex justify-between font-bold text-xl mt-4 pt-2 border-t ${isDarkMode ? 'text-white border-gray-600' : 'text-petroleum-blue border-medium-gray'}`}>
                    <span>Total a Pagar</span>
                    <span>{total.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</span>
                </div>
            </div>
        )}
      </div>
      
      <div className="mt-8">
        <button onClick={handleBookingAttempt} className="w-full bg-mbundu-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 text-lg">
            {isInterviewBooking ? 'Agendar Entrevista' : 'Confirmar Agendamento'}
        </button>
      </div>

    </div>
  );
};

export default BookingPage;