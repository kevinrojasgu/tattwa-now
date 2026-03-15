import React from 'react';
/**
 * @file ElementAnimation.tsx
 * @description Per-element SVG animation organism. Dispatches to individual
 * element animation components based on the active Tattwa.
 */

import type { TattwaName } from '../../types';
import { ANIMATION_CONFIG } from '../../data/animationConfig';

/** Props for ElementAnimation */
interface ElementAnimationProps {
  /** The active Tattwa determining which animation to render */
  tattwa: TattwaName;
  /** Primary element color (colorLight) */
  color: string;
  /** Light variant color */
  colorLight: string;
  /** Hex color for gradients and glows */
  colorHex: string;
}

/** Props shared by all sub-animation components */
type AnimProps = Omit<ElementAnimationProps, 'tattwa'>;

/**
 * Akash / Ether / Saturn — dissolving rings and void particles.
 */
function AkashAnimation({ color, colorLight, colorHex }: AnimProps): React.JSX.Element {
  const config = ANIMATION_CONFIG.Akash;
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <radialGradient id="akash-void" cx="50%" cy="50%">
          <stop offset="0%" stopColor={colorHex} stopOpacity={config.voidGlow.opacity} />
          <stop offset="70%" stopColor={colorHex} stopOpacity={config.voidGlow.opacity * 0.16} />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="akash-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
        </filter>
      </defs>
      <circle cx="100" cy="60" r={config.voidGlow.radius} fill="url(#akash-void)" />
      {[...Array(config.rings.count)].map((_, i) => (
        <circle
          key={i}
          cx="100" cy="60" r="10"
          fill="none"
          stroke={colorLight}
          strokeWidth={config.rings.strokeWidth}
          opacity="0"
          className="akash-ring"
          style={{ animationDelay: `${i * config.rings.intervalDelay}s` }}
        />
      ))}
      {[...Array(config.particles.count)].map((_, i) => (
        <circle
          key={i}
          cx={70 + (i * 7) % 60}
          cy={30 + (i * 11) % 60}
          r={config.particles.minSize + (i % 6) * ((config.particles.maxSize - config.particles.minSize) / 6)}
          fill={colorLight}
          className="akash-particle"
          style={{ animationDelay: `${(i % 4) * 1.2}s`, opacity: 0.2 + (i % 5) * 0.1 }}
        />
      ))}
      {config.stars.map((star, i) => (
        <circle
          key={`star-${i}`}
          cx={star.cx}
          cy={star.cy}
          r={star.size}
          fill={colorLight}
          className="akash-star"
          style={{ animationDelay: `${star.delay}s` }}
        />
      ))}
      {[...Array(config.orbitParticles.count)].map((_, i) => (
        <circle
          key={`orbit-${i}`}
          cx={100}
          cy={60}
          r={config.particles.minSize + 0.3}
          fill={colorLight}
          className="akash-orbit"
          style={{
            animationDelay: `${i * (6 / config.orbitParticles.count)}s`,
            opacity: 0.35,
            transformOrigin: '100px 60px',
          }}
        />
      ))}
      <circle cx="100" cy="60" r="30" fill="none" className="akash-void-pulse" opacity="0.08" stroke={colorLight} strokeWidth="0.5" />
      <g opacity={config.saturn.opacity}>
        <circle cx="100" cy="60" r="11" fill={colorHex} opacity="0.3" />
        <circle cx="100" cy="60" r="11" fill="none" stroke={colorLight} strokeWidth="1" opacity="0.6" />
        <ellipse cx="100" cy="60" rx="24" ry="6" fill="none" stroke={colorLight} strokeWidth="1.5" opacity={config.saturn.ringOpacity} className="saturn-ring-rotate" />
      </g>
      <text x="100" y="105" textAnchor="middle" fill={color} fontSize="15" fontFamily="serif" opacity={config.symbolOpacity} className="planet-symbol-float">♄</text>
    </svg>
  );
}

/**
 * Vayu / Air — wind currents, gusts, and blowing particles.
 */
function VayuAnimation({ color, colorLight }: AnimProps): React.JSX.Element {
  const config = ANIMATION_CONFIG.Vayu;
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="vayu-wind" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0" />
          <stop offset="50%" stopColor={colorLight} stopOpacity="0.5" />
          <stop offset="100%" stopColor={colorLight} stopOpacity="0" />
        </linearGradient>
        <filter id="vayu-blur"><feGaussianBlur stdDeviation="1.5" /></filter>
      </defs>
      {config.windLines.map((line, i) => (
        <path key={i} d={line.d} fill="none" stroke={colorLight} strokeWidth={line.width} strokeLinecap="round" opacity={line.opacity} className="vayu-wind-line" style={{ animationDelay: line.delay, filter: 'url(#vayu-blur)' }} />
      ))}
      {config.gusts.map((gust, i) => (
        <path key={`gust-${i}`} d={gust.d} fill="none" stroke={colorLight} strokeWidth="1.5" strokeLinecap="round" opacity={gust.opacity} className="vayu-gust" style={{ animationDelay: gust.delay }} />
      ))}
      {[...Array(config.dust.count)].map((_, i) => (
        <circle
          key={`dust-${i}`}
          cx={-10 + (i * 18) % 220}
          cy={35 + (i * 8) % 70}
          r={config.dust.minSize + (i % 5) * ((config.dust.maxSize - config.dust.minSize) / 5)}
          fill={colorLight}
          className="vayu-dust"
          style={{
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${4 + (i % 5) * 0.6}s`,
            opacity: 0.25 + (i % 4) * 0.06,
          }}
        />
      ))}
      {[...Array(config.particles.count)].map((_, i) => (
        <circle
          key={i}
          cx={-15 - (i * 12) % 50}
          cy={30 + (i * 6) % 75}
          r={config.particles.minSize + (i % 6) * ((config.particles.maxSize - config.particles.minSize) / 6)}
          fill={colorLight}
          className="vayu-flow-particle"
          style={{
            animationDelay: `${(i % 4) * 0.5}s`,
            animationDuration: `${config.particles.minSpeed + (i % 5) * 0.5}s`,
            opacity: 0.3 + (i % 5) * 0.04,
          }}
        />
      ))}
      <text x="100" y="105" textAnchor="middle" fill={color} fontSize="15" fontFamily="serif" opacity={config.symbolOpacity} className="planet-symbol-float">☿</text>
    </svg>
  );
}

/**
 * Tejas / Fire / Sun+Mars — flickering flames and radiant sun core.
 */
function TejasAnimation({ color, colorLight, colorHex }: AnimProps): React.JSX.Element {
  const config = ANIMATION_CONFIG.Tejas;
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <radialGradient id="tejas-core" cx="50%" cy="60%">
          <stop offset="0%" stopColor={colorLight} stopOpacity={config.coreGlow.opacity} />
          <stop offset="60%" stopColor={colorHex} stopOpacity={config.coreGlow.opacity * 0.4} />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
        <filter id="tejas-blur"><feGaussianBlur stdDeviation="2.5" result="blur" /></filter>
        <filter id="tejas-glow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <ellipse cx="100" cy="75" rx={config.coreGlow.rx} ry={config.coreGlow.ry} fill="url(#tejas-core)" />
      <path d="M 100,85 Q 90,60 100,35 Q 110,60 100,85" fill={colorHex} opacity="0.4" filter="url(#tejas-blur)" className="tejas-flame" style={{ animationDuration: '1.2s' }} />
      {config.flames.map((flame, i) => (
        <path key={i} d={flame.d} fill={flame.color || colorLight} opacity={flame.opacity} filter="url(#tejas-glow)" className="tejas-flame" style={{ animationDelay: flame.delay, animationDuration: flame.speed, transformOrigin: 'center bottom', mixBlendMode: 'screen' }} />
      ))}
      {[...Array(config.embers.count)].map((_, i) => {
        const delay = config.embers.minDelay + Math.random() * (config.embers.maxDelay - config.embers.minDelay);
        const size = config.embers.minSize + Math.random() * (config.embers.maxSize - config.embers.minSize);
        const cx = 85 + Math.random() * 30;
        return <circle key={i} cx={cx} cy="85" r={size} fill={colorLight} className="tejas-ember" style={{ animationDelay: `${delay}s`, animationDuration: config.embers.riseSpeed }} />;
      })}
      <circle cx="100" cy={config.sun.y} r="9" fill={config.sun.color} opacity="0.4" className="tejas-core-pulse" />
      <circle cx="100" cy={config.sun.y} r="9" fill="none" stroke={config.sun.color} strokeWidth="1.2" opacity="0.6" filter="url(#tejas-glow)" />
      {[...Array(config.sunRays.count)].map((_, i) => {
        const angle = (i * 360) / config.sunRays.count;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * config.sunRays.radiusInner;
        const y1 = config.sun.y + Math.sin(rad) * config.sunRays.radiusInner;
        const x2 = 100 + Math.cos(rad) * config.sunRays.radiusOuter;
        const y2 = config.sun.y + Math.sin(rad) * config.sunRays.radiusOuter;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={config.sun.color} strokeWidth="1" strokeLinecap="round" opacity={config.sunRays.intensity} className="tejas-ray" style={{ animationDelay: `${angle / 360}s`, transformOrigin: `100px ${config.sun.y}px` }} />;
      })}
      <g className="planet-symbol-float" opacity={config.symbolOpacity}>
        <text x="88" y="108" textAnchor="middle" fill={color} fontSize="13" fontFamily="serif">☉</text>
        <text x="112" y="108" textAnchor="middle" fill={color} fontSize="13" fontFamily="serif" style={{ animationDelay: '1.5s' }}>♂</text>
      </g>
    </svg>
  );
}

/**
 * Prithvi / Earth / Jupiter — stable land, cohesion, nourishment, and justice.
 * Motion is intentionally restrained so the element feels rooted and benevolent.
 */
function PrithviAnimation({ color, colorLight, colorHex }: AnimProps): React.JSX.Element {
  const config = ANIMATION_CONFIG.Prithvi;
  const moundPath = 'M 0,120 L 0,92 Q 22,88 42,90 Q 65,92 82,80 Q 95,70 100,62 Q 105,70 118,80 Q 135,92 158,90 Q 178,88 200,92 L 200,120 Z';

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="prithvi-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colorHex} stopOpacity="0.06" />
          <stop offset="60%" stopColor={colorHex} stopOpacity={config.ground.opacity} />
          <stop offset="100%" stopColor={colorHex} stopOpacity={config.ground.opacity * 1.4} />
        </linearGradient>
        <radialGradient id="prithvi-halo" cx="50%" cy="72%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0.12" />
          <stop offset="70%" stopColor={colorHex} stopOpacity="0.05" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
        <filter id="prithvi-glint">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <ellipse cx="100" cy="92" rx="80" ry="22" fill="url(#prithvi-halo)" />
      <path d={moundPath} fill="url(#prithvi-ground)" className="prithvi-landmass" />

      <path d="M 8,96 Q 36,92 66,94 Q 100,96 134,92 Q 164,88 192,94" fill="none" stroke={colorLight} strokeWidth="0.7" opacity="0.18" className="prithvi-strata" />
      <path d="M 18,102 Q 44,98 72,100 Q 100,102 128,98 Q 156,94 182,100" fill="none" stroke={colorLight} strokeWidth="0.55" opacity="0.14" className="prithvi-strata" style={{ animationDelay: '1.2s' }} />
      <path d="M 28,108 Q 52,104 76,106 Q 100,108 124,104 Q 148,100 172,106" fill="none" stroke={colorLight} strokeWidth="0.45" opacity="0.12" className="prithvi-strata" style={{ animationDelay: '2.2s' }} />

      {config.crystals.map((crystal, i) => (
        <g key={i} className="prithvi-crystal" style={{ animationDelay: `${crystal.delay}s` }}>
          <path
            d={`M ${crystal.x},94 L ${crystal.x + crystal.w / 2},${94 - crystal.h * 0.55} L ${crystal.x + crystal.w},94 Z`}
            fill={colorHex}
            opacity="0.26"
            stroke={colorLight}
            strokeWidth="0.9"
          />
          <line
            x1={crystal.x + crystal.w / 2}
            y1={94 - crystal.h * 0.55}
            x2={crystal.x + crystal.w * 0.42}
            y2={94}
            stroke={colorLight}
            strokeWidth="0.35"
            opacity="0.28"
          />
        </g>
      ))}

      {config.gems.map((gem, i) => (
        <g key={i} className="prithvi-gem-float" style={{ animationDelay: `${gem.d}s`, transformOrigin: `${gem.cx}px ${gem.cy + 28}px` }}>
          <polygon
            points={`${gem.cx},${gem.cy + 24 - gem.s} ${gem.cx + gem.s},${gem.cy + 24} ${gem.cx},${gem.cy + 24 + gem.s} ${gem.cx - gem.s},${gem.cy + 24}`}
            fill={colorLight}
            opacity="0.16"
            stroke={colorLight}
            strokeWidth="0.7"
            filter="url(#prithvi-glint)"
          />
        </g>
      ))}

      {config.soilParticles.map((particle, i) => (
        <circle
          key={`soil-${i}`}
          cx={particle.cx}
          cy={particle.cy + 10}
          r={particle.size}
          fill={colorLight}
          className="prithvi-soil"
          style={{ animationDelay: `${particle.delay}s`, opacity: 0.18 }}
        />
      ))}

      {config.seeds.map((seed, i) => (
        <g key={`seed-${i}`} className="prithvi-seed" style={{ animationDelay: `${seed.delay}s`, transformOrigin: `${seed.x}px ${seed.y + 42}px` }}>
          <ellipse cx={seed.x} cy={seed.y + 42} rx="1.8" ry="0.9" fill={colorLight} opacity="0.15" transform={`rotate(${i * 24}, ${seed.x}, ${seed.y + 42})`} />
        </g>
      ))}

      <g className="prithvi-core">
        <polygon points="100,54 110,64 100,74 90,64" fill={colorHex} opacity="0.24" />
        <polygon points="100,58 106,64 100,70 94,64" fill={colorLight} opacity="0.08" />
      </g>

      <circle cx="100" cy="38" r="10" fill={colorHex} opacity={config.jupiter.opacity * 0.5} className="prithvi-jupiter" />
      <circle cx="100" cy="38" r="10" fill="none" stroke={colorLight} strokeWidth="1" opacity={config.jupiter.opacity * 0.9} />
      <path d="M 91,36 Q 100,34 109,36 M 92,40 Q 100,42 108,40" fill="none" stroke={colorLight} strokeWidth="0.6" opacity="0.22" />
      <text x="100" y="108" textAnchor="middle" fill={color} fontSize="15" fontFamily="serif" opacity={config.symbolOpacity} className="planet-symbol-float">♃</text>
    </svg>
  );
}

/**
 * Apas / Water / Venus — reflective, attractive, inward-flowing water.
 * The motion aims to feel magnetic and sensuous rather than stormy.
 */
function ApasAnimation({ color, colorLight, colorHex }: AnimProps): React.JSX.Element {
  const config = ANIMATION_CONFIG.Apas;
  const poolPath = 'M -8,88 Q 22,78 54,82 Q 86,86 118,80 Q 150,74 182,80 Q 206,84 212,92 L 212,112 Q 182,106 150,110 Q 118,114 86,108 Q 54,102 22,108 Q -2,112 -8,108 Z';

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="apas-depth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0.04" />
          <stop offset="45%" stopColor={colorHex} stopOpacity={config.pool.opacity * 0.75} />
          <stop offset="100%" stopColor={colorHex} stopOpacity={config.pool.opacity * 1.35} />
        </linearGradient>
        <radialGradient id="apas-core-glow" cx="50%" cy="54%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0.18" />
          <stop offset="55%" stopColor={colorHex} stopOpacity="0.07" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="apas-reflection" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0" />
          <stop offset="50%" stopColor={colorLight} stopOpacity="0.55" />
          <stop offset="100%" stopColor={colorLight} stopOpacity="0" />
        </linearGradient>
        <clipPath id="apas-pool-clip">
          <path d={poolPath} />
        </clipPath>
        <filter id="apas-venus-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="118" cy="92" rx={config.pool.rx + 8} ry={config.pool.ry} fill="url(#apas-core-glow)" />

      <path d={poolPath} fill="url(#apas-depth)" className="apas-pool-sway" />

      <path
        d="M 4,86 Q 34,80 64,84 Q 96,88 128,82 Q 160,76 196,84"
        fill="none"
        stroke="url(#apas-reflection)"
        strokeWidth="1.1"
        strokeLinecap="round"
        className="apas-surface"
      />
      <path
        d="M 0,92 Q 34,86 70,90 Q 102,94 136,88 Q 168,82 200,88"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.5"
        opacity="0.2"
        strokeLinecap="round"
        className="apas-surface"
        style={{ animationDelay: '0.7s' }}
      />

      <g clipPath="url(#apas-pool-clip)">
        {config.waves.map((wave, i) => (
          <path
            key={i}
            d={wave.d}
            fill="none"
            stroke={colorLight}
            strokeWidth="0.8"
            opacity={wave.opacity}
            className="apas-wave"
            style={{ animationDelay: wave.delay }}
          />
        ))}
        <path
          d="M -4,94 Q 30,86 68,92 Q 104,98 140,90 Q 172,84 208,90"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.65"
          opacity="0.22"
          className="apas-caustic"
        />
        <path
          d="M -8,100 Q 24,92 58,98 Q 96,104 132,96 Q 166,88 204,96"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.55"
          opacity="0.18"
          className="apas-caustic"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M -12,88 Q 18,82 50,88 Q 88,95 126,89 Q 164,83 210,88"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.45"
          opacity="0.14"
          className="apas-caustic"
          style={{ animationDelay: '0.4s' }}
        />
        <path
          d="M -6,104 Q 30,98 66,102 Q 102,106 138,100 Q 174,94 206,100"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.4"
          opacity="0.12"
          className="apas-caustic"
          style={{ animationDelay: '1.4s' }}
        />
      </g>

      <path
        d="M -10,68 C 26,64 64,70 102,74 C 138,78 172,74 210,66"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.24"
        className="apas-current-left"
      />
      <path
        d="M -14,76 C 20,72 54,78 92,82 C 132,86 170,82 212,76"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.2"
        className="apas-current-right"
      />
      <path
        d="M -12,60 C 22,58 58,62 98,68 C 140,74 176,70 212,62"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.16"
        className="apas-current-left"
        style={{ animationDelay: '0.5s' }}
      />
      <path
        d="M -8,84 C 24,82 62,86 102,92 C 142,98 178,94 210,88"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.55"
        strokeLinecap="round"
        opacity="0.15"
        className="apas-current-right"
        style={{ animationDelay: '1s' }}
      />

      {[...Array(config.ripples.count)].map((_, i) => (
        <ellipse
          key={i}
          cx={68 + (i % 3) * 28}
          cy={91 - (i % 2)}
          rx="7"
          ry="2.4"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.9"
          opacity="0"
          className="apas-ripple"
          style={{ animationDelay: `${i * config.ripples.delayInterval}s` }}
        />
      ))}

      {config.bubbles.map((bubble, i) => (
        <circle
          key={i}
          cx={bubble.cx}
          cy={bubble.cy + 6}
          r={bubble.r}
          fill={colorLight}
          opacity="0.32"
          className="apas-bubble"
          style={{ animationDelay: `${bubble.delay}s`, animationDuration: `${bubble.duration}s` }}
        />
      ))}

      {config.sparkles.map((sparkle, i) => (
        <circle
          key={i}
          cx={sparkle.x}
          cy={sparkle.y + 10}
          r={sparkle.size}
          fill={colorLight}
          className="apas-sparkle"
          style={{ animationDelay: `${sparkle.delay}s` }}
        />
      ))}

      <g filter="url(#apas-venus-glow)">
        <circle cx="100" cy="34" r="7" fill={colorHex} opacity={config.venus.opacity * 0.55} />
        <circle cx="100" cy="34" r="7" fill="none" stroke={colorLight} strokeWidth="1" opacity={config.venus.opacity} />
      </g>
      <path
        d="M 93,72 Q 100,69 107,72"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.7"
        opacity="0.2"
        className="apas-venus-reflection"
      />

      <text x="100" y="110" textAnchor="middle" fill={color} fontSize="15" fontFamily="serif" opacity={config.symbolOpacity} className="planet-symbol-float">♀</text>
    </svg>
  );
}

const ANIMATION_MAP: Record<TattwaName, (props: AnimProps) => React.JSX.Element> = {
  Akash: AkashAnimation,
  Vayu: VayuAnimation,
  Tejas: TejasAnimation,
  Prithvi: PrithviAnimation,
  Apas: ApasAnimation,
};

/**
 * Dispatches to the correct element animation SVG based on the active Tattwa.
 *
 * @param tattwa - The active Tattwa
 * @param color - Primary color
 * @param colorLight - Light variant color
 * @param colorHex - Hex color for gradients
 */
export function ElementAnimation({ tattwa, ...props }: ElementAnimationProps): React.JSX.Element {
  const AnimComponent = ANIMATION_MAP[tattwa];
  return (
    <div className="element-animation-container">
      <AnimComponent {...props} />
    </div>
  );
}
