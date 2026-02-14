import { useMemo } from 'react';
import { getDayTimeline } from '../lib/tattwas';
import { TATTWAS } from '../lib/tattwaData';
import { formatTime } from '../lib/sunrise';

interface TimelineProps {
  now: Date;
  lat: number;
  lng: number;
}

export function Timeline({ now, lat, lng }: TimelineProps) {
  const entries = useMemo(() => getDayTimeline(now, lat, lng), [now, lat, lng]);

  // Show 12 hours of entries (30 tattwa periods = 6 full cycles)
  const visibleEntries = entries.slice(0, 30);

  // Find the index of the current period
  const currentIndex = visibleEntries.findIndex((e) => e.isCurrent);

  // We'll show a window around the current period
  // On mobile, show fewer; on desktop show more
  const windowSize = 15;
  const halfWindow = Math.floor(windowSize / 2);
  const startIdx = Math.max(0, currentIndex - halfWindow);
  const displayEntries = visibleEntries.slice(startIdx, startIdx + windowSize);

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-4 sm:p-6">
      <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">
        Daily Timeline
      </h3>

      {/* Horizontal scrolling timeline */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-0.5 min-w-max">
          {displayEntries.map((entry, i) => {
            const info = TATTWAS[entry.tattwa];
            const isCurrent = entry.isCurrent;
            const isPast = entry.end.getTime() < now.getTime();

            return (
              <div
                key={startIdx + i}
                className="flex flex-col items-center group relative"
                style={{ minWidth: isCurrent ? '60px' : '40px' }}
              >
                {/* Time label - only for first of each cycle or current */}
                {((startIdx + i) % 5 === 0 || isCurrent) && (
                  <div
                    className="text-white/50 mb-1 whitespace-nowrap"
                    style={{
                      fontSize: '0.6rem',
                      color: isCurrent ? info.colorLight : undefined,
                      fontWeight: isCurrent ? 600 : 400,
                    }}
                  >
                    {formatTime(entry.start)}
                  </div>
                )}
                {!((startIdx + i) % 5 === 0 || isCurrent) && (
                  <div className="mb-1" style={{ fontSize: '0.6rem' }}>
                    &nbsp;
                  </div>
                )}

                {/* Bar */}
                <div
                  className="rounded-sm transition-all duration-300 relative"
                  style={{
                    height: isCurrent ? '32px' : '20px',
                    width: '100%',
                    backgroundColor: isPast
                      ? `${info.colorHex}30`
                      : isCurrent
                        ? info.colorHex
                        : `${info.colorHex}60`,
                    boxShadow: isCurrent
                      ? `0 0 12px ${info.colorHex}60`
                      : 'none',
                  }}
                >
                  {/* Current indicator pulse */}
                  {isCurrent && (
                    <div
                      className="absolute inset-0 rounded-sm animate-pulse"
                      style={{
                        backgroundColor: `${info.colorLight}20`,
                      }}
                    />
                  )}
                </div>

                {/* Tattwa initial */}
                <div
                  className="mt-1 font-medium"
                  style={{
                    fontSize: '0.55rem',
                    color: isCurrent ? info.colorLight : isPast ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {entry.tattwa.slice(0, 2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {(['Akash', 'Vayu', 'Tejas', 'Prithvi', 'Apas'] as const).map((name) => {
          const info = TATTWAS[name];
          return (
            <div key={name} className="flex items-center gap-1.5 text-xs text-white/60">
              <div
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: info.colorHex }}
              />
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
