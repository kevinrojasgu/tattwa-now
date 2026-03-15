import React from 'react';
/**
 * @file BreathingIcon.tsx
 * @description SVG nostril breathing diagram molecule. Highlights the active
 * nostril (left = Ida/lunar, right = Pingala/solar) with color and animation.
 */

/** Props for BreathingIcon */
interface BreathingIconProps {
  /** Which nostril is dominant */
  breathingSide: 'left' | 'right';
}

/**
 * SVG diagram of two nostrils with the active side highlighted.
 *
 * @param breathingSide - 'left' for Ida/lunar or 'right' for Pingala/solar
 */
export function BreathingIcon({ breathingSide }: BreathingIconProps): React.JSX.Element {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg width="48" height="48" viewBox="0 0 48 48">
        {/* Left nostril */}
        <ellipse
          cx="16"
          cy="30"
          rx="6"
          ry="8"
          fill="none"
          stroke={breathingSide === 'left' ? '#3db88e' : 'rgba(255,255,255,0.2)'}
          strokeWidth="2"
          style={{ transition: 'stroke 0.5s ease' }}
        />
        {/* Right nostril */}
        <ellipse
          cx="32"
          cy="30"
          rx="6"
          ry="8"
          fill="none"
          stroke={breathingSide === 'right' ? '#e74c3c' : 'rgba(255,255,255,0.2)'}
          strokeWidth="2"
          style={{ transition: 'stroke 0.5s ease' }}
        />
        {/* Nose bridge */}
        <path
          d="M20 14 Q24 8 28 14 L28 24 Q24 28 20 24 Z"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
        {/* Active side fill glow */}
        {breathingSide === 'left' && (
          <ellipse cx="16" cy="30" rx="6" ry="8" fill="#3db88e" opacity="0.15" className="animate-breathe" />
        )}
        {breathingSide === 'right' && (
          <ellipse cx="32" cy="30" rx="6" ry="8" fill="#e74c3c" opacity="0.15" className="animate-breathe" />
        )}
        {/* Active side airflow arrow */}
        {breathingSide === 'left' && (
          <g className="animate-breathe" style={{ transformOrigin: '16px 18px' }}>
            <path d="M16 20 L16 16 M13 18 L16 16 L19 18" stroke="#3db88e" strokeWidth="1.5" fill="none" opacity="0.7" />
          </g>
        )}
        {breathingSide === 'right' && (
          <g className="animate-breathe" style={{ transformOrigin: '32px 18px' }}>
            <path d="M32 20 L32 16 M29 18 L32 16 L35 18" stroke="#e74c3c" strokeWidth="1.5" fill="none" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
}
