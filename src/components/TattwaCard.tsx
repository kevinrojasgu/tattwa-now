import { useEffect, useRef, useState } from 'react';
import type { TattwaState } from '../lib/tattwas';
import { TATTWAS, type TattwaName } from '../lib/tattwaData';
import { TattwaShape } from './TattwaShapes';
import { SubTattwa } from './SubTattwa';
import { ElementAnimation } from './ElementAnimation';
import { formatTime } from '../lib/sunrise';

interface TattwaCardProps {
  state: TattwaState;
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Animated digit that rolls when the value changes.
 */
function AnimatedCountdown({ seconds, color }: { seconds: number; color: string }) {
  const text = formatCountdown(seconds);
  const prevRef = useRef(text);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevRef.current !== text) {
      setIsFlipping(true);
      const t = setTimeout(() => setIsFlipping(false), 150);
      prevRef.current = text;
      return () => clearTimeout(t);
    }
  }, [text]);

  return (
    <span
      className="text-4xl sm:text-5xl font-mono font-bold tabular-nums inline-block transition-transform duration-150"
      style={{
        color,
        transform: isFlipping ? 'scale(1.04)' : 'scale(1)',
        textShadow: `0 0 20px ${color}40`,
      }}
    >
      {text}
    </span>
  );
}

/**
 * Detects Tattwa changes and triggers a transition.
 */
function useTattwaTransition(tattwa: TattwaName) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevTattwa = useRef(tattwa);

  useEffect(() => {
    if (prevTattwa.current !== tattwa) {
      setIsTransitioning(true);
      const t = setTimeout(() => setIsTransitioning(false), 800);
      prevTattwa.current = tattwa;
      return () => clearTimeout(t);
    }
  }, [tattwa]);

  return isTransitioning;
}

export function TattwaCard({ state }: TattwaCardProps) {
  const info = TATTWAS[state.tattwa];
  const isTransitioning = useTattwaTransition(state.tattwa);

  return (
    <div
      className="relative rounded-2xl p-6 sm:p-8 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${info.colorGradientFrom}, ${info.colorGradientTo})`,
        boxShadow: `0 0 60px ${info.colorHex}30, 0 0 120px ${info.colorHex}10`,
        transition: 'background 1s ease, box-shadow 1s ease',
        transform: isTransitioning ? 'scale(1.01)' : 'scale(1)',
      }}
    >
      {/* Animated background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 70% 30%, ${info.colorHex}15 0%, transparent 60%)`,
          transition: 'all 1s ease',
        }}
      />

      {/* Subtle background shape with float */}
      <div className="absolute top-4 right-4 opacity-10 animate-float">
        <TattwaShape tattwa={state.tattwa} size={120} />
      </div>

      {/* Gradient border effect */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: `1px solid ${info.colorHex}25`,
          transition: 'border-color 1s ease',
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-1">
              Current Tattwa
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-700"
              style={{ color: info.colorLight }}
            >
              {state.tattwa}
            </h2>
            <div className="text-sm text-white/70 mt-1">
              {info.element} &middot; {info.nature}
            </div>
          </div>
          <div className="text-right">
            <div
              className="transition-all duration-700"
              style={{
                color: info.colorLight,
                filter: `drop-shadow(0 0 8px ${info.colorHex}60)`,
              }}
            >
              <TattwaShape tattwa={state.tattwa} size={56} />
            </div>
          </div>
        </div>

        {/* Element & Planet Animation */}
        <div
          className="my-4 rounded-xl overflow-hidden"
          style={{ background: `linear-gradient(180deg, ${info.colorHex}08 0%, ${info.colorHex}03 100%)` }}
          key={state.tattwa} /* re-mount on tattwa change so animation replays */
        >
          <div className="h-[100px] sm:h-[120px]">
            <ElementAnimation
              tattwa={state.tattwa}
              color={info.colorLight}
              colorLight={info.colorLight}
              colorHex={info.colorHex}
            />
          </div>
        </div>

        {/* Countdown */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <AnimatedCountdown seconds={state.secondsRemaining} color={info.colorLight} />
            <span className="text-sm text-white/50">remaining</span>
          </div>
        </div>

        {/* Progress bar with shimmer */}
        <div className="mb-4">
          <div className="h-2 rounded-full overflow-hidden bg-white/10">
            <div
              className="h-full rounded-full shimmer-bar"
              style={{
                width: `${state.progress * 100}%`,
                backgroundColor: info.colorLight,
                boxShadow: `0 0 8px ${info.colorLight}80`,
                transition: 'width 1s linear, background-color 0.7s ease',
              }}
            />
          </div>
        </div>

        {/* Properties row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {[
            { label: 'Planet', value: info.planet },
            { label: 'Direction', value: info.direction },
            { label: 'Sense', value: info.sense },
            { label: 'Mantra', value: info.mantra },
          ].map((prop, i) => (
            <div
              key={prop.label}
              className="bg-white/5 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="text-white/40 text-xs">{prop.label}</div>
              <div className="text-white/90 font-medium">{prop.value}</div>
            </div>
          ))}
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
