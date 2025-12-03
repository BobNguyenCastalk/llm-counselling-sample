import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendIndicatorProps {
  trend: 'up-strong' | 'up' | 'flat' | 'down' | 'down-strong';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export function TrendIndicator({ trend, size = 'medium', showLabel = false }: TrendIndicatorProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const trends = {
    'up-strong': {
      icon: (
        <div className="relative">
          <TrendingUp className={`${sizeClasses[size]} text-[#72D1FF]`} strokeWidth={3} />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#72D1FF] rounded-full animate-pulse shadow-[0_0_8px_rgba(114,209,255,0.8)]" />
        </div>
      ),
      label: '↑↑',
      color: 'text-[#72D1FF]',
      bg: 'bg-[#72D1FF]/10',
      glow: 'shadow-[0_0_12px_rgba(114,209,255,0.6)]'
    },
    'up': {
      icon: <TrendingUp className={`${sizeClasses[size]} text-[#72D1FF]`} strokeWidth={2.5} />,
      label: '↑',
      color: 'text-[#72D1FF]',
      bg: 'bg-[#72D1FF]/10',
      glow: ''
    },
    'flat': {
      icon: <Minus className={`${sizeClasses[size]} text-[#7BB7E8]`} strokeWidth={2.5} />,
      label: '→',
      color: 'text-[#7BB7E8]',
      bg: 'bg-[#7BB7E8]/10',
      glow: ''
    },
    'down': {
      icon: <TrendingDown className={`${sizeClasses[size]} text-[#BFC9D1]`} strokeWidth={2.5} />,
      label: '↓',
      color: 'text-[#BFC9D1]',
      bg: 'bg-[#BFC9D1]/10',
      glow: ''
    },
    'down-strong': {
      icon: (
        <div className="relative">
          <TrendingDown className={`${sizeClasses[size]} text-[#003E7E]`} strokeWidth={3} />
        </div>
      ),
      label: '↓↓',
      color: 'text-[#003E7E]',
      bg: 'bg-[#003E7E]/10',
      glow: ''
    }
  };

  const selected = trends[trend];

  if (showLabel) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${selected.bg} ${selected.glow}`}>
        {selected.icon}
        <span className={`${selected.color} text-sm font-bold`}>{selected.label}</span>
      </div>
    );
  }

  return <div className={selected.glow}>{selected.icon}</div>;
}
