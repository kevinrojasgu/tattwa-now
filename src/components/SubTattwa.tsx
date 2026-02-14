import type { TattwaName } from '../lib/tattwaData';
import { TATTWAS, TATTWA_ORDER } from '../lib/tattwaData';

interface SubTattwaProps {
  mainTattwa: TattwaName;
  subTattwa: TattwaName;
  subTattwaIndex: number;
  subProgress: number;
}

export function SubTattwa({
  mainTattwa,
  subTattwa,
  subTattwaIndex,
  subProgress,
}: SubTattwaProps) {
  const subInfo = TATTWAS[subTattwa];

  return (
    <div className="mt-4">
      <div className="text-xs uppercase tracking-wider text-white/50 mb-2">
        Sub-Tattwa
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-white/90">
          {mainTattwa}-{subTattwa}
        </span>
        <span className="text-xs text-white/50">
          ({subInfo.element})
        </span>
      </div>
      {/* Sub-tattwa progress dots */}
      <div className="flex gap-1.5">
        {TATTWA_ORDER.map((t, i) => {
          const info = TATTWAS[t];
          const isActive = i === subTattwaIndex;
          const isPast = i < subTattwaIndex;
          return (
            <div key={t} className="flex-1 relative">
              <div
                className="h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: isPast || isActive
                    ? `${info.colorHex}40`
                    : 'rgba(255,255,255,0.1)',
                }}
              >
                {isActive && (
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${subProgress * 100}%`,
                      backgroundColor: info.colorHex,
                    }}
                  />
                )}
                {isPast && (
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '100%',
                      backgroundColor: info.colorHex,
                    }}
                  />
                )}
              </div>
              <div
                className="text-center mt-1 transition-all duration-300"
                style={{
                  fontSize: '0.55rem',
                  color: isActive ? info.colorLight : 'rgba(255,255,255,0.3)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {t.slice(0, 2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
