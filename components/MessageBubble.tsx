import React from 'react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <div className="text-center my-3">
        <span className="text-xs font-semibold text-info-blue bg-info-blue/10 px-3 py-1.5 rounded-lg">{message.text}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-2 my-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
          isUser 
          ? 'bg-petroleum-blue text-white rounded-br-lg' 
          : 'bg-white text-petroleum-blue shadow-sm rounded-bl-lg'
      }`}>
        <p className="text-sm break-words">{message.text}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-gray-300' : 'text-gray-400'} text-right flex items-center justify-end`}>
          {message.timestamp}
          {isUser && <span className={`ml-1.5 font-bold ${message.isRead ? 'text-info-blue' : 'text-gray-400'}`}>&#10003;&#10003;</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;