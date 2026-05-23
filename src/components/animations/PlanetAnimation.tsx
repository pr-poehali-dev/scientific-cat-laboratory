import React from 'react';

const PlanetAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-32 relative">
      <svg viewBox="0 0 140 120" className="w-32 h-28" fill="none">
        <defs>
          <radialGradient id="sunGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#ff8c00" />
            <stop offset="100%" stopColor="#cc4400" />
          </radialGradient>
          <radialGradient id="planet1Grad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id="planet2Grad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#5b21b6" />
          </radialGradient>
        </defs>

        {/* Stars */}
        {[
          [10, 15], [130, 25], [20, 90], [125, 95], [65, 8], [5, 55], [135, 60]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1" fill="white" opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6"
              dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Orbit rings */}
        <ellipse cx="70" cy="60" rx="48" ry="14" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
        <ellipse cx="70" cy="60" rx="28" ry="8" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

        {/* Sun */}
        <circle cx="70" cy="60" r="16" fill="url(#sunGrad)">
          <animate attributeName="r" values="16;17.5;16" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {/* Sun glow */}
        <circle cx="70" cy="60" r="22" fill="rgba(255,180,0,0.12)">
          <animate attributeName="r" values="22;26;22" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Saturn rings (decorative) */}
        <ellipse cx="70" cy="60" rx="11" ry="3.5" stroke="rgba(212,146,62,0.5)" strokeWidth="1.5" fill="none"
          transform="rotate(-20, 70, 60)" />

        {/* Planet 1 - orbiting */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 70 60"
            to="360 70 60"
            dur="6s"
            repeatCount="indefinite"
          />
          <circle cx="118" cy="60" r="7" fill="url(#planet1Grad)" />
          <circle cx="118" cy="60" r="7" fill="rgba(255,255,255,0.1)" />
        </g>

        {/* Planet 2 - faster orbit (inner) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="90 70 60"
            to="450 70 60"
            dur="3.5s"
            repeatCount="indefinite"
          />
          <circle cx="98" cy="60" r="5" fill="url(#planet2Grad)" />
        </g>

        {/* Glow under */}
        <ellipse cx="70" cy="108" rx="20" ry="4" fill="rgba(255,140,0,0.15)" />
      </svg>
    </div>
  );
};

export default PlanetAnimation;
