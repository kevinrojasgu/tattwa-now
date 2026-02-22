import { type TattwaName } from '../lib/tattwaData';
import { ANIMATION_CONFIG } from '../lib/animationConfig';

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

      {/* Deep void center */}
      <circle cx="100" cy="60" r={config.voidGlow.radius} fill="url(#akash-void)" />

      {/* Vanishing concentric rings */}
      {[...Array(config.rings.count)].map((_, i) => (
        <circle
          key={i}
          cx="100"
          cy="60"
          r="10"
          fill="none"
          stroke={colorLight}
          strokeWidth={config.rings.strokeWidth}
          opacity="0"
          className="akash-ring"
          style={{ animationDelay: `${i * config.rings.intervalDelay}s` }}
        />
      ))}

      {/* Floating starlight/void particles */}
      {[...Array(config.particles.count)].map((_, i) => (
        <circle
          key={i}
          cx={70 + Math.random() * 60}
          cy={30 + Math.random() * 60}
          r={config.particles.minSize + Math.random() * (config.particles.maxSize - config.particles.minSize)}
          fill={colorLight}
          className="akash-particle"
          style={{
            animationDelay: `${Math.random() * 4}s`,
            opacity: 0.2 + Math.random() * 0.5
          }}
        />
      ))}

      {/* Saturn's haunting presence */}
      <g opacity={config.saturn.opacity}>
        <circle cx="100" cy="60" r="11" fill={colorHex} opacity="0.3" />
        <circle cx="100" cy="60" r="11" fill="none" stroke={colorLight} strokeWidth="1" opacity="0.6" />
        <ellipse
          cx="100" cy="60" rx="24" ry="6"
          fill="none"
          stroke={colorLight}
          strokeWidth="1.5"
          opacity={config.saturn.ringOpacity}
          className="saturn-ring-rotate"
        />
      </g>

      {/* Planet symbol ♄ */}
      <text
        x="100" y="105"
        textAnchor="middle"
        fill={color}
        fontSize="15"
        fontFamily="serif"
        opacity={config.symbolOpacity}
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
  const config = ANIMATION_CONFIG.Vayu;
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="vayu-wind" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colorLight} stopOpacity="0" />
          <stop offset="50%" stopColor={colorLight} stopOpacity="0.5" />
          <stop offset="100%" stopColor={colorLight} stopOpacity="0" />
        </linearGradient>
        <filter id="vayu-blur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Wind current lines - more wispy and varied */}
      {config.windLines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          fill="none"
          stroke={colorLight}
          strokeWidth={line.width}
          strokeLinecap="round"
          opacity={line.opacity}
          className="vayu-wind-line"
          style={{ animationDelay: line.delay, filter: 'url(#vayu-blur)' }}
        />
      ))}

      {/* Increased swirling air particles */}
      {[...Array(config.particles.count)].map((_, i) => (
        <circle
          key={i}
          cx="100"
          cy="60"
          r={config.particles.minSize + Math.random() * (config.particles.maxSize - config.particles.minSize)}
          fill={colorLight}
          className="vayu-swirl-particle"
          style={{
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${config.particles.minSpeed + Math.random() * (config.particles.maxSpeed - config.particles.minSpeed)}s`,
            opacity: 0.3 + Math.random() * 0.3
          }}
        />
      ))}

      {/* Central air whorl - more complex */}
      <g className="vayu-whorl" opacity={config.whorl.opacity}>
        <path
          d="M 90,60 Q 100,45 110,60 Q 120,75 110,90 Q 100,105 90,90 Q 80,75 90,60"
          fill="none"
          stroke={colorLight}
          strokeWidth="0.8"
          transform="scale(0.6) translate(66, 40)"
        />
        <path
          d="M 95,55 Q 100,50 105,55 Q 110,60 105,65 Q 100,70 95,65 Q 88,60 95,55"
          fill="none"
          stroke={colorLight}
          strokeWidth="1"
        />
      </g>

      {/* Mercury swift essence */}
      <circle cx="100" cy="58" r="7" fill={colorHex} opacity={config.mercury.opacity} />
      <circle cx="100" cy="58" r="7" fill="none" stroke={colorLight} strokeWidth="1" opacity={config.mercury.opacity * 1.33} />

      {/* Planet symbol ☿ */}
      <text
        x="100" y="105"
        textAnchor="middle"
        fill={color}
        fontSize="15"
        fontFamily="serif"
        opacity={config.symbolOpacity}
        className="planet-symbol-float"
      >
        ☿
      </text>
    </svg>
  );
}

/**
 * Tejas / Fire / Sun+Mars — Configurable version 2
 * Flickering flames rising upward, sparking embers, and a radiant sun core.
 */
function TejasAnimation({ color, colorLight, colorHex }: Omit<ElementAnimationProps, 'tattwa'>) {
  const config = ANIMATION_CONFIG.Tejas;

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <radialGradient id="tejas-core" cx="50%" cy="60%">
          <stop offset="0%" stopColor={colorLight} stopOpacity={config.coreGlow.opacity} />
          <stop offset="60%" stopColor={colorHex} stopOpacity={config.coreGlow.opacity * 0.4} />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
        <filter id="tejas-blur">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
        </filter>
        <filter id="tejas-glow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Deep heat glow */}
      <ellipse cx="100" cy="75" rx={config.coreGlow.rx} ry={config.coreGlow.ry} fill="url(#tejas-core)" />

      {/* Central flame core */}
      <path
        d="M 100,85 Q 90,60 100,35 Q 110,60 100,85"
        fill={colorHex}
        opacity="0.4"
        filter="url(#tejas-blur)"
        className="tejas-flame"
        style={{ animationDuration: '1.2s' }}
      />

      {/* Dynamic flame tongues from config */}
      {config.flames.map((flame, i) => (
        <path
          key={i}
          d={flame.d}
          fill={flame.color || colorLight}
          opacity={flame.opacity}
          filter="url(#tejas-glow)"
          className="tejas-flame"
          style={{
            animationDelay: flame.delay,
            animationDuration: flame.speed,
            transformOrigin: 'center bottom',
            mixBlendMode: 'screen'
          }}
        />
      ))}

      {/* Configurable embers */}
      {[...Array(config.embers.count)].map((_, i) => {
        const delay = config.embers.minDelay + (Math.random() * (config.embers.maxDelay - config.embers.minDelay));
        const size = config.embers.minSize + (Math.random() * (config.embers.maxSize - config.embers.minSize));
        const cx = 85 + (Math.random() * 30);
        return (
          <circle
            key={i}
            cx={cx}
            cy="85"
            r={size}
            fill={colorLight}
            className="tejas-ember"
            style={{
              animationDelay: `${delay}s`,
              animationDuration: config.embers.riseSpeed
            }}
          />
        );
      })}

      {/* Sun/Mars core - more radiant highlight at top of flames */}
      <circle cx="100" cy={config.sun.y} r="9" fill={config.sun.color} opacity="0.4" className="tejas-core-pulse" />
      <circle cx="100" cy={config.sun.y} r="9" fill="none" stroke={config.sun.color} strokeWidth="1.2" opacity="0.6" filter="url(#tejas-glow)" />

      {/* Dynamic Sun rays from config */}
      {[...Array(config.sunRays.count)].map((_, i) => {
        const angle = (i * 360) / config.sunRays.count;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * config.sunRays.radiusInner;
        const y1 = config.sun.y + Math.sin(rad) * config.sunRays.radiusInner;
        const x2 = 100 + Math.cos(rad) * config.sunRays.radiusOuter;
        const y2 = config.sun.y + Math.sin(rad) * config.sunRays.radiusOuter;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={config.sun.color}
            strokeWidth="1"
            strokeLinecap="round"
            opacity={config.sunRays.intensity}
            className="tejas-ray"
            style={{
              animationDelay: `${angle / 360}s`,
              transformOrigin: `100px ${config.sun.y}px`
            }}
          />
        );
      })}

      {/* Planet symbols ☉ ♂ */}
      <g className="planet-symbol-float" opacity={config.symbolOpacity}>
        <text
          x="88" y="108"
          textAnchor="middle"
          fill={color}
          fontSize="13"
          fontFamily="serif"
        >
          ☉
        </text>
        <text
          x="112" y="108"
          textAnchor="middle"
          fill={color}
          fontSize="13"
          fontFamily="serif"
          style={{ animationDelay: '1.5s' }}
        >
          ♂
        </text>
      </g>
    </svg>
  );
}

/**
 * Prithvi / Earth / Jupiter — stable crystalline growth,
 * geometric ground formations, and Jupiter's benevolent presence.
 */
function PrithviAnimation({ color, colorLight, colorHex }: Omit<ElementAnimationProps, 'tattwa'>) {
  const config = ANIMATION_CONFIG.Prithvi;
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <linearGradient id="prithvi-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colorHex} stopOpacity="0" />
          <stop offset="100%" stopColor={colorHex} stopOpacity={config.ground.opacity} />
        </linearGradient>
        <filter id="prithvi-glint">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* solid earthen ground foundation */}
      <rect x="0" y={120 - config.ground.height} width="200" height={config.ground.height} fill="url(#prithvi-ground)" />
      <line x1="0" y1={120 - config.ground.height} x2="200" y2={120 - config.ground.height} stroke={colorLight} strokeWidth="0.5" opacity="0.3" />

      {/* Crystalline cluster growth */}
      {config.crystals.map((crystal, i) => (
        <g key={i} className="prithvi-crystal" style={{ animationDelay: `${crystal.delay}s` }}>
          <path
            d={`M ${crystal.x},90 L ${crystal.x + crystal.w / 2},${90 - crystal.h} L ${crystal.x + crystal.w},90 Z`}
            fill={colorHex}
            opacity="0.3"
            stroke={colorLight}
            strokeWidth="1"
          />
          {/* Internal facets */}
          <line x1={crystal.x + crystal.w / 2} y1={90 - crystal.h} x2={crystal.x + crystal.w * 0.4} y2={90} stroke={colorLight} strokeWidth="0.4" opacity="0.4" />
        </g>
      ))}

      {/* Floating geometric mineral essence */}
      {config.gems.map((gem, i) => (
        <g key={i} className="prithvi-gem-float" style={{ animationDelay: `${gem.d}s`, transformOrigin: `${gem.cx}px ${gem.cy}px` }}>
          <polygon
            points={`${gem.cx},${gem.cy - gem.s} ${gem.cx + gem.s},${gem.cy} ${gem.cx},${gem.cy + gem.s} ${gem.cx - gem.s},${gem.cy}`}
            fill={colorLight}
            opacity="0.2"
            stroke={colorLight}
            strokeWidth="0.8"
            filter="url(#prithvi-glint)"
          />
        </g>
      ))}

      {/* Jupiter's stable presence */}
      <circle cx="100" cy="42" r="10" fill={colorHex} opacity={config.jupiter.opacity * 0.625} />
      <circle cx="100" cy="42" r="10" fill="none" stroke={colorLight} strokeWidth="1" opacity={config.jupiter.opacity} />
      <path d="M 91,40 Q 100,38 109,40 M 92,44 Q 100,46 108,44" fill="none" stroke={colorLight} strokeWidth="0.6" opacity="0.3" />

      {/* Planet symbol ♃ */}
      <text
        x="100" y="108"
        textAnchor="middle"
        fill={color}
        fontSize="15"
        fontFamily="serif"
        opacity={config.symbolOpacity}
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
  const config = ANIMATION_CONFIG.Apas;
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <defs>
        <radialGradient id="apas-pool" cx="50%" cy="70%">
          <stop offset="0%" stopColor={colorHex} stopOpacity={config.pool.opacity} />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </radialGradient>
        <filter id="apas-shimmer">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feSpecularLighting specularConstant="1.2" specularExponent="20" lightingColor={colorLight} in="blur" result="specular">
            <fePointLight x="100" y="40" z="20" />
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </defs>

      {/* Water pool glow */}
      <ellipse cx="100" cy="80" rx={config.pool.rx} ry={config.pool.ry} fill="url(#apas-pool)" />

      {/* Expanding ripple circles */}
      {[...Array(config.ripples.count)].map((_, i) => (
        <ellipse
          key={i}
          cx="100"
          cy="80"
          rx="8"
          ry="3"
          fill="none"
          stroke={colorLight}
          strokeWidth="1"
          opacity="0"
          className="apas-ripple"
          style={{ animationDelay: `${i * config.ripples.delayInterval}s` }}
        />
      ))}

      {/* Wave patterns - more fluid from config */}
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

      {/* Falling raindrops from config */}
      {config.drops.map((drop, i) => (
        <g key={i} className="apas-drop" style={{ animationDelay: `${drop.delay}s` }}>
          <path
            d={`M ${drop.cx},15 Q ${drop.cx - 2},25 ${drop.cx},30 Q ${drop.cx + 2},25 ${drop.cx},15`}
            fill={colorLight}
            opacity="0.4"
          />
        </g>
      ))}

      {/* Venus shimmer presence */}
      <g filter={config.venus.shimmer ? "url(#apas-shimmer)" : undefined}>
        <circle cx="100" cy="45" r="8" fill={colorHex} opacity={config.venus.opacity * 0.75} />
        <circle cx="100" cy="45" r="8" fill="none" stroke={colorLight} strokeWidth="1" opacity={config.venus.opacity} />
      </g>

      {/* Planet symbol ♀ */}
      <text
        x="100" y="110"
        textAnchor="middle"
        fill={color}
        fontSize="15"
        fontFamily="serif"
        opacity={config.symbolOpacity}
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
