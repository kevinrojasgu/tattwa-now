import React from 'react';
/**
 * @file MoonIcon.tsx
 * @description SVG moon phase renderer molecule. Draws the illuminated
 * portion of the moon for any phase value (0–1).
 */

/** Props for MoonIcon */
interface MoonIconProps {
  /** SunCalc phase value: 0 = new moon, 0.5 = full moon */
  phase: number;
  /** Illumination fraction 0–1 */
  illumination: number;
}

/**
 * SVG Moon phase visualization.
 * Draws the lit crescent or gibbous shape based on phase arithmetic.
 *
 * @param phase - Moon phase (0–1)
 * @param illumination - Illuminated fraction (0–1)
 */
export function MoonIcon({ phase, illumination }: MoonIconProps): React.JSX.Element {
  const size = 64;
  const cx = size / 2;
  const cy = size / 2;
  const r = 26;

  const isWaxing = phase < 0.5;
  const angle = phase * 2 * Math.PI;
  const sweepFactor = Math.cos(angle);
  const litSide = isWaxing ? 'right' : 'left';

  function buildPath(): string {
    const ry = r;
    const rx = Math.abs(sweepFactor) * r;
    const topY = cy - r;
    const bottomY = cy + r;

    if (illumination < 0.02) return '';
    if (illumination > 0.98) {
      return `M ${cx},${topY} A ${r},${r} 0 1 1 ${cx},${bottomY} A ${r},${r} 0 1 1 ${cx},${topY}`;
    }

    if (litSide === 'right') {
      const sweepOuter = 1;
      const sweepInner = sweepFactor > 0 ? 0 : 1;
      return `M ${cx},${topY} A ${r},${ry} 0 0 ${sweepOuter} ${cx},${bottomY} A ${rx},${ry} 0 0 ${sweepInner} ${cx},${topY}`;
    } else {
      const sweepOuter = 0;
      const sweepInner = sweepFactor > 0 ? 1 : 0;
      return `M ${cx},${topY} A ${r},${ry} 0 0 ${sweepOuter} ${cx},${bottomY} A ${rx},${ry} 0 0 ${sweepInner} ${cx},${topY}`;
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="moonGlow">
          <stop offset="70%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="moonSoftGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r + 8} fill="url(#moonGlow)" />
      <circle cx={cx} cy={cy} r={r} fill="#1a1a2e" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <path
        d={buildPath()}
        fill="#e8e8f0"
        opacity="0.9"
        filter="url(#moonSoftGlow)"
      />
    </svg>
  );
}
