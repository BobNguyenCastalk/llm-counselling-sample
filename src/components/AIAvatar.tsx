import { useState, useEffect } from 'react';

interface AIAvatarProps {
  mood?: 'happy' | 'neutral' | 'calm' | 'thinking';
  size?: 'small' | 'medium' | 'large';
  isAnimating?: boolean;
}

export function AIAvatar({ mood = 'neutral', size = 'medium', isAnimating = false }: AIAvatarProps) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  const getMoodColors = () => {
    switch (mood) {
      case 'happy':
        return { bg: 'from-yellow-200 to-orange-200', accent: 'bg-orange-400' };
      case 'calm':
        return { bg: 'from-green-200 to-teal-200', accent: 'bg-teal-400' };
      case 'thinking':
        return { bg: 'from-purple-200 to-indigo-200', accent: 'bg-indigo-400' };
      default:
        return { bg: 'from-blue-200 to-indigo-200', accent: 'bg-indigo-400' };
    }
  };

  const colors = getMoodColors();

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center ${isAnimating ? 'animate-pulse' : ''}`}>
        {/* Face */}
        <svg viewBox="0 0 100 100" className="w-3/4 h-3/4">
          {/* Eyes */}
          <ellipse
            cx="35"
            cy="40"
            rx="5"
            ry={blink ? "1" : "7"}
            fill="#334155"
            className="transition-all duration-150"
          />
          <ellipse
            cx="65"
            cy="40"
            rx="5"
            ry={blink ? "1" : "7"}
            fill="#334155"
            className="transition-all duration-150"
          />
          
          {/* Mouth */}
          {mood === 'happy' && (
            <path
              d="M 35 60 Q 50 70 65 60"
              stroke="#334155"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {mood === 'neutral' && (
            <line
              x1="35"
              y1="65"
              x2="65"
              y2="65"
              stroke="#334155"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
          {mood === 'calm' && (
            <path
              d="M 35 62 Q 50 67 65 62"
              stroke="#334155"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {mood === 'thinking' && (
            <ellipse
              cx="50"
              cy="65"
              rx="8"
              ry="5"
              fill="none"
              stroke="#334155"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
      
      {/* Glow effect when animating */}
      {isAnimating && (
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.bg} opacity-50 blur-xl`} />
      )}
    </div>
  );
}
