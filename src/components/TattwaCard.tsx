import type { TattwaState } from '../lib/tattwas';
import { TATTWAS } from '../lib/tattwaData';
import { TattwaShape } from './TattwaShapes';
import { SubTattwa } from './SubTattwa';
import { formatTime } from '../lib/sunrise';

interface TattwaCardProps {
  state: TattwaState;
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function TattwaCard({ state }: TattwaCardProps) {
  const info = TATTWAS[state.tattwa];

  return (
    <div
      className="relative rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-1000"
      style={{
        background: `linear-gradient(135deg, ${info.colorGradientFrom}, ${info.colorGradientTo})`,
        boxShadow: `0 0 60px ${info.colorHex}30, 0 0 120px ${info.colorHex}10`,
      }}
    >
      {/* Subtle background shape */}
      <div className="absolute top-4 right-4 opacity-10">
        <TattwaShape tattwa={state.tattwa} size={120} />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-1">
              Current Tattwa
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: info.colorLight }}
            >
              {state.tattwa}
            </h2>
            <div className="text-sm text-white/70 mt-1">
              {info.element} &middot; {info.nature}
            </div>
          </div>
          <div className="text-right">
            <TattwaShape
              tattwa={state.tattwa}
              size={56}
              className="transition-all duration-700"
              style={{ color: info.colorLight }}
            />
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span
              className="text-4xl sm:text-5xl font-mono font-bold tabular-nums"
              style={{ color: info.colorLight }}
            >
              {formatCountdown(state.secondsRemaining)}
            </span>
            <span className="text-sm text-white/50">remaining</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 rounded-full overflow-hidden bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-linear"
              style={{
                width: `${state.progress * 100}%`,
                backgroundColor: info.colorLight,
                boxShadow: `0 0 8px ${info.colorLight}80`,
              }}
            />
          </div>
        </div>

        {/* Properties row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="bg-white/5 rounded-lg px-3 py-2">
            <div className="text-white/40 text-xs">Planet</div>
            <div className="text-white/90 font-medium">{info.planet}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-2">
            <div className="text-white/40 text-xs">Direction</div>
            <div className="text-white/90 font-medium">{info.direction}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-2">
            <div className="text-white/40 text-xs">Sense</div>
            <div className="text-white/90 font-medium">{info.sense}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-2">
            <div className="text-white/40 text-xs">Mantra</div>
            <div className="text-white/90 font-medium">{info.mantra}</div>
          </div>
        </div>

        {/* Sunrise info */}
        <div className="mt-3 text-xs text-white/40">
          Cycle started at sunrise: {formatTime(state.sunrise)} &middot; Cycle #{state.cycleNumber + 1}
        </div>

        {/* Sub-tattwa */}
        <SubTattwa
          mainTattwa={state.tattwa}
          subTattwa={state.subTattwa}
          subTattwaIndex={state.subTattwaIndex}
          subProgress={state.subProgress}
        />
      </div>
    </div>
  );
}
