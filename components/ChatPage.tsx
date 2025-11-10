import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import MessageBubble from './MessageBubble';
import { PaperclipIcon, MicrophoneIcon, SendIcon, StopIcon } from '../constants';

interface ChatPageProps {
  partner: {
    name: string;
    imageUrl: string;
  };
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
  isTyping: boolean;
}

const ChatPage: React.FC<ChatPageProps> = ({ partner, messages, onSendMessage, onBack, isTyping }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef<number | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Cleanup timer on component unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Tamanho máximo de ficheiro: 5MB.');
        return;
      }
      alert(`Imagem "${file.name}" selecionada. A funcionalidade de envio está em desenvolvimento.`);
    }
    if (e.target) e.target.value = '';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleMicClick = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      alert(`Gravação de ${formatTime(recordingTime)} enviada (simulação).`);
      setRecordingTime(0);
    } else {
      // Start recording
      setIsRecording(true);
      setInputValue(''); // Clear text input
      setRecordingTime(0);
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(t => t + 1);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm p-3 flex items-center h-16 flex-shrink-0">
        <button onClick={onBack} className="mr-3 text-petroleum-blue">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img src={partner.imageUrl} alt={partner.name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h1 className="text-md font-semibold text-petroleum-blue font-poppins">{partner.name}</h1>
          {isTyping ? (
            <p className="text-xs text-green-500 animate-pulse">a digitar...</p>
          ) : (
            <p className="text-xs text-green-500">Online</p>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 bg-light-gray">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 bg-white border-t border-medium-gray flex-shrink-0">
        <div className="flex items-center gap-2">
            {isRecording ? (
                <>
                    <div className="flex-1 flex items-center bg-light-gray h-11 rounded-full px-4">
                        <div className="w-3 h-3 bg-danger-red rounded-full animate-pulse"></div>
                        <p className="ml-3 text-dark-gray font-mono">{formatTime(recordingTime)}</p>
                    </div>
                    <button onClick={handleMicClick} className="p-3 bg-danger-red text-white rounded-full hover:bg-red-600 transition-colors">
                        <StopIcon className="w-5 h-5" />
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/png, image/jpeg, image/gif"
                    />
                    <button type="button" onClick={handleAttachClick} className="p-2 text-dark-gray hover:text-petroleum-blue">
                        <PaperclipIcon className="w-6 h-6" />
                    </button>
                    <form onSubmit={handleSend} className="flex-1 flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escreve a tua mensagem..."
                            className="flex-1 w-full pl-4 pr-4 py-2 rounded-full border border-medium-gray focus:outline-none focus:ring-2 focus:ring-mbundu-orange"
                        />
                    </form>
                    {inputValue.trim() ? (
                        <button onClick={handleSend} className="p-3 bg-mbundu-orange text-white rounded-full hover:bg-orange-600 transition-colors">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    ) : (
                        <button type="button" onClick={handleMicClick} className="p-2 text-dark-gray hover:text-petroleum-blue">
                            <MicrophoneIcon className="w-6 h-6" />
                        </button>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;