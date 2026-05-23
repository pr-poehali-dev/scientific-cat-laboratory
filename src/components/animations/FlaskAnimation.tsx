import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  delay: number;
  size: number;
}

const FlaskAnimation: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 25 + Math.random() * 50,
      delay: i * 0.4,
      size: 4 + Math.random() * 6,
    }));
    setBubbles(initial);

    const interval = setInterval(() => {
      setBubbles(prev => prev.map(b => ({
        ...b,
        id: b.id + 10,
        x: 25 + Math.random() * 50,
        delay: 0,
        size: 4 + Math.random() * 6,
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-32 relative">
      <svg viewBox="0 0 120 140" className="w-28 h-28 drop-shadow-lg" fill="none">
        <defs>
          <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
          <clipPath id="flaskClip">
            <path d="M42 50 L28 110 Q27 125 60 125 Q93 125 92 110 L78 50 Z" />
          </clipPath>
        </defs>

        {/* Flask body */}
        <path d="M42 50 L28 110 Q27 125 60 125 Q93 125 92 110 L78 50 Z"
          fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.6)" strokeWidth="2" />

        {/* Liquid fill */}
        <rect x="28" y="85" width="64" height="42" fill="url(#liquid)" clipPath="url(#flaskClip)" opacity="0.85" />

        {/* Liquid surface wave */}
        <path d="M29 87 Q45 82 60 87 Q75 92 91 87" stroke="#4ade80" strokeWidth="1.5" fill="none" opacity="0.8">
          <animate attributeName="d"
            values="M29 87 Q45 82 60 87 Q75 92 91 87;M29 90 Q45 95 60 90 Q75 85 91 90;M29 87 Q45 82 60 87 Q75 92 91 87"
            dur="2s" repeatCount="indefinite" />
        </path>

        {/* Glass shine */}
        <path d="M42 50 L28 110 Q27 125 60 125 Q93 125 92 110 L78 50 Z"
          fill="url(#glass)" />

        {/* Flask neck */}
        <rect x="45" y="10" width="30" height="42" rx="3"
          fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.5)" strokeWidth="1.5" />
        <rect x="45" y="10" width="30" height="42" rx="3" fill="url(#glass)" />

        {/* Flask mouth */}
        <rect x="40" y="6" width="40" height="8" rx="4"
          fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.6)" strokeWidth="1.5" />

        {/* Bubbles */}
        {bubbles.map((b) => (
          <circle
            key={b.id}
            cx={b.x}
            cy="100"
            r={b.size / 2}
            fill="rgba(74,222,128,0.5)"
            stroke="rgba(74,222,128,0.8)"
            strokeWidth="0.5"
          >
            <animate
              attributeName="cy"
              from="110"
              to="60"
              dur={`${1.5 + b.delay}s`}
              begin={`${b.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.8"
              to="0"
              dur={`${1.5 + b.delay}s`}
              begin={`${b.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              from={`${b.size / 2}`}
              to="1"
              dur={`${1.5 + b.delay}s`}
              begin={`${b.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Glow */}
        <ellipse cx="60" cy="125" rx="28" ry="6" fill="rgba(74,222,128,0.15)" />
      </svg>
    </div>
  );
};

export default FlaskAnimation;
