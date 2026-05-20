'use client'

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { COLORS } from '@/lib/constants';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your DIY repair assistant. How can I help you fix something today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Auto-responses for demo purposes
  const botResponses = [
    "That's a great question! Let me help you with that repair.",
    "I'd recommend checking our repair guides section for detailed instructions.",
    "For safety reasons, make sure to turn off the power/water before starting.",
    "Do you have the necessary tools for this repair? I can suggest alternatives if needed.",
    "That sounds like a common issue. Here's what usually works...",
    "Would you like me to walk you through the step-by-step process?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom duration-300"
          style={{ maxHeight: '80vh' }}
        >
          {/* Header */}
          <div 
            className="p-4 rounded-t-2xl flex items-center justify-between"
            style={{ backgroundColor: COLORS.primary }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <Bot className="w-5 h-5" style={{ color: COLORS.primary }} />
              </div>
              <div>
                <h3 className="font-semibold text-white">DIY Assistant</h3>
                <p className="text-xs text-white opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                  {/* Avatar */}
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot ? 'mr-2' : 'ml-2'
                    }`}
                    style={{ 
                      backgroundColor: message.isBot ? `${COLORS.primary}20` : `${COLORS.secondary}20` 
                    }}
                  >
                    {message.isBot ? (
                      <Bot className="w-3 h-3" style={{ color: COLORS.primary }} />
                    ) : (
                      <User className="w-3 h-3" style={{ color: COLORS.secondary }} />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'text-white'
                    }`}
                    style={{
                      backgroundColor: message.isBot ? '#F3F4F6' : COLORS.primary
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2"
                    style={{ backgroundColor: `${COLORS.primary}20` }}
                  >
                    <Bot className="w-3 h-3" style={{ color: COLORS.primary }} />
                  </div>
                  <div className="bg-gray-100 px-3 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your repair question..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                style={{ outlineColor: COLORS.primary }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-2 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: inputMessage.trim() ? COLORS.primary : COLORS.accent,
                  color: inputMessage.trim() ? 'white' : COLORS.text
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
        style={{ backgroundColor: COLORS.primary }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">1</span>
            </div>
            {/* Pulse animation */}
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{ backgroundColor: `${COLORS.primary}40` }}
            ></div>
          </>
        )}
      </button>
    </>
  );
};