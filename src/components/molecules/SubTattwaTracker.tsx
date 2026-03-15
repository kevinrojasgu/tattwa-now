import React from 'react';
/**
 * @file SubTattwaTracker.tsx
 * @description 5-segment sub-Tattwa progress tracker molecule. Shows the
 * five sub-Tattwa phases of the current main Tattwa period as a row of
 * mini progress bars with labels.
 */

import type { TattwaName } from '../../types';
import { TATTWAS, TATTWA_ORDER } from '../../data/tattwaData';
import { useLanguage } from '../../controllers/useLanguage';
import { translateValue } from '../../services/i18n.service';

/** Props for SubTattwaTracker */
interface SubTattwaTrackerProps {
  /** The currently active main Tattwa */
  mainTattwa: TattwaName;
  /** The currently active sub-Tattwa */
  subTattwa: TattwaName;
  /** Index (0–4) of the active sub-Tattwa */
  subTattwaIndex: number;
  /** Progress through the current sub-Tattwa (0–1) */
  subProgress: number;
}

/**
 * Renders a row of 5 mini progress bars, one per sub-Tattwa.
 * The active sub-Tattwa shows a live fill; past ones are filled; future ones are dim.
 *
 * @param mainTattwa - The main Tattwa name (for display label)
 * @param subTattwa - The active sub-Tattwa name
 * @param subTattwaIndex - Index of active sub-Tattwa
 * @param subProgress - Progress fraction of active sub-Tattwa (0–1)
 */
export function SubTattwaTracker({
  mainTattwa,
  subTattwa,
  subTattwaIndex,
  subProgress,
}: SubTattwaTrackerProps): React.JSX.Element {
  const { t: tr, lang } = useLanguage();
  const subInfo = TATTWAS[subTattwa];

  return (
    <div className="mt-4">
      <div className="text-xs uppercase tracking-wider text-white/50 mb-2">
        {tr.subTattwa}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-white/90">
          {mainTattwa}-{subTattwa}
        </span>
        <span
          className="text-xs transition-colors duration-500"
          style={{ color: `${subInfo.colorLight}80` }}
        >
          ({translateValue(subInfo.element, lang)})
        </span>
      </div>

      {/* Sub-Tattwa progress segments */}
      <div className="flex gap-1.5">
        {TATTWA_ORDER.map((name, i) => {
          const info = TATTWAS[name];
          const isActive = i === subTattwaIndex;
          const isPast = i < subTattwaIndex;
          return (
            <div key={name} className="flex-1 relative group">
              <div
                className="h-1.5 rounded-full overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor:
                    isPast || isActive ? `${info.colorHex}40` : 'rgba(255,255,255,0.1)',
                  transform: isActive ? 'scaleY(1.3)' : 'scaleY(1)',
                }}
              >
                {isActive && (
                  <div
                    className="h-full rounded-full shimmer-bar"
                    style={{
                      width: `${subProgress * 100}%`,
                      backgroundColor: info.colorHex,
                      transition: 'width 1s linear',
                      boxShadow: `0 0 6px ${info.colorHex}60`,
                    }}
                  />
                )}
                {isPast && (
                  <div
                    className="h-full rounded-full"
                    style={{ width: '100%', backgroundColor: info.colorHex }}
                  />
                )}
              </div>
              <div
                className="text-center mt-1 transition-all duration-300"
                style={{
                  fontSize: '0.55rem',
                  color: isActive ? info.colorLight : 'rgba(255,255,255,0.3)',
                  fontWeight: isActive ? 600 : 400,
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {name.slice(0, 2)}
              </div>

              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  className="bg-[#1a1a2e] border border-white/10 rounded px-1.5 py-0.5 whitespace-nowrap shadow-lg"
                  style={{ fontSize: '0.55rem' }}
                >
                  <span style={{ color: info.colorLight }}>{name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
