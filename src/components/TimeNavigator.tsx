import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getSunTimes } from '../lib/sunrise';

interface TimeNavigatorProps {
  /** null = live mode, Date = time-travel */
  viewedDate: Date | null;
  onGoLive: () => void;
  onDateChange: (date: Date) => void;
  /** Controlled open state for the date picker panel — managed by parent */
  isPickerOpen: boolean;
  onPickerOpenChange: (open: boolean) => void;
  lat: number;
  lng: number;
}

/**
 * Formats a Date into an HTML datetime-local input value (YYYY-MM-DDTHH:mm).
 */
function toDatetimeLocal(d: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function TimeNavigator({ viewedDate, onGoLive, onDateChange, isPickerOpen, onPickerOpenChange, lat, lng }: TimeNavigatorProps) {
  const { t } = useLanguage();
  const isLive = viewedDate === null;
  const [liveTime, setLiveTime] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep a ticking clock for the live display
  useEffect(() => {
    if (!isLive) return;
    const id = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(id);
  }, [isLive]);

  const displayDate = isLive ? liveTime : viewedDate;

  function formatDisplayDate(d: Date): string {
    return (
      d.toLocaleDateString(t.dateLocale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) +
      ' · ' +
      d.toLocaleTimeString(t.dateLocale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    );
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val) {
      onDateChange(new Date(val));
    }
  }

  function handleGoLive() {
    onGoLive();
    onPickerOpenChange(false);
  }

  const presets = [
    { label: t.yesterdaySunrise, type: 'yesterday' as const },
    { label: t.tomorrowSunrise, type: 'tomorrow' as const },
  ];

  return (
    <div className="animate-fade-in-up stagger-2">
      <div className="rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden glass-card">
        {/* Main bar */}
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Live indicator / Time-travel badge */}
          {isLive ? (
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative flex items-center justify-center w-5 h-5">
                <div className="absolute w-2.5 h-2.5 rounded-full bg-green-400 animate-breathe" />
                <div className="absolute w-5 h-5 rounded-full bg-green-400/20" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-green-400/80">
                {t.live}
              </span>
            </div>
          ) : (
            <button
              onClick={handleGoLive}
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="relative flex items-center justify-center w-5 h-5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60 group-hover:bg-green-400 transition-colors duration-300" />
                <div className="absolute w-5 h-5 rounded-full bg-amber-400/10 group-hover:bg-green-400/20 transition-colors duration-300" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-amber-400/80 group-hover:text-green-400/80 transition-colors duration-300">
                {t.viewingPast}
              </span>
            </button>
          )}

          {/* Current datetime display */}
          <div className="flex-1 text-center">
            <span className="text-sm text-white/70 font-mono tabular-nums">
              {formatDisplayDate(displayDate)}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Go to Now button */}
            {!isLive && (
              <button
                onClick={handleGoLive}
                className="now-button flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 active:scale-95"
                title="Return to current time"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {t.now}
              </button>
            )}

            {/* Date picker toggle */}
            <button
              onClick={() => onPickerOpenChange(!isPickerOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 active:scale-95 ${isPickerOpen
                  ? 'bg-white/15 text-white/90'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}
              title="Pick a date & time"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {isPickerOpen ? t.close : t.pickDate}
            </button>
          </div>
        </div>

        {/* Time-travel banner */}
        {!isLive && (
          <div className="time-travel-banner px-4 py-2 flex items-center justify-center gap-2 text-xs border-t border-white/5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400/60">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-amber-400/60">
              {t.viewingTattwaFor} {formatDisplayDate(viewedDate!)}
            </span>
            <button
              onClick={handleGoLive}
              className="ml-1 text-green-400/70 hover:text-green-400 transition-colors duration-200 underline underline-offset-2"
            >
              {t.returnToNow}
            </button>
          </div>
        )}

        {/* Date/time picker panel */}
        {isPickerOpen && (
          <div className="px-4 pb-4 pt-2 border-t border-white/5 animate-slide-down">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
              {/* Native datetime-local input, styled */}
              <div className="flex-1">
                <label className="text-xs text-white/40 uppercase tracking-wider mb-1.5 block">
                  {t.selectDateTime}
                </label>
                <div className="relative w-full px-3 py-2.5 text-sm bg-white/5 text-white/90 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200 font-mono tabular-nums cursor-pointer">
                  {formatDisplayDate(displayDate)}
                  <input
                    ref={inputRef}
                    type="datetime-local"
                    className="datepicker-input"
                    value={toDatetimeLocal(displayDate)}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Quick presets */}
              <div className="flex gap-1.5 flex-wrap sm:flex-nowrap">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      const d = new Date();
                      if (preset.type === 'yesterday') {
                        d.setDate(d.getDate() - 1);
                      } else {
                        d.setDate(d.getDate() + 1);
                      }
                      const sun = getSunTimes(d, lat, lng);
                      onDateChange(sun.sunrise);
                    }}
                    className="px-3 py-2.5 rounded-lg text-xs bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 transition-all duration-200 active:scale-95 whitespace-nowrap"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fine-tune: step forward/back by 24 min (one Tattwa period) */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-xs text-white/30">{t.stepByPeriod}</span>
              {[
                { label: '−24m', minutes: -24 },
                { label: '−5m', minutes: -5 },
                { label: '+5m', minutes: 5 },
                { label: '+24m', minutes: 24 },
              ].map((step) => (
                <button
                  key={step.label}
                  onClick={() => {
                    const base = viewedDate || new Date();
                    const d = new Date(base.getTime() + step.minutes * 60 * 1000);
                    onDateChange(d);
                  }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 transition-all duration-200 active:scale-95"
                >
                  {step.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
