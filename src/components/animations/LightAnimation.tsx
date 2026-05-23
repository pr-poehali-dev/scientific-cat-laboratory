import React from 'react';

const LightAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-32 relative">
      <svg viewBox="0 0 160 120" className="w-36 h-28" fill="none">
        <defs>
          <linearGradient id="beam1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="spectrumGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="17%" stopColor="#ff7700" />
            <stop offset="33%" stopColor="#ffff00" />
            <stop offset="50%" stopColor="#00ff00" />
            <stop offset="67%" stopColor="#0088ff" />
            <stop offset="83%" stopColor="#4400ff" />
            <stop offset="100%" stopColor="#8800ff" />
          </linearGradient>
        </defs>

        {/* Light source */}
        <circle cx="18" cy="60" r="10" fill="white" opacity="0.95">
          <animate attributeName="opacity" values="0.95;0.7;0.95" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="18" cy="60" r="16" fill="white" opacity="0.15">
          <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.15;0.05;0.15" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Incoming beam */}
        <polygon points="28,57 78,52 78,68 28,63" fill="url(#beam1)" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.6;0.8" dur="2s" repeatCount="indefinite" />
        </polygon>

        {/* Prism */}
        <polygon points="78,35 100,85 56,85" fill="rgba(191,95,255,0.25)" stroke="rgba(191,95,255,0.8)" strokeWidth="2" />
        <polygon points="78,35 100,85 56,85" fill="rgba(255,255,255,0.05)" />
        {/* Prism shine */}
        <line x1="78" y1="37" x2="68" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* Spectrum rays */}
        {[
          { y1: 70, y2: 20, color: '#ff4444', delay: '0s' },
          { y1: 72, y2: 35, color: '#ff8800', delay: '0.05s' },
          { y1: 74, y2: 50, color: '#ffee00', delay: '0.1s' },
          { y1: 75, y2: 65, color: '#44ff44', delay: '0.15s' },
          { y1: 76, y2: 80, color: '#4488ff', delay: '0.2s' },
          { y1: 78, y2: 95, color: '#8844ff', delay: '0.25s' },
          { y1: 80, y2: 108, color: '#cc44ff', delay: '0.3s' },
        ].map((ray, i) => (
          <line
            key={i}
            x1="90"
            y1={ray.y1}
            x2="152"
            y2={ray.y2}
            stroke={ray.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.9;0.9"
              dur="0.6s"
              begin={ray.delay}
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              values="0.9;0.7;0.9"
              dur="2s"
              begin="1s"
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Labels */}
        <text x="155" y="24" fontSize="7" fill="#ff4444" textAnchor="end" opacity="0.8">красный</text>
        <text x="155" y="112" fontSize="7" fill="#cc44ff" textAnchor="end" opacity="0.8">фиолет.</text>
      </svg>
    </div>
  );
};

export default LightAnimation;
