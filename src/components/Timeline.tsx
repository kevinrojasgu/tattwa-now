import { useMemo, useRef, useEffect } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentIndex = entries.findIndex((e) => e.isCurrent);

  useEffect(() => {
    if (scrollRef.current) {
      const currentEl = scrollRef.current.querySelector('[data-current="true"]');
      if (currentEl) {
        currentEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentIndex]);

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-4 sm:p-6 glass-card">
      <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">
        Daily Timeline
      </h3>

      {/* Horizontal scrolling timeline */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 height-[300px]" ref={scrollRef}>
        <div className="h-5"> </div>
        <div className="flex gap-0.5 min-w-max">
          {(() => {
            // Find index of first tattwa *after midnight* (start of day)
            const dayStart = new Date(now);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(now);
            dayEnd.setHours(23, 59, 59, 999);

            // Find in all entries the ones that "touch" today
            // But we want one tattwa *before* and one *after* that window as well
            let firstIdx = entries.findIndex(e => e.end > dayStart);
            if (firstIdx === -1) firstIdx = 0;
            else firstIdx = Math.max(0, firstIdx - 1);

            let lastIdx = entries.findIndex(e => e.start > dayEnd);
            if (lastIdx === -1) lastIdx = entries.length - 1;
            else lastIdx = Math.min(entries.length - 1, lastIdx + 0);

            // To include one after, add 1 to lastIdx if possible
            if (lastIdx < entries.length - 1) lastIdx = lastIdx + 1;

            const timelineWindow = entries.slice(firstIdx, lastIdx + 1);

            return timelineWindow.map((entry, i) => {
              // Use the current period search relative to this slice
              const info = TATTWAS[entry.tattwa];
              const isCurrent = entry.isCurrent;
              const isPast = entry.end.getTime() < now.getTime();

              // Find index in parent array for proper key and labels
              const absIdx = firstIdx + i;

              return (
                <div
                  key={absIdx}
                  data-current={isCurrent ? 'true' : undefined}
                  className="flex flex-col items-center group relative cursor-default"
                  style={{
                    minWidth: isCurrent ? '60px' : '40px',
                    animation: `fadeInUp 0.3s ease-out ${i * 0.03}s both`,
                  }}
                >
                  {/* Time label */}
                  {(absIdx % 5 === 0 || isCurrent) && (
                    <div
                      className="mb-1 whitespace-nowrap transition-colors duration-300"
                      style={{
                        fontSize: '0.6rem',
                        color: isCurrent ? info.colorLight : 'rgba(255,255,255,0.5)',
                        fontWeight: isCurrent ? 600 : 400,
                        textShadow: isCurrent ? `0 0 4px ${info.colorHex}` : undefined,
                      }}
                    >
                      {formatTime(entry.start)}
                    </div>
                  )}
                  {!((absIdx % 5 === 0) || isCurrent) && (
                    <div className="mb-1" style={{ fontSize: '0.6rem' }}>
                      &nbsp;
                    </div>
                  )}

                  {/* Bar with hover effect */}
                  <div
                    className="rounded-sm relative transition-all duration-300 group-hover:brightness-125"
                    style={{
                      height: isCurrent ? '40px' : '32px',
                      width: '100%',
                      backgroundColor: isPast
                        ? `${info.colorHex}30`
                        : isCurrent
                          ? info.colorHex
                          : `${info.colorHex}60`,
                      boxShadow: isCurrent
                        ? `0 0 12px ${info.colorHex}60, 0 0 32px ${info.colorHex}30`
                        : 'none',
                    }}
                  >
                    {isCurrent && (
                      <div
                        className="absolute inset-0 rounded-sm"
                        style={{
                          backgroundColor: `${info.colorLight}20`,
                          animation: 'pulseGlow 2s ease-in-out infinite',
                        }}
                      />
                    )}

                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-[#1a1a2e] z-10 border border-white/10 rounded-lg px-2 py-1 whitespace-nowrap text-xs shadow-xl">
                        <span style={{ color: info.colorLight }}>{entry.tattwa}</span>
                        <span className="text-white/40 ml-1">{formatTime(entry.start)}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-1 font-medium transition-colors duration-300"
                    style={{
                      fontSize: '0.55rem',
                      color: isCurrent ? info.colorLight : isPast ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {entry.tattwa.slice(0, 2)}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Legend with hover effects */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {(['Akash', 'Vayu', 'Tejas', 'Prithvi', 'Apas'] as const).map((name) => {
          const info = TATTWAS[name];
          return (
            <div
              key={name}
              className="flex items-center gap-1.5 text-xs text-white/60 transition-all duration-200 hover:text-white/90 cursor-default"
            >
              <div
                className="w-2.5 h-2.5 rounded-sm transition-transform duration-200 hover:scale-125"
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
