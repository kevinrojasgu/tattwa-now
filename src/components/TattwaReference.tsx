import { useState, useRef, useEffect } from 'react';
import { TATTWAS, TATTWA_ORDER, type TattwaName } from '../lib/tattwaData';
import { TattwaShape } from './TattwaShapes';
import { useLanguage } from '../hooks/useLanguage';
import { translateValue, TATTWA_TEXT_ES } from '../lib/i18n';

interface TattwaReferenceProps {
  currentTattwa?: TattwaName;
}

function AnimatedExpand({ isExpanded, children }: { isExpanded: boolean; children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div
      className="overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        maxHeight: `${height}px`,
        opacity: isExpanded ? 1 : 0,
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}

export function TattwaReference({ currentTattwa }: TattwaReferenceProps) {
  const { t, lang } = useLanguage();
  const [expandedTattwa, setExpandedTattwa] = useState<TattwaName | null>(null);

  const toggle = (name: TattwaName) => {
    setExpandedTattwa((prev) => (prev === name ? null : name));
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-4 sm:p-6 glass-card">
      <h3 className="text-sm uppercase tracking-wider text-white/50 mb-4">
        {t.tattwaReference}
      </h3>

      <div className="space-y-2">
        {TATTWA_ORDER.map((name, index) => {
          const info = TATTWAS[name];
          const isExpanded = expandedTattwa === name;
          const isCurrent = currentTattwa === name;

          // Use Spanish text if available and language is ES
          const esText = lang === 'es' ? TATTWA_TEXT_ES[name] : null;
          const description = esText ? esText.description : info.description;
          const favorableFor = esText ? esText.favorableFor : info.favorableFor;
          const unfavorableFor = esText ? esText.unfavorableFor : info.unfavorableFor;

          const props = [
            { label: t.color, value: translateValue(info.color, lang) },
            { label: t.shape, value: translateValue(info.shape, lang) },
            { label: t.planet, value: translateValue(info.planet, lang) },
            { label: t.direction, value: translateValue(info.direction, lang) },
            { label: t.sense, value: translateValue(info.sense, lang) },
            { label: t.taste, value: translateValue(info.taste, lang) },
            { label: t.mantra, value: info.mantra },
            { label: t.symbol, value: info.symbol },
          ];

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
                animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
              }}
            >
              {/* Header - always visible */}
              <button
                onClick={() => toggle(name)}
                className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-white/5 transition-all duration-200 group"
              >
                <div
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ color: info.colorLight }}
                >
                  <TattwaShape tattwa={name} size={32} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-semibold transition-colors duration-300"
                      style={{ color: info.colorLight }}
                    >
                      {name}
                    </span>
                    <span className="text-xs text-white/40">
                      {translateValue(info.element, lang)}
                    </span>
                    {isCurrent && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${info.colorHex}30`,
                          color: info.colorLight,
                          animation: 'pulseGlow 2s ease-in-out infinite',
                        }}
                      >
                        {t.active}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">
                    {translateValue(info.nature, lang)} &middot; {translateValue(info.planet, lang)} &middot; {translateValue(info.direction, lang)}
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

              {/* Animated expanded content */}
              <AnimatedExpand isExpanded={isExpanded}>
                <div className="px-3 sm:px-4 pb-4 space-y-3">
                  {/* Properties grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    {props.map((prop, i) => (
                      <div
                        key={prop.label}
                        className="bg-white/5 rounded-lg px-2.5 py-1.5 transition-all duration-200 hover:bg-white/10"
                        style={{
                          animation: isExpanded ? `fadeInUp 0.2s ease-out ${i * 0.03}s both` : undefined,
                        }}
                      >
                        <div className="text-white/35 text-xs">{prop.label}</div>
                        <div className="text-white/80 text-xs font-medium">{prop.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-white/60 leading-relaxed">
                    {description}
                  </div>

                  {/* Favorable / Unfavorable */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-green-400/70 mb-1.5">
                        {t.favorableFor}
                      </div>
                      <ul className="text-xs text-white/50 space-y-1">
                        {favorableFor.map((item, i) => (
                          <li key={i} className="flex gap-1.5 transition-colors duration-200 hover:text-white/70">
                            <span className="text-green-400/50">+</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-red-400/70 mb-1.5">
                        {t.unfavorableFor}
                      </div>
                      <ul className="text-xs text-white/50 space-y-1">
                        {unfavorableFor.map((item, i) => (
                          <li key={i} className="flex gap-1.5 transition-colors duration-200 hover:text-white/70">
                            <span className="text-red-400/50">-</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedExpand>
            </div>
          );
        })}
      </div>
    </div>
  );
}
