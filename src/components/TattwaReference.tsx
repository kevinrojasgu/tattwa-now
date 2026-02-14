import { useState } from 'react';
import { TATTWAS, TATTWA_ORDER, type TattwaName } from '../lib/tattwaData';
import { TattwaShape } from './TattwaShapes';

interface TattwaReferenceProps {
  currentTattwa?: TattwaName;
}

export function TattwaReference({ currentTattwa }: TattwaReferenceProps) {
  const [expandedTattwa, setExpandedTattwa] = useState<TattwaName | null>(null);

  const toggle = (name: TattwaName) => {
    setExpandedTattwa((prev) => (prev === name ? null : name));
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-4 sm:p-6">
      <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">
        Tattwa Reference
      </h3>

      <div className="space-y-2">
        {TATTWA_ORDER.map((name) => {
          const info = TATTWAS[name];
          const isExpanded = expandedTattwa === name;
          const isCurrent = currentTattwa === name;

          return (
            <div
              key={name}
              className="rounded-xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: isExpanded
                  ? `${info.colorHex}15`
                  : isCurrent
                    ? `${info.colorHex}10`
                    : 'rgba(255,255,255,0.03)',
                border: isCurrent ? `1px solid ${info.colorHex}40` : '1px solid transparent',
              }}
            >
              {/* Header - always visible */}
              <button
                onClick={() => toggle(name)}
                className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-white/5 transition-colors"
              >
                <div style={{ color: info.colorLight }}>
                  <TattwaShape tattwa={name} size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold"
                      style={{ color: info.colorLight }}
                    >
                      {name}
                    </span>
                    <span className="text-xs text-white/40">
                      {info.element}
                    </span>
                    {isCurrent && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${info.colorHex}30`,
                          color: info.colorLight,
                        }}
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">
                    {info.nature} &middot; {info.planet} &middot; {info.direction}
                  </div>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`text-white/30 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-3 sm:px-4 pb-4 space-y-3">
                  {/* Properties grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    <PropItem label="Color" value={info.color} />
                    <PropItem label="Shape" value={info.shape} />
                    <PropItem label="Planet" value={info.planet} />
                    <PropItem label="Direction" value={info.direction} />
                    <PropItem label="Sense" value={info.sense} />
                    <PropItem label="Taste" value={info.taste} />
                    <PropItem label="Mantra" value={info.mantra} />
                    <PropItem label="Symbol" value={info.symbol} />
                  </div>

                  {/* Description */}
                  <div className="text-sm text-white/60 leading-relaxed">
                    {info.description}
                  </div>

                  {/* Favorable / Unfavorable */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-green-400/70 mb-1.5">
                        Favorable for
                      </div>
                      <ul className="text-xs text-white/50 space-y-1">
                        {info.favorableFor.map((item, i) => (
                          <li key={i} className="flex gap-1.5">
                            <span className="text-green-400/50">+</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-red-400/70 mb-1.5">
                        Unfavorable for
                      </div>
                      <ul className="text-xs text-white/50 space-y-1">
                        {info.unfavorableFor.map((item, i) => (
                          <li key={i} className="flex gap-1.5">
                            <span className="text-red-400/50">-</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PropItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 rounded-lg px-2.5 py-1.5">
      <div className="text-white/35 text-xs">{label}</div>
      <div className="text-white/80 text-xs font-medium">{value}</div>
    </div>
  );
}
