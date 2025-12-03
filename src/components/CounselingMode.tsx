import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { ArrowLeft, Send, Mic, Heart } from 'lucide-react';
import { Rnd } from 'react-rnd';

interface CounselingModeProps {
  onBack: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'avatar';
  text: string;
  timestamp: Date;
}

export function CounselingMode({ onBack }: CounselingModeProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      setMessages([
        {
          id: '1',
          sender: 'avatar',
          text: t('counseling.responses.welcome'),
          timestamp: new Date()
        }
      ]);
      initializedRef.current = true;
    }
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAvatarResponse = (): string => {
    const responses = [
      t('counseling.responses.explore'),
      t('counseling.responses.insight'),
      t('counseling.responses.reframe'),
      t('counseling.responses.validate'),
      t('counseling.responses.learn'),
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsAvatarSpeaking(true);

    // Simulate avatar thinking and response
    setTimeout(() => {
      const avatarMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'avatar',
        text: getAvatarResponse(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, avatarMessage]);
      
      // Avatar stops speaking after a delay
      setTimeout(() => setIsAvatarSpeaking(false), 2000);
    }, 1800);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full-screen 3D Avatar Background - Calmer for counseling */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003E7E] via-[#4A90E2] to-[#6EC679]">
        {/* 3D Avatar Simulation - More serene pose for counseling */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative transition-all duration-1000 ${isAvatarSpeaking ? 'scale-105' : 'scale-100'}`}>
            {/* Avatar Head */}
            <div className="relative w-[500px] h-[600px]">
              {/* Soft glow effect when speaking */}
              {isAvatarSpeaking && (
                <div className="absolute inset-0 bg-[#6EC679] blur-3xl opacity-30 animate-pulse" />
              )}
              
              {/* Face */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-80 bg-gradient-to-br from-[#AEE1F9] to-[#6EC679] rounded-[40%_40%_45%_45%] shadow-2xl">
                {/* Calm, reassuring eyes */}
                <div className="absolute top-28 left-16 w-8 h-8 bg-[#003E7E] rounded-full">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full" />
                </div>
                <div className="absolute top-28 right-16 w-8 h-8 bg-[#003E7E] rounded-full">
                  <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full" />
                </div>
                
                {/* Gentle smile */}
                <div className="absolute top-52 left-1/2 -translate-x-1/2 w-12 h-2 bg-[#003E7E]/50 rounded-full" />
                <div className="absolute top-52 left-1/2 -translate-x-1/2 w-16 h-4 border-b-2 border-[#003E7E]/40 rounded-b-full" />
                
                {/* Nose */}
                <div className="absolute top-44 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#72D1FF]/50 rounded-full" />
                
                {/* Eyebrows - relaxed */}
                <div className="absolute top-24 left-12 w-10 h-1 bg-[#003E7E]/40 rounded-full" />
                <div className="absolute top-24 right-12 w-10 h-1 bg-[#003E7E]/40 rounded-full" />
              </div>
              
              {/* Shoulders/Body */}
              <div className="absolute top-96 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-br from-[#4A90E2] to-[#003E7E] rounded-t-full shadow-2xl" />
              
              {/* Soft lighting effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-[#6EC679]/10 pointer-events-none rounded-full" />
            </div>
          </div>
        </div>

        {/* Calming particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-[#6EC679] rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header - Floating */}
      <div className="relative z-20">
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-white">{t('counseling.title')}</h1>
                <p className="text-sm text-[#C7EBFF]">
                  {t('counseling.subtitle')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6EC679] text-sm">
                {isListening ? `🎤 ${t('counseling.listening')}` : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable & Resizable Transcription Panel - Bottom Center Default */}
      <Rnd
        default={{
          x: typeof window !== 'undefined' ? (window.innerWidth - 600) / 2 : 0,
          y: typeof window !== 'undefined' ? window.innerHeight - 480 : 0,
          width: 600,
          height: 400
        }}
        minWidth={300}
        minHeight={300}
        maxWidth={1000}
        maxHeight={800}
        bounds="window"
        dragHandleClassName="drag-handle"
        className="z-30"
      >
        <div className="h-full bg-white/20 backdrop-blur-xl rounded-[24px] border-2 border-white/30 shadow-2xl flex flex-col overflow-hidden">
          {/* Panel Header - Drag Handle */}
          <div className="drag-handle cursor-move px-6 py-4 bg-gradient-to-r from-[#6EC679]/20 to-[#4A90E2]/20 border-b border-white/20 flex items-center justify-between">
            <h3 className="text-white">{t('counseling.record')}</h3>
            <span className="text-xs text-[#C7EBFF]">{t('counseling.dragResize')}</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#4A90E2] text-white shadow-lg'
                      : 'bg-white/90 text-[#003E7E] shadow-lg'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-[#C7EBFF]' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('ja-JP', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isAvatarSpeaking && (
              <div className="flex justify-start">
                <div className="bg-white/90 rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#6EC679] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#6EC679] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#6EC679] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-6 py-4 bg-gradient-to-r from-[#6EC679]/10 to-[#4A90E2]/10 border-t border-white/20">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t('counseling.inputPlaceholder')}
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-[#C7EBFF] focus:outline-none focus:ring-2 focus:ring-[#6EC679] backdrop-blur-sm"
              />
              <Button 
                onClick={handleVoiceInput}
                className={`rounded-xl ${
                  isListening 
                    ? 'bg-[#6EC679] hover:bg-[#5AB568]' 
                    : 'bg-white/20 hover:bg-white/30'
                } text-white border-2 border-white/30`}
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Button 
                onClick={handleSend} 
                disabled={!inputText.trim()}
                className="rounded-xl bg-[#4A90E2] hover:bg-[#003E7E] text-white border-2 border-white/30"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Privacy notice */}
            <div className="mt-3 p-2 bg-white/10 rounded-lg">
              <p className="text-xs text-[#C7EBFF] text-center">
                🔒 {t('counseling.privacyNotice')}
              </p>
            </div>
          </div>
        </div>
      </Rnd>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-120px) translateX(30px);
            opacity: 0.4;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}