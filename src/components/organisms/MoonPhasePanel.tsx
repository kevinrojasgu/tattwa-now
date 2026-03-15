import React from 'react';
/**
 * @file MoonPhasePanel.tsx
 * @description Moon phase and breathing panel organism. Shows the current
 * moon phase SVG, illumination, nostril breathing side, and sun event times.
 */

import type { MoonState, SunTimes } from '../../types';
import { formatTime } from '../../services/sunrise.service';
import { useLanguage } from '../../controllers/useLanguage';
import { MoonIcon } from '../molecules/MoonIcon';
import { BreathingIcon } from '../molecules/BreathingIcon';

/** Props for MoonPhasePanel */
interface MoonPhasePanelProps {
  /** Current moon state */
  moon: MoonState;
  /** Sun event times for today */
  sun: SunTimes;
}

/**
 * Panel showing moon phase visualization, illumination, lunar day,
 * nostril breathing indicator, and sun times row.
 *
 * @param moon - MoonState from getMoonState()
 * @param sun - SunTimes from getSunTimes()
 */
export function MoonPhasePanel({ moon, sun }: MoonPhasePanelProps): React.JSX.Element {
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
        {/* Moon phase */}
        <div className="flex items-center gap-4 group">
          <div className="transition-transform duration-500 group-hover:scale-110">
            <MoonIcon phase={moon.phase} illumination={moon.illumination} />
          </div>
          <div>
            <div className="text-white/90 font-medium">{moon.phaseName}</div>
            <div className="text-xs text-white/50 mt-0.5">
              {Math.round(moon.illumination * 100)}{t.illuminated}
            </div>
            <div className="text-xs text-white/40 mt-0.5">{dayLunarCycle}</div>
          </div>
        </div>

        {/* Breathing side */}
        <div className="flex items-center gap-4">
          <BreathingIcon breathingSide={moon.breathingSide} />
          <div>
            <div className="text-white/90 font-medium">
              {moon.isSushumna ? 'Sushumna' : moon.breathingName}
            </div>
            <div className="text-xs text-white/50 mt-0.5">{breathingLabel}</div>
            <div className="text-xs text-white/40 mt-0.5">{moon.breathingSanskrit} {t.nadi}</div>
          </div>
        </div>
      </div>

      {/* Sun times row */}
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
