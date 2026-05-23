import React from 'react';

const AtomAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-32 relative">
      <svg viewBox="0 0 120 120" className="w-28 h-28" fill="none">
        <defs>
          <radialGradient id="nucleusGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>

        {/* Orbit ellipse 1 */}
        <ellipse cx="60" cy="60" rx="44" ry="16" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5" fill="none" />
        {/* Orbit ellipse 2 — rotated */}
        <ellipse cx="60" cy="60" rx="44" ry="16" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5" fill="none"
          transform="rotate(60 60 60)" />
        {/* Orbit ellipse 3 — rotated */}
        <ellipse cx="60" cy="60" rx="44" ry="16" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5" fill="none"
          transform="rotate(120 60 60)" />

        {/* Nucleus */}
        <circle cx="60" cy="60" r="10" fill="url(#nucleusGrad)">
          <animate attributeName="r" values="10;11.5;10" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="60" r="15" fill="rgba(251,191,36,0.15)">
          <animate attributeName="r" values="15;20;15" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Electron 1 */}
        <g>
          <animateTransform attributeName="transform" type="rotate"
            from="0 60 60" to="360 60 60" dur="2s" repeatCount="indefinite" />
          <circle cx="104" cy="60" r="4" fill="#4ade80">
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Electron 2 */}
        <g transform="rotate(60 60 60)">
          <animateTransform attributeName="transform" type="rotate"
            from="60 60 60" to="420 60 60" dur="2.8s" repeatCount="indefinite" />
          <circle cx="104" cy="60" r="4" fill="#60a5fa">
            <animate attributeName="opacity" values="1;0.5;1" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Electron 3 */}
        <g transform="rotate(120 60 60)">
          <animateTransform attributeName="transform" type="rotate"
            from="120 60 60" to="480 60 60" dur="3.5s" repeatCount="indefinite" />
          <circle cx="104" cy="60" r="4" fill="#c084fc">
            <animate attributeName="opacity" values="1;0.5;1" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default AtomAnimation;
