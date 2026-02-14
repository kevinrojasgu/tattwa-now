import type { MoonState } from '../lib/moonPhase';
import type { SunTimes } from '../lib/sunrise';
import { formatTime } from '../lib/sunrise';

interface MoonPhaseProps {
  moon: MoonState;
  sun: SunTimes;
}

/**
 * SVG Moon phase visualization.
 * Uses the illumination and phase to draw a realistic moon.
 */
function MoonIcon({ phase, illumination }: { phase: number; illumination: number }) {
  const size = 64;
  const cx = size / 2;
  const cy = size / 2;
  const r = 26;

  // Determine the terminator curve
  // phase 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter
  const isWaxing = phase < 0.5;

  // Calculate the x-offset for the inner ellipse edge
  // When phase = 0 or 1: fully dark (new moon)
  // When phase = 0.25 or 0.75: half moon
  // When phase = 0.5: full moon
  const angle = phase * 2 * Math.PI;
  const sweepFactor = Math.cos(angle);

  const litSide = isWaxing ? 'right' : 'left';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Glow */}
      <defs>
        <radialGradient id="moonGlow">
          <stop offset="70%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 6} fill="url(#moonGlow)" />

      {/* Dark side of moon */}
      <circle cx={cx} cy={cy} r={r} fill="#1a1a2e" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Lit portion using a path */}
      <path
        d={(() => {
          // Create the lit crescent/gibbous shape
          const ry = r;
          const rx = Math.abs(sweepFactor) * r;
          const topY = cy - r;
          const bottomY = cy + r;

          if (illumination < 0.02) {
            // New moon - nothing lit
            return '';
          }

          if (illumination > 0.98) {
            // Full moon - all lit
            return `M ${cx},${topY} A ${r},${r} 0 1 1 ${cx},${bottomY} A ${r},${r} 0 1 1 ${cx},${topY}`;
          }

          if (litSide === 'right') {
            // Right side is lit (waxing)
            const sweepOuter = 1; // right arc (always clockwise from top to bottom)
            const sweepInner = sweepFactor > 0 ? 0 : 1;
            return `M ${cx},${topY} A ${r},${ry} 0 0 ${sweepOuter} ${cx},${bottomY} A ${rx},${ry} 0 0 ${sweepInner} ${cx},${topY}`;
          } else {
            // Left side is lit (waning)
            const sweepOuter = 0; // left arc
            const sweepInner = sweepFactor > 0 ? 1 : 0;
            return `M ${cx},${topY} A ${r},${ry} 0 0 ${sweepOuter} ${cx},${bottomY} A ${rx},${ry} 0 0 ${sweepInner} ${cx},${topY}`;
          }
        })()}
        fill="#e8e8f0"
        opacity="0.9"
      />
    </svg>
  );
}

export function MoonPhaseComponent({ moon, sun }: MoonPhaseProps) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-4 sm:p-6">
      <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">
        Moon &amp; Breathing
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Moon Phase */}
        <div className="flex items-center gap-4">
          <MoonIcon phase={moon.phase} illumination={moon.illumination} />
          <div>
            <div className="text-white/90 font-medium">{moon.phaseName}</div>
            <div className="text-xs text-white/50 mt-0.5">
              {Math.round(moon.illumination * 100)}% illuminated
            </div>
            <div className="text-xs text-white/40 mt-0.5">
              Day {Math.floor(moon.daysSinceNewMoon)} of lunar cycle
            </div>
          </div>
        </div>

        {/* Breathing */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Nose icon simplified */}
            <svg width="48" height="48" viewBox="0 0 48 48">
              {/* Left nostril */}
              <ellipse
                cx="16"
                cy="30"
                rx="6"
                ry="8"
                fill="none"
                stroke={moon.breathingSide === 'left' ? '#3db88e' : 'rgba(255,255,255,0.2)'}
                strokeWidth="2"
              />
              {/* Right nostril */}
              <ellipse
                cx="32"
                cy="30"
                rx="6"
                ry="8"
                fill="none"
                stroke={moon.breathingSide === 'right' ? '#e74c3c' : 'rgba(255,255,255,0.2)'}
                strokeWidth="2"
              />
              {/* Bridge */}
              <path
                d="M20 14 Q24 8 28 14 L28 24 Q24 28 20 24 Z"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              {/* Active side glow */}
              {moon.breathingSide === 'left' && (
                <ellipse cx="16" cy="30" rx="6" ry="8" fill="#3db88e" opacity="0.15" />
              )}
              {moon.breathingSide === 'right' && (
                <ellipse cx="32" cy="30" rx="6" ry="8" fill="#e74c3c" opacity="0.15" />
              )}
              {/* Flow arrows */}
              {moon.breathingSide === 'left' && (
                <path d="M16 20 L16 16 M13 18 L16 16 L19 18" stroke="#3db88e" strokeWidth="1.5" fill="none" opacity="0.6" />
              )}
              {moon.breathingSide === 'right' && (
                <path d="M32 20 L32 16 M29 18 L32 16 L35 18" stroke="#e74c3c" strokeWidth="1.5" fill="none" opacity="0.6" />
              )}
            </svg>
          </div>
          <div>
            <div className="text-white/90 font-medium">
              {moon.isSushumna ? 'Sushumna' : moon.breathingName}
            </div>
            <div className="text-xs text-white/50 mt-0.5">
              {moon.isSushumna
                ? 'Balanced (transition)'
                : `${moon.breathingSide === 'left' ? 'Left' : 'Right'} nostril dominant`}
            </div>
            <div className="text-xs text-white/40 mt-0.5">
              {moon.breathingSanskrit} Nadi
            </div>
          </div>
        </div>
      </div>

      {/* Sun times */}
      <div className="mt-4 flex gap-4 justify-center text-xs text-white/40">
        <span>Dawn {formatTime(sun.dawn)}</span>
        <span>&middot;</span>
        <span>Sunrise {formatTime(sun.sunrise)}</span>
        <span>&middot;</span>
        <span>Sunset {formatTime(sun.sunset)}</span>
        <span>&middot;</span>
        <span>Dusk {formatTime(sun.dusk)}</span>
      </div>
    </div>
  );
}
