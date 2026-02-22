import type { MoonState } from '../lib/moonPhase';
import type { SunTimes } from '../lib/sunrise';
import { formatTime } from '../lib/sunrise';
import { useLanguage } from '../hooks/useLanguage';

interface MoonPhaseProps {
  moon: MoonState;
  sun: SunTimes;
}

/**
 * SVG Moon phase visualization.
 */
function MoonIcon({ phase, illumination }: { phase: number; illumination: number }) {
  const size = 64;
  const cx = size / 2;
  const cy = size / 2;
  const r = 26;

  const isWaxing = phase < 0.5;
  const angle = phase * 2 * Math.PI;
  const sweepFactor = Math.cos(angle);
  const litSide = isWaxing ? 'right' : 'left';

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
        d={(() => {
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
        })()}
        fill="#e8e8f0"
        opacity="0.9"
        filter="url(#moonSoftGlow)"
      />
    </svg>
  );
}

function BreathingIcon({ breathingSide }: { breathingSide: 'left' | 'right' }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg width="48" height="48" viewBox="0 0 48 48">
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
        <path
          d="M20 14 Q24 8 28 14 L28 24 Q24 28 20 24 Z"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
        {breathingSide === 'left' && (
          <ellipse cx="16" cy="30" rx="6" ry="8" fill="#3db88e" opacity="0.15" className="animate-breathe" />
        )}
        {breathingSide === 'right' && (
          <ellipse cx="32" cy="30" rx="6" ry="8" fill="#e74c3c" opacity="0.15" className="animate-breathe" />
        )}
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

export function MoonPhaseComponent({ moon, sun }: MoonPhaseProps) {
  const { t } = useLanguage();

  const sunItems = [
    { label: t.dawn, time: sun.dawn },
    { label: t.sunrise, time: sun.sunrise },
    { label: t.sunset, time: sun.sunset },
    { label: t.dusk, time: sun.dusk },
  ];

  const breathingLabel = moon.isSushumna
    ? t.balanced
    : moon.breathingSide === 'left'
      ? t.leftNostril
      : t.rightNostril;

  const dayLunarCycle = t.dayLunarCycle.replace('{day}', String(Math.floor(moon.daysSinceNewMoon)));

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-4 sm:p-6 glass-card">
      <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">
        {t.moonAndBreathing}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Moon Phase */}
        <div className="flex items-center gap-4 group">
          <div className="transition-transform duration-500 group-hover:scale-110">
            <MoonIcon phase={moon.phase} illumination={moon.illumination} />
          </div>
          <div>
            <div className="text-white/90 font-medium">{moon.phaseName}</div>
            <div className="text-xs text-white/50 mt-0.5">
              {Math.round(moon.illumination * 100)}{t.illuminated}
            </div>
            <div className="text-xs text-white/40 mt-0.5">
              {dayLunarCycle}
            </div>
          </div>
        </div>

        {/* Breathing */}
        <div className="flex items-center gap-4">
          <BreathingIcon breathingSide={moon.breathingSide} />
          <div>
            <div className="text-white/90 font-medium">
              {moon.isSushumna ? 'Sushumna' : moon.breathingName}
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              {breathingLabel}
            </div>
            <div className="text-xs text-white/40 mt-0.5">
              {moon.breathingSanskrit} {t.nadi}
            </div>
          </div>
        </div>
      </div>

      {/* Sun times */}
      <div className="mt-4 flex gap-3 justify-center text-xs text-white/40 flex-wrap">
        {sunItems.map((item, i) => (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-white/15">&middot;</span>}
            <span className="transition-colors duration-300 hover:text-white/60">
              {item.label} {formatTime(item.time)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
