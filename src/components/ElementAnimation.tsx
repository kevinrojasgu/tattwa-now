import type { TattwaName } from '../lib/tattwaData';

interface ElementAnimationProps {
  tattwa: TattwaName;
  color: string;
  colorLight: string;
  colorHex: string;
}

/**
 * Akash / Ether / Saturn — dissolving rings radiating outward into void,
 * with Saturn's ringed planet silhouette.
 */
function AkashAnimation({ color, colorLight, colorHex }: Omit<ElementAnimationProps, 'tattwa'>) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <radialGradient id="akash-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor={colorHex} stopOpacity="0.2" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx="100" cy="60" r="50" fill="url(#akash-glow)" />

      {/* Dissolving concentric rings */}
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx="100"
          cy="60"
          r="12"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.8"
          opacity="0"
          className="akash-ring"
          style={{ animationDelay: `${i * 1.5}s` }}
        />
      ))}

      {/* Floating void particles */}
      {[
        { cx: 70, cy: 45, d: 0 }, { cx: 130, cy: 50, d: 0.8 },
        { cx: 85, cy: 75, d: 1.6 }, { cx: 115, cy: 40, d: 2.4 },
        { cx: 90, cy: 55, d: 3.2 }, { cx: 110, cy: 70, d: 4 },
      ].map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="1.5"
          fill={colorLight}
          className="akash-particle"
          style={{ animationDelay: `${p.d}s` }}
        />
      ))}

      {/* Saturn planet body */}
      <circle cx="100" cy="60" r="10" fill={colorHex} opacity="0.3" />
      <circle cx="100" cy="60" r="10" fill="none" stroke={colorLight} strokeWidth="1" opacity="0.6" />

      {/* Saturn ring - tilted ellipse */}
      <ellipse
        cx="100" cy="60" rx="20" ry="5"
        fill="none"
        stroke={colorLight}
        strokeWidth="1.2"
        opacity="0.5"
        className="saturn-ring-rotate"
      />

      {/* Planet symbol ♄ */}
      <text
        x="100" y="100"
        textAnchor="middle"
        fill={color}
        fontSize="14"
        fontFamily="serif"
        opacity="0.4"
        className="planet-symbol-float"
      >
        ♄
      </text>
    </svg>
  );
}

/**
 * Vayu / Air / Mercury — swirling wind currents with flowing animated paths
 * and Mercury's swift winged essence.
 */
function VayuAnimation({ color, colorLight, colorHex }: Omit<ElementAnimationProps, 'tattwa'>) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="vayu-wind" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0" />
          <stop offset="50%" stopColor={colorLight} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colorLight} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Wind current lines - flowing */}
      {[
        { d: 'M 20,40 Q 60,25 100,40 T 180,40', delay: '0s', y: 0 },
        { d: 'M 10,55 Q 50,42 90,55 T 190,55', delay: '0.5s', y: 0 },
        { d: 'M 30,70 Q 70,57 110,70 T 180,70', delay: '1s', y: 0 },
        { d: 'M 15,85 Q 55,72 95,85 T 185,85', delay: '1.5s', y: 0 },
      ].map((line, i) => (
        <path
          key={i}
          d={line.d}
          fill="none"
          stroke={colorLight}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
          className="vayu-wind-line"
          style={{ animationDelay: line.delay }}
        />
      ))}

      {/* Swirling air vortex particles */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <circle
          key={i}
          cx="100"
          cy="60"
          r="1.2"
          fill={colorLight}
          className="vayu-swirl-particle"
          style={{
            animationDelay: `${i * 0.6}s`,
            animationDuration: '4.8s',
          }}
        />
      ))}

      {/* Central air whorl */}
      <path
        d="M 95,55 Q 100,50 105,55 Q 110,60 105,65 Q 100,70 95,65 Q 88,60 95,55"
        fill="none"
        stroke={colorLight}
        strokeWidth="1"
        opacity="0.4"
        className="vayu-whorl"
      />

      {/* Mercury sphere hint */}
      <circle cx="100" cy="58" r="6" fill={colorHex} opacity="0.2" />
      <circle cx="100" cy="58" r="6" fill="none" stroke={colorLight} strokeWidth="0.8" opacity="0.4" />

      {/* Planet symbol ☿ */}
      <text
        x="100" y="100"
        textAnchor="middle"
        fill={color}
        fontSize="14"
        fontFamily="serif"
        opacity="0.4"
        className="planet-symbol-float"
      >
        ☿
      </text>
    </svg>
  );
}

/**
 * Tejas / Fire / Sun+Mars — flickering flames rising upward,
 * sparking embers, and a radiant sun core.
 */
function TejasAnimation({ color, colorLight, colorHex }: Omit<ElementAnimationProps, 'tattwa'>) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <radialGradient id="tejas-core" cx="50%" cy="60%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0.3" />
          <stop offset="60%" stopColor={colorHex} stopOpacity="0.1" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
        <filter id="tejas-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Heat glow */}
      <ellipse cx="100" cy="70" rx="40" ry="30" fill="url(#tejas-core)" />

      {/* Flame tongues */}
      {[
        { d: 'M 100,80 Q 96,55 100,30 Q 104,55 100,80', delay: '0s', x: 0 },
        { d: 'M 88,82 Q 82,60 88,40 Q 92,60 88,82', delay: '0.3s', x: -2 },
        { d: 'M 112,82 Q 108,60 112,40 Q 118,60 112,82', delay: '0.6s', x: 2 },
        { d: 'M 78,85 Q 74,70 80,55 Q 84,70 78,85', delay: '0.9s', x: -1 },
        { d: 'M 122,85 Q 118,70 120,55 Q 126,70 122,85', delay: '1.2s', x: 1 },
      ].map((flame, i) => (
        <path
          key={i}
          d={flame.d}
          fill={colorLight}
          opacity="0.2"
          filter="url(#tejas-glow)"
          className="tejas-flame"
          style={{ animationDelay: flame.delay, transformOrigin: 'center bottom' }}
        />
      ))}

      {/* Rising embers */}
      {[
        { cx: 92, delay: 0 }, { cx: 105, delay: 0.7 },
        { cx: 98, delay: 1.4 }, { cx: 110, delay: 2.1 },
        { cx: 87, delay: 2.8 }, { cx: 115, delay: 3.5 },
      ].map((ember, i) => (
        <circle
          key={i}
          cx={ember.cx}
          cy="80"
          r="1.5"
          fill={colorLight}
          className="tejas-ember"
          style={{ animationDelay: `${ember.delay}s` }}
        />
      ))}

      {/* Sun/Mars core */}
      <circle cx="100" cy="65" r="8" fill={colorHex} opacity="0.3" className="tejas-core-pulse" />
      <circle cx="100" cy="65" r="8" fill="none" stroke={colorLight} strokeWidth="1" opacity="0.5" />

      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 11;
        const y1 = 65 + Math.sin(rad) * 11;
        const x2 = 100 + Math.cos(rad) * 16;
        const y2 = 65 + Math.sin(rad) * 16;
        return (
          <line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={colorLight}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.3"
            className="tejas-ray"
            style={{ animationDelay: `${angle / 360}s`, transformOrigin: '100px 65px' }}
          />
        );
      })}

      {/* Planet symbols ☉ ♂ */}
      <text
        x="88" y="105"
        textAnchor="middle"
        fill={color}
        fontSize="12"
        fontFamily="serif"
        opacity="0.4"
        className="planet-symbol-float"
      >
        ☉
      </text>
      <text
        x="112" y="105"
        textAnchor="middle"
        fill={color}
        fontSize="12"
        fontFamily="serif"
        opacity="0.35"
        className="planet-symbol-float"
        style={{ animationDelay: '1s' }}
      >
        ♂
      </text>
    </svg>
  );
}

/**
 * Prithvi / Earth / Jupiter — stable crystalline growth,
 * geometric ground formations, and Jupiter's benevolent presence.
 */
function PrithviAnimation({ color, colorLight, colorHex }: Omit<ElementAnimationProps, 'tattwa'>) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="prithvi-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colorHex} stopOpacity="0" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Ground layer */}
      <rect x="0" y="85" width="200" height="35" fill="url(#prithvi-ground)" />

      {/* Crystal formations growing up */}
      {[
        { x: 60, h: 30, w: 8, delay: 0 },
        { x: 80, h: 40, w: 10, delay: 0.3 },
        { x: 100, h: 50, w: 12, delay: 0.6 },
        { x: 120, h: 35, w: 9, delay: 0.9 },
        { x: 140, h: 25, w: 7, delay: 1.2 },
      ].map((crystal, i) => (
        <g key={i} className="prithvi-crystal" style={{ animationDelay: `${crystal.delay}s` }}>
          <polygon
            points={`
              ${crystal.x},${90}
              ${crystal.x + crystal.w / 2},${90 - crystal.h}
              ${crystal.x + crystal.w},${90}
            `}
            fill={colorHex}
            opacity="0.2"
            stroke={colorLight}
            strokeWidth="0.8"
          />
          {/* Inner facet */}
          <line
            x1={crystal.x + crystal.w / 2}
            y1={90 - crystal.h}
            x2={crystal.x + crystal.w * 0.35}
            y2={90}
            stroke={colorLight}
            strokeWidth="0.4"
            opacity="0.3"
          />
        </g>
      ))}

      {/* Geometric diamond patterns floating */}
      {[
        { cx: 50, cy: 50, s: 6, d: 0 },
        { cx: 150, cy: 45, s: 5, d: 1.5 },
        { cx: 75, cy: 35, s: 4, d: 3 },
        { cx: 130, cy: 30, s: 4.5, d: 4.5 },
      ].map((gem, i) => (
        <polygon
          key={i}
          points={`${gem.cx},${gem.cy - gem.s} ${gem.cx + gem.s},${gem.cy} ${gem.cx},${gem.cy + gem.s} ${gem.cx - gem.s},${gem.cy}`}
          fill={colorLight}
          opacity="0.15"
          stroke={colorLight}
          strokeWidth="0.6"
          className="prithvi-gem-float"
          style={{ animationDelay: `${gem.d}s`, transformOrigin: `${gem.cx}px ${gem.cy}px` }}
        />
      ))}

      {/* Jupiter body */}
      <circle cx="100" cy="40" r="9" fill={colorHex} opacity="0.2" />
      <circle cx="100" cy="40" r="9" fill="none" stroke={colorLight} strokeWidth="0.8" opacity="0.4" />
      {/* Jupiter bands */}
      <ellipse cx="100" cy="38" rx="8" ry="1.5" fill="none" stroke={colorLight} strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="100" cy="43" rx="7" ry="1.2" fill="none" stroke={colorLight} strokeWidth="0.5" opacity="0.25" />

      {/* Planet symbol ♃ */}
      <text
        x="100" y="105"
        textAnchor="middle"
        fill={color}
        fontSize="14"
        fontFamily="serif"
        opacity="0.4"
        className="planet-symbol-float"
      >
        ♃
      </text>
    </svg>
  );
}

/**
 * Apas / Water / Venus — flowing concentric ripples expanding outward,
 * falling droplets, and Venus's graceful presence.
 */
function ApasAnimation({ color, colorLight, colorHex }: Omit<ElementAnimationProps, 'tattwa'>) {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <radialGradient id="apas-pool" cx="50%" cy="70%">
          <stop offset="0%" stopColor={colorHex} stopOpacity="0.12" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Water pool glow */}
      <ellipse cx="100" cy="75" rx="60" ry="20" fill="url(#apas-pool)" />

      {/* Expanding ripple circles */}
      {[0, 1, 2, 3].map((i) => (
        <ellipse
          key={i}
          cx="100"
          cy="75"
          rx="8"
          ry="3"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.8"
          className="apas-ripple"
          style={{ animationDelay: `${i * 1.2}s` }}
        />
      ))}

      {/* Wave pattern */}
      <path
        d="M 30,70 Q 50,62 70,70 T 110,70 T 150,70 T 190,70"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.8"
        opacity="0.25"
        className="apas-wave"
      />
      <path
        d="M 20,78 Q 40,72 60,78 T 100,78 T 140,78 T 180,78"
        fill="none"
        stroke={colorLight}
        strokeWidth="0.6"
        opacity="0.2"
        className="apas-wave"
        style={{ animationDelay: '1s' }}
      />

      {/* Falling water droplets */}
      {[
        { cx: 85, delay: 0 }, { cx: 100, delay: 0.8 },
        { cx: 115, delay: 1.6 }, { cx: 92, delay: 2.4 },
        { cx: 108, delay: 3.2 },
      ].map((drop, i) => (
        <g key={i} className="apas-drop" style={{ animationDelay: `${drop.delay}s` }}>
          {/* Teardrop shape */}
          <path
            d={`M ${drop.cx},20 Q ${drop.cx - 2.5},30 ${drop.cx},34 Q ${drop.cx + 2.5},30 ${drop.cx},20`}
            fill={colorLight}
            opacity="0.35"
          />
        </g>
      ))}

      {/* Venus mirror body */}
      <circle cx="100" cy="45" r="7" fill={colorHex} opacity="0.2" />
      <circle cx="100" cy="45" r="7" fill="none" stroke={colorLight} strokeWidth="0.8" opacity="0.4" />
      {/* Venus shimmer */}
      <circle cx="97" cy="43" r="2" fill={colorLight} opacity="0.1" />

      {/* Planet symbol ♀ */}
      <text
        x="100" y="108"
        textAnchor="middle"
        fill={color}
        fontSize="14"
        fontFamily="serif"
        opacity="0.4"
        className="planet-symbol-float"
      >
        ♀
      </text>
    </svg>
  );
}

const ANIMATION_MAP: Record<TattwaName, React.FC<Omit<ElementAnimationProps, 'tattwa'>>> = {
  Akash: AkashAnimation,
  Vayu: VayuAnimation,
  Tejas: TejasAnimation,
  Prithvi: PrithviAnimation,
  Apas: ApasAnimation,
};

export function ElementAnimation({ tattwa, ...props }: ElementAnimationProps) {
  const AnimComponent = ANIMATION_MAP[tattwa];
  return (
    <div className="element-animation-container">
      <AnimComponent {...props} />
    </div>
  );
}
