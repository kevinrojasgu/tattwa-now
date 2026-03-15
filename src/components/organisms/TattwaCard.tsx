import React from 'react';
/**
 * @file TattwaCard.tsx
 * @description Main Tattwa card organism. Shows the currently active Tattwa
 * with countdown, progress bar, properties, element animation, and sub-Tattwa tracker.
 */

import { useEffect, useRef, useState } from 'react';
import type { TattwaState, TattwaName } from '../../types';
import { TATTWAS } from '../../data/tattwaData';
import { TattwaShape } from '../molecules/TattwaShape';
import { SubTattwaTracker } from '../molecules/SubTattwaTracker';
import { CountdownTimer } from '../molecules/CountdownTimer';
import { ProgressBar } from '../atoms/ProgressBar';
import { ElementAnimation } from './ElementAnimation';
import { formatTime } from '../../services/sunrise.service';
import { useLanguage } from '../../controllers/useLanguage';
import { translateValue } from '../../services/i18n.service';

/** Props for TattwaCard */
interface TattwaCardProps {
  /** The current Tattwa state */
  state: TattwaState;
  /** Whether we're showing live (real-time) data */
  isLive?: boolean;
  /** The date being viewed (used for time-travel label) */
  viewedDate?: Date;
}

/**
 * Detects Tattwa changes and triggers a brief transition effect.
 *
 * @param tattwa - The current Tattwa name to watch
 * @returns true during the transition window, false otherwise
 */
function useTattwaTransition(tattwa: TattwaName): boolean {
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

/**
 * The primary Tattwa display card — shows name, element, countdown,
 * progress, element animation, and sub-Tattwa tracker.
 *
 * @param state - Current TattwaState from useTattwa hook
 * @param isLive - Shows live indicator vs. time-travel label
 * @param viewedDate - Date used to generate the time-travel label
 */
export function TattwaCard({ state, isLive = true, viewedDate }: TattwaCardProps): React.JSX.Element {
  const { t, lang } = useLanguage();
  const info = TATTWAS[state.tattwa];
  const isTransitioning = useTattwaTransition(state.tattwa);

  function formatViewedLabel(): string {
    if (isLive || !viewedDate) return t.currentTattwa;
    return (
      viewedDate.toLocaleDateString(t.dateLocale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) +
      ' · ' +
      viewedDate.toLocaleTimeString(t.dateLocale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    );
  }

  const props = [
    { label: t.planet, value: translateValue(info.planet, lang) },
    { label: t.direction, value: translateValue(info.direction, lang) },
    { label: t.sense, value: translateValue(info.sense, lang) },
    { label: t.mantra, value: info.mantra },
  ];

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
        style={{ border: `1px solid ${info.colorHex}25`, transition: 'border-color 1s ease' }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-1 flex items-center gap-2">
              {isLive ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  {t.currentTattwa}
                </>
              ) : (
                <>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-400/70">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="normal-case tracking-normal">{formatViewedLabel()}</span>
                </>
              )}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-700"
              style={{ color: info.colorLight }}
            >
              {state.tattwa}
            </h2>
            <div className="text-sm text-white/70 mt-1">
              {translateValue(info.element, lang)} &middot; {translateValue(info.nature, lang)}
            </div>
          </div>
          <div
            className="text-right transition-all duration-700"
            style={{ color: info.colorLight, filter: `drop-shadow(0 0 8px ${info.colorHex}60)` }}
          >
            <TattwaShape tattwa={state.tattwa} size={56} />
          </div>
        </div>

        {/* Element animation */}
        <div
          className="my-4 rounded-xl overflow-hidden"
          style={{ background: `linear-gradient(180deg, ${info.colorHex}08 0%, ${info.colorHex}03 100%)` }}
          key={state.tattwa}
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
            <CountdownTimer seconds={state.secondsRemaining} color={info.colorLight} />
            <span className="text-sm text-white/50">{t.remaining}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <ProgressBar progress={state.progress} color={info.colorLight} />
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {props.map((prop, i) => (
            <div
              key={prop.label}
              className="bg-white/5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:scale-[1.02]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="text-white/40 text-xs">{prop.label}</div>
              <div className="text-white/90 font-medium">{prop.value}</div>
            </div>
          ))}
        </div>

        {/* Sunrise info */}
        <div className="mt-3 text-xs text-white/40">
          {t.cycleStartedSunrise} {formatTime(state.sunrise)} &middot; {t.cycle}{state.cycleNumber + 1}
        </div>

        {/* Sub-Tattwa tracker */}
        <SubTattwaTracker
          mainTattwa={state.tattwa}
          subTattwa={state.subTattwa}
          subTattwaIndex={state.subTattwaIndex}
          subProgress={state.subProgress}
        />
      </div>
    </div>
  );
}
