interface FaceIconProps {
  condition: 'excellent' | 'good' | 'normal' | 'low' | 'bad';
  size?: 'small' | 'medium' | 'large';
}

export function FaceIcon({ condition, size = 'medium' }: FaceIconProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const conditions = {
    excellent: {
      bg: 'bg-gradient-to-br from-[#C7EBFF] to-[#72D1FF]',
      shadow: 'shadow-[0_0_20px_rgba(199,235,255,0.6)]',
      face: (
        <g>
          {/* Eyes - Sparkling */}
          <circle cx="35" cy="40" r="4" fill="#003E7E" />
          <circle cx="65" cy="40" r="4" fill="#003E7E" />
          <circle cx="33" cy="38" r="1.5" fill="white" />
          <circle cx="63" cy="38" r="1.5" fill="white" />
          {/* Sparkles */}
          <path d="M 25 30 L 26 32 L 28 31 L 26 33 L 27 35 L 25 33 L 23 34 L 24 32 Z" fill="white" opacity="0.9" />
          <path d="M 72 30 L 73 32 L 75 31 L 73 33 L 74 35 L 72 33 L 70 34 L 71 32 Z" fill="white" opacity="0.9" />
          {/* Smile - Big */}
          <path d="M 30 55 Q 50 70 70 55" stroke="#003E7E" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )
    },
    good: {
      bg: 'bg-gradient-to-br from-[#72D1FF] to-[#4A90E2]',
      shadow: '',
      face: (
        <g>
          {/* Eyes - Happy */}
          <circle cx="35" cy="42" r="3.5" fill="#003E7E" />
          <circle cx="65" cy="42" r="3.5" fill="#003E7E" />
          <circle cx="33" cy="40" r="1" fill="white" />
          <circle cx="63" cy="40" r="1" fill="white" />
          {/* Smile */}
          <path d="M 32 58 Q 50 68 68 58" stroke="#003E7E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )
    },
    normal: {
      bg: 'bg-gradient-to-br from-[#4A90E2] to-[#7BB7E8]',
      shadow: '',
      face: (
        <g>
          {/* Eyes - Neutral */}
          <circle cx="35" cy="42" r="3" fill="#003E7E" />
          <circle cx="65" cy="42" r="3" fill="#003E7E" />
          <circle cx="33.5" cy="41" r="0.8" fill="white" />
          <circle cx="63.5" cy="41" r="0.8" fill="white" />
          {/* Neutral mouth */}
          <line x1="38" y1="60" x2="62" y2="60" stroke="#003E7E" strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    },
    low: {
      bg: 'bg-gradient-to-br from-[#AEE1F9] to-[#BFC9D1]',
      shadow: '',
      face: (
        <g>
          {/* Eyes - Tired */}
          <circle cx="35" cy="45" r="2.5" fill="#003E7E" />
          <circle cx="65" cy="45" r="2.5" fill="#003E7E" />
          {/* Tired mouth */}
          <line x1="38" y1="62" x2="62" y2="62" stroke="#003E7E" strokeWidth="2" strokeLinecap="round" />
          <path d="M 32 50 Q 35 48 38 50" stroke="#BFC9D1" strokeWidth="1.5" fill="none" />
          <path d="M 62 50 Q 65 48 68 50" stroke="#BFC9D1" strokeWidth="1.5" fill="none" />
        </g>
      )
    },
    bad: {
      bg: 'bg-gradient-to-br from-[#BFC9D1] to-[#94A3AE]',
      shadow: '',
      face: (
        <g>
          {/* Eyes - Sad */}
          <circle cx="35" cy="48" r="2" fill="#003E7E" />
          <circle cx="65" cy="48" r="2" fill="#003E7E" />
          {/* Sad eyebrows */}
          <path d="M 30 38 Q 35 35 40 38" stroke="#003E7E" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 60 38 Q 65 35 70 38" stroke="#003E7E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Sad mouth */}
          <path d="M 35 65 Q 50 60 65 65" stroke="#003E7E" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )
    }
  };

  const selected = conditions[condition];

  return (
    <div className={`${sizeClasses[size]} ${selected.bg} ${selected.shadow} rounded-full flex items-center justify-center border-2 border-white`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {selected.face}
      </svg>
    </div>
  );
}
