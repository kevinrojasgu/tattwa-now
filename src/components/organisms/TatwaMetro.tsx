/**
 * @file TatwaMetro.tsx
 * @description Interactive SVG instrument replicating the Tatwametro from
 * Dr. Krumm-Heller's book. Shows a rotating inner disk with Tattwa color
 * segments, a pentagram with elemental point correspondences, a human figure,
 * and a fixed clock needle showing current time.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { TattwaState } from '../../types';
import { TATTWAS, TATTWA_ORDER } from '../../data/tattwaData';
import { useLanguage } from '../../controllers/useLanguage';
import type { TattwaName } from '../../types';

/** Props for TatwaMetro */
interface TatwaMetroProps {
  /** Current tattwa state from useTattwa controller */
  state: TattwaState;
  /** Today's or viewed date's sunrise time */
  sunrise: Date;
  /** The date/time being viewed (null = live) */
  viewedDate: Date | null;
  /**
   * Maximum pixel size of the SVG dial.
   * The SVG is always square and scales down on smaller containers.
   * @default 300
   */
  maxSize?: number;
}

// SVG dimensions
const CX = 150;
const CY = 150;

/**
 * Convert polar coordinates to Cartesian.
 *
 * @param angleDeg - Angle in degrees (0 = top, clockwise)
 * @param radius - Radius from center
 * @param cx - Center X
 * @param cy - Center Y
 * @returns { x, y } Cartesian coordinates
 */
function polarToCartesian(
  angleDeg: number,
  radius: number,
  cx: number = CX,
  cy: number = CY
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

/**
 * Build an SVG arc path for an annular segment.
 *
 * @param startDeg - Start angle in degrees
 * @param endDeg - End angle in degrees
 * @param innerR - Inner radius
 * @param outerR - Outer radius
 * @returns SVG path d attribute string
 */
function arcPath(startDeg: number, endDeg: number, innerR: number, outerR: number): string {
  const s1 = polarToCartesian(startDeg, outerR);
  const e1 = polarToCartesian(endDeg, outerR);
  const s2 = polarToCartesian(endDeg, innerR);
  const e2 = polarToCartesian(startDeg, innerR);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${e2.x} ${e2.y}`,
    'Z',
  ].join(' ');
}

/**
 * Build the pentagram path connecting every other of 5 points.
 * Points at r=65, starting from top (−90°), clockwise at 72° intervals.
 * Star order: P0→P2→P4→P1→P3→P0
 *
 * @returns SVG path d attribute string for the pentagram star
 */
function buildPentagramPath(): string {
  const starOrder = [0, 2, 4, 1, 3, 0];
  const pts = starOrder.map((i) => polarToCartesian(i * 72, 65));
  return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ');
}

/**
 * Compute the disk rotation angle from the sunrise offset.
 * The disk should show midnight at top when sunrise = 0, rotating
 * one full revolution per 12-hour clock.
 *
 * @param sunriseDate - Sunrise Date for the viewed day
 * @returns Rotation degrees for the inner disk group
 */
function diskRotationDeg(sunriseDate: Date): number {
  const sunriseHours =
    sunriseDate.getHours() + sunriseDate.getMinutes() / 60 + sunriseDate.getSeconds() / 3600;
  return (sunriseHours / 12) * 360;
}

/**
 * Compute the needle rotation from the current time of day.
 *
 * @param now - The current Date
 * @returns Rotation degrees for the clock needle
 */
function needleRotationDeg(now: Date): number {
  const h = now.getHours() % 12 + now.getMinutes() / 60 + now.getSeconds() / 3600;
  return (h / 12) * 360;
}

/**
 * The Tatwa Meter — an SVG dial instrument showing the rotating
 * five-tattwa color wheel, pentagram, human figure, and clock needle.
 *
 * @param state - Current TattwaState
 * @param sunrise - Sunrise Date for disk alignment
 * @param viewedDate - Viewed date/time (null = live)
 */
export function TatwaMetro({ state, sunrise, viewedDate, maxSize = 300 }: TatwaMetroProps): React.JSX.Element {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const isFullPage = pathname === '/tattwameter';

  /** Raw 0–360 degree value from the previous tick, used to detect wrap-arounds */
  const prevRawDegRef = useRef<number>(needleRotationDeg(viewedDate ?? new Date()));
  /** Monotonically increasing cumulative degrees so the needle never rotates backwards */
  const cumulativeDegRef = useRef<number>(prevRawDegRef.current);

  const [nowDeg, setNowDeg] = useState<number>(cumulativeDegRef.current);
  /** Tracks the live clock time for label display when in live mode */
  const [liveTime, setLiveTime] = useState<Date>(() => new Date());
  const [hoveredSegment, setHoveredSegment] = useState<{ name: TattwaName; start: Date; end: Date } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Live needle tick — also keeps liveTime in sync for the label
  useEffect(() => {
    if (viewedDate) {
      // Explicit time-travel: jump directly (no continuity needed)
      const raw = needleRotationDeg(viewedDate);
      prevRawDegRef.current = raw;
      cumulativeDegRef.current = raw;
      setNowDeg(raw);
      return;
    }
    const tick = (): void => {
      const now = new Date();
      const raw = needleRotationDeg(now);
      const diff = raw - prevRawDegRef.current;
      // A large negative diff means we crossed a 12-hour boundary — keep moving forward
      cumulativeDegRef.current += diff < -180 ? diff + 360 : diff;
      prevRawDegRef.current = raw;
      setNowDeg(cumulativeDegRef.current);
      setLiveTime(now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [viewedDate]);

  /** The date/time currently represented by the needle */
  const displayTime = viewedDate ?? liveTime;

  const diskDeg = diskRotationDeg(sunrise);
  const activeTattwaInfo = TATTWAS[state.tattwa];

  // Build 30 color segments (6 full cycles × 5 tattwas, each 12°)
  const segments: Array<{ tattwa: TattwaName; segIndex: number; startDeg: number; endDeg: number }> = [];
  for (let i = 0; i < 30; i++) {
    const tattwaName = TATTWA_ORDER[i % 5] as TattwaName;
    segments.push({
      tattwa: tattwaName,
      segIndex: i,
      startDeg: i * 12,
      endDeg: (i + 1) * 12,
    });
  }

  // Pentagram point labels and element assignments
  const pentaLabels: Array<{ label: string; tattwa: TattwaName; angle: number }> = [
    { label: 'Ak', tattwa: 'Akash', angle: 0 },
    { label: 'Va', tattwa: 'Vayu', angle: 72 },
    { label: 'Te', tattwa: 'Tejas', angle: 144 },
    { label: 'Pr', tattwa: 'Prithvi', angle: 216 },
    { label: 'Ap', tattwa: 'Apas', angle: 288 },
  ];

  // Time window for a segment (each segment = 24 min / 5 = 4.8 min? No: each 12° = 24 min on 12h clock)
  // 12° of 360° = 12/360 * 12h = 0.4h = 24 min. Each segment IS one Tattwa period.
  function segmentTimeWindow(segIndex: number): { start: Date; end: Date } {
    const startMs = sunrise.getTime() + segIndex * 24 * 60 * 1000;
    return { start: new Date(startMs), end: new Date(startMs + 24 * 60 * 1000) };
  }

  function formatTimeShort(d: Date): string {
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm p-4 sm:p-6 glass-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm uppercase tracking-wider text-white/50">{t.tatwaMetro}</h3>
        {!isFullPage && (
          <Link
            to="/tattwameter"
            className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95"
            title={t.fullView}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 1h4v4M5 7 11 1M1 5v6h6" />
            </svg>
            {t.fullView}
          </Link>
        )}
      </div>

      <div className="flex justify-center">
        <div className="relative" style={{ width: '100%', maxWidth: maxSize }}>
          <svg
            viewBox="0 0 300 300"
            width="100%"
            style={{ display: 'block', overflow: 'visible' }}
          >
            <defs>
              <filter id="metro-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="metro-seg-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ── Layer 1: Outer clock ring (FIXED) ── */}
            {/* Clock band fill */}
            <circle cx={CX} cy={CY} r={145} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            <circle cx={CX} cy={CY} r={125} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Tick marks */}
            {[...Array(60)].map((_, i) => {
              const isHour = i % 5 === 0;
              const outer = 145;
              const inner = isHour ? outer - 8 : outer - 3;
              const p1 = polarToCartesian(i * 6, outer);
              const p2 = polarToCartesian(i * 6, inner);
              return (
                <line
                  key={i}
                  x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={isHour ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={isHour ? 1.5 : 0.8}
                />
              );
            })}

            {/* Hour numbers */}
            {[...Array(12)].map((_, i) => {
              const hour = i === 0 ? 12 : i;
              const p = polarToCartesian(i * 30, 136);
              return (
                <text
                  key={i}
                  x={p.x} y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(255,255,255,0.4)"
                  fontSize="8"
                  fontFamily="sans-serif"
                >
                  {hour}
                </text>
              );
            })}

            {/* ── Layer 2: Inner disk (ROTATES) ── */}
            <g
              style={{
                transform: `rotate(${diskDeg}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
                transition: 'transform 0.6s ease-out',
              }}
            >
              {/* Tattwa color segments */}
              {segments.map((seg) => {
                const info = TATTWAS[seg.tattwa];
                const isActiveSeg =
                  seg.tattwa === state.tattwa &&
                  // Rough check: active segment based on tattwaIndex matching cycle position
                  seg.segIndex % 5 === state.tattwaIndex;
                const tw = segmentTimeWindow(seg.segIndex);
                return (
                  <g key={seg.segIndex}>
                    <path
                      d={arcPath(seg.startDeg, seg.endDeg, 90, 123)}
                      fill={info.colorHex}
                      fillOpacity={isActiveSeg ? 1 : 0.5}
                      stroke="rgba(0,0,0,0.3)"
                      strokeWidth="0.5"
                      filter={isActiveSeg ? 'url(#metro-seg-glow)' : undefined}
                      onMouseEnter={(e) => {
                        setHoveredSegment({ name: seg.tattwa, ...tw });
                        setTooltipPos({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => setHoveredSegment(null)}
                      style={{ cursor: 'default', transition: 'fill-opacity 0.3s ease' }}
                    />
                    {/* Tattwa initial letter in segment */}
                    {(() => {
                      const mid = (seg.startDeg + seg.endDeg) / 2;
                      const p = polarToCartesian(mid, 107);
                      return (
                        <text
                          x={p.x} y={p.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="rgba(255,255,255,0.7)"
                          fontSize="5"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                        >
                          {seg.tattwa[0]}
                        </text>
                      );
                    })()}
                  </g>
                );
              })}

              {/* Dark ring between segments and pentagram area */}
              <circle cx={CX} cy={CY} r={90} fill="rgba(10,10,26,0.85)" />

              {/* Pentagram star lines */}
              <path
                d={buildPentagramPath()}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.8"
              />

              {/* Pentagram point circles */}
              {pentaLabels.map(({ tattwa: ptTattwa, angle }) => {
                const info = TATTWAS[ptTattwa];
                const p = polarToCartesian(angle, 65);
                const isActive = ptTattwa === state.tattwa;
                return (
                  <circle
                    key={ptTattwa}
                    cx={p.x} cy={p.y}
                    r={isActive ? 6 : 4}
                    fill={info.colorHex}
                    fillOpacity={isActive ? 1 : 0.5}
                    stroke={info.colorLight}
                    strokeWidth={isActive ? 1.5 : 0.5}
                    filter={isActive ? 'url(#metro-glow)' : undefined}
                    style={{ transition: 'all 0.5s ease' }}
                  />
                );
              })}

              {/* Human figure — body */}
              {/* Head at P0 (top, angle 0 = r65 from center, after adjustment to r=65 from CY=150) */}
              <circle cx={CX} cy={CY - 65} r="8" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              {/* Body */}
              <line x1={CX} y1={CY - 57} x2={CX} y2={CY - 20} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              {/* Left arm to P4 (angle 288) */}
              {(() => {
                const p4 = polarToCartesian(288, 65);
                return <line x1={CX} y1={CY - 40} x2={p4.x} y2={p4.y} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />;
              })()}
              {/* Right arm to P1 (angle 72) */}
              {(() => {
                const p1 = polarToCartesian(72, 65);
                return <line x1={CX} y1={CY - 40} x2={p1.x} y2={p1.y} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />;
              })()}
              {/* Left leg to P3 (angle 216) */}
              {(() => {
                const p3 = polarToCartesian(216, 65);
                return <line x1={CX} y1={CY - 20} x2={p3.x} y2={p3.y} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />;
              })()}
              {/* Right leg to P2 (angle 144) */}
              {(() => {
                const p2 = polarToCartesian(144, 65);
                return <line x1={CX} y1={CY - 20} x2={p2.x} y2={p2.y} stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />;
              })()}

              {/* TATWAMETRO text */}
              <text
                x={CX} y={CY + 82}
                textAnchor="middle"
                fill="rgba(255,255,255,0.2)"
                fontSize="5"
                fontFamily="serif"
                letterSpacing="1"
              >
                TATWAMETRO
              </text>
            </g>

            {/* ── Layer 3: Now needle (FIXED to viewport) ── */}
            <g
              style={{
                transform: `rotate(${nowDeg}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
                transition: 'transform 0.5s ease',
              }}
            >
              {/* Main needle */}
              <line
                x1={CX} y1={CY}
                x2={CX} y2={CY - 122}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Tip dot */}
              <circle cx={CX} cy={CY - 122} r="2.5" fill="rgba(255,255,255,0.9)" />
              {/* Counterweight */}
              <line
                x1={CX} y1={CY}
                x2={CX} y2={CY + 30}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>

            {/* ── Layer 4: Center hub ── */}
            <circle
              cx={CX} cy={CY}
              r={5}
              fill={activeTattwaInfo.colorLight}
              style={{ transition: 'fill 1s ease' }}
              filter="url(#metro-glow)"
            />
          </svg>

          {/* Tooltip */}
          {hoveredSegment && (
            <div
              className="fixed pointer-events-none z-50 px-2 py-1 rounded-lg text-xs bg-[#1a1a2e] border border-white/15 shadow-xl whitespace-nowrap"
              style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 30 }}
            >
              <span style={{ color: TATTWAS[hoveredSegment.name].colorLight }}>
                {hoveredSegment.name}
              </span>
              <span className="text-white/50 ml-2">
                {formatTimeShort(hoveredSegment.start)} – {formatTimeShort(hoveredSegment.end)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Active tattwa + current datetime label — matches the datetime picker value */}
      <div className="mt-3 text-center text-xs text-white/40">
        <span style={{ color: activeTattwaInfo.colorLight }}>{state.tattwa}</span>
        <span className="text-white/30 mx-2">·</span>
        <span className="font-mono tabular-nums">
          {displayTime.toLocaleDateString([], {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
          {' · '}
          {displayTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
        </span>
      </div>
    </div>
  );
}
