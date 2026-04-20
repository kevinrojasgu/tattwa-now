/**
 * @file TattwaMetro.tsx
 * @description Interactive SVG instrument replicating the Tattwametro from
 * Dr. Krumm-Heller's book. Shows a rotating inner disk with Tattwa color
 * segments, a pentagram with elemental point correspondences, a human figure,
 * and a draggable clock needle showing current time.
 *
 * Three-layer 3D effect:
 *   Layer 1 — outer clock ring (base), surrounded by a tattwa-colored aura
 *   Layer 2 — colorful Tattwa segments ring, elevated above Layer 1
 *   Layer 3 — inner dark disk with pentagram, elevated highest
 *
 * The needle is draggable: users drag it to any hour position while the
 * AM/PM half of the day is always preserved.
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import type { TattwaState } from '../../types';
import { TATTWAS, TATTWA_ORDER } from '../../data/tattwaData';
import { useLanguage } from '../../controllers/useLanguage';
import type { TattwaName } from '../../types';

/** Props for TattwaMetro */
interface TattwaMetroProps {
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
  /**
   * Called when the user drags the needle to a new hour position.
   * Receives the new Date with hour/minute updated, AM/PM preserved.
   */
  onTimeChange?: (newTime: Date) => void;
}

// SVG viewport center
const CX = 150;
const CY = 150;

/**
 * Convert polar coordinates (angle from top, clockwise) to Cartesian.
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
 * Build the pentagram path. Star order: P0→P2→P4→P1→P3→P0
 */
function buildPentagramPath(): string {
  const starOrder = [0, 2, 4, 1, 3, 0];
  const pts = starOrder.map((i) => polarToCartesian(i * 72, 65));
  return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ');
}

/**
 * Compute disk rotation angle from sunrise time.
 */
function diskRotationDeg(sunriseDate: Date): number {
  const sunriseHours =
    sunriseDate.getHours() + sunriseDate.getMinutes() / 60 + sunriseDate.getSeconds() / 3600;
  return (sunriseHours / 12) * 360;
}

/**
 * Compute needle rotation from a Date (12-hour clock, 0° = top).
 */
function needleRotationDeg(now: Date): number {
  const h = now.getHours() % 12 + now.getMinutes() / 60 + now.getSeconds() / 3600;
  return (h / 12) * 360;
}

/**
 * Convert client (screen) pointer coordinates to SVG local coordinates.
 */
function clientToSvgCoords(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number
): { x: number; y: number } | null {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const svgPt = pt.matrixTransform(ctm.inverse());
  return { x: svgPt.x, y: svgPt.y };
}

/**
 * Compute the clockwise angle from the top (12 o'clock = 0°)
 * given a pointer position in SVG coordinates.
 */
function pointerAngle(svgX: number, svgY: number): number {
  const dx = svgX - CX;
  const dy = svgY - CY;
  return ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
}

/**
 * Derive a new Date from a dial angle, preserving the reference time's AM/PM.
 *
 * "12" on the dial maps to noon (PM) or midnight (AM) based on the reference.
 */
function angleToTime(angleDeg: number, reference: Date): Date {
  const fractionalHour12 = (angleDeg / 360) * 12;
  const isPM = reference.getHours() >= 12;
  const hourBase = Math.floor(fractionalHour12);
  // "12" position → noon (PM) or midnight (AM)
  const newHour24 = hourBase === 0 ? (isPM ? 12 : 0) : hourBase + (isPM ? 12 : 0);
  const newMinute = Math.round((fractionalHour12 % 1) * 60) % 60;
  const newDate = new Date(reference);
  newDate.setHours(newHour24, newMinute, 0, 0);
  return newDate;
}

/**
 * The Tattwa Meter — SVG dial with 3D layering and a draggable time needle.
 */
export function TattwaMetro({
  state,
  sunrise,
  viewedDate,
  maxSize = 300,
  onTimeChange,
}: TattwaMetroProps): React.JSX.Element {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const isFullPage = pathname === '/tattwameter';

  /** Drag is only enabled when a time-change callback is provided. */
  const isDraggable = Boolean(onTimeChange);

  // ── Needle position state ──────────────────────────────────────────────────
  const prevRawDegRef = useRef<number>(needleRotationDeg(viewedDate ?? new Date()));
  const cumulativeDegRef = useRef<number>(prevRawDegRef.current);
  const [nowDeg, setNowDeg] = useState<number>(cumulativeDegRef.current);
  const [liveTime, setLiveTime] = useState<Date>(() => new Date());

  // ── Tooltip state ──────────────────────────────────────────────────────────
  const [hoveredSegment, setHoveredSegment] = useState<{
    name: TattwaName;
    start: Date;
    end: Date;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // ── Drag state ─────────────────────────────────────────────────────────────
  /** ref so drag handlers can read the flag without closing over stale state */
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  /**
   * Kept in sync with the displayed time on every render (non-drag path).
   * During drag, updated by the move handler to track the current drag position
   * so the isPM check remains consistent across consecutive move events.
   */
  const displayTimeRef = useRef<Date>(viewedDate ?? new Date());

  /** Always points to the latest callback so drag handlers never go stale. */
  const onTimeChangeRef = useRef(onTimeChange);
  onTimeChangeRef.current = onTimeChange;

  // ── Live needle tick (paused during drag) ──────────────────────────────────
  useEffect(() => {
    if (isDragging) return;

    if (viewedDate) {
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
      // Large negative diff → 12-hour wrap; keep advancing forward
      cumulativeDegRef.current += diff < -180 ? diff + 360 : diff;
      prevRawDegRef.current = raw;
      setNowDeg(cumulativeDegRef.current);
      setLiveTime(now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [viewedDate, isDragging]);

  // ── Global pointer handlers during drag ────────────────────────────────────
  useEffect(() => {
    if (!isDragging) return;

    function handleMove(e: PointerEvent): void {
      if (!svgRef.current) return;
      const coords = clientToSvgCoords(svgRef.current, e.clientX, e.clientY);
      if (!coords) return;

      const angleDeg = pointerAngle(coords.x, coords.y);
      setNowDeg(angleDeg);

      // Compute new time, keep reference updated so isPM stays consistent
      const newDate = angleToTime(angleDeg, displayTimeRef.current);
      displayTimeRef.current = newDate;
      onTimeChangeRef.current?.(newDate);
    }

    function handleUp(): void {
      isDraggingRef.current = false;
      setIsDragging(false);
    }

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  }, [isDragging]);

  // Keep displayTimeRef in sync on non-drag renders
  const displayTime = viewedDate ?? liveTime;
  if (!isDragging) {
    displayTimeRef.current = displayTime;
  }

  // ── Needle pointer-down ────────────────────────────────────────────────────
  function handleNeedlePointerDown(e: React.PointerEvent): void {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
  }

  // ── Derived SVG values ─────────────────────────────────────────────────────
  const diskDeg = diskRotationDeg(sunrise);
  const activeTattwaInfo = TATTWAS[state.tattwa];

  // 30 color segments (6 cycles × 5 tattwas, each 12°)
  const segments: Array<{
    tattwa: TattwaName;
    segIndex: number;
    startDeg: number;
    endDeg: number;
  }> = [];
  for (let i = 0; i < 30; i++) {
    const tattwaName = TATTWA_ORDER[i % 5] as TattwaName;
    segments.push({ tattwa: tattwaName, segIndex: i, startDeg: i * 12, endDeg: (i + 1) * 12 });
  }

  const pentaLabels: Array<{ label: string; tattwa: TattwaName; angle: number }> = [
    { label: 'Ak', tattwa: 'Akash', angle: 0 },
    { label: 'Va', tattwa: 'Vayu', angle: 72 },
    { label: 'Te', tattwa: 'Tejas', angle: 144 },
    { label: 'Pr', tattwa: 'Prithvi', angle: 216 },
    { label: 'Ap', tattwa: 'Apas', angle: 288 },
  ];

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
        <h3 className="text-sm uppercase tracking-wider text-white/50">{t.tattwaMetro}</h3>
        {!isFullPage && (
          <Link
            to="/tattwameter"
            className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95"
            title={t.fullView}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 1h4v4M5 7 11 1M1 5v6h6" />
            </svg>
            {t.fullView}
          </Link>
        )}
      </div>

      <div className="flex justify-center">
        <div className="relative" style={{ width: '100%', maxWidth: maxSize }}>
          <svg
            ref={svgRef}
            viewBox="0 0 300 300"
            width="100%"
            style={{
              display: 'block',
              overflow: 'visible',
              cursor: isDraggable && isDragging ? 'grabbing' : 'default',
            }}
          >
            <defs>
              {/* Existing hub / active-segment glow */}
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

              {/* ── 3D: Tattwa aura for outer ring (Layer 1) ── */}
              <filter id="metro-aura" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="10" />
              </filter>

              {/* ── 3D: Elevation shadow for color ring (Layer 2) ── */}
              <filter id="elevation-ring" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="5"
                  floodColor="black"
                  floodOpacity="0.65"
                />
              </filter>

              {/* ── 3D: Stronger elevation shadow for inner disk (Layer 3) ── */}
              <filter id="elevation-inner" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow
                  dx="0"
                  dy="11"
                  stdDeviation="7"
                  floodColor="black"
                  floodOpacity="0.82"
                />
              </filter>
            </defs>

            {/* ── Tattwa aura — blurred colored halo ring, only around the outer circle ── */}
            <circle
              cx={CX}
              cy={CY}
              r={152}
              fill="none"
              stroke={activeTattwaInfo.colorHex}
              strokeWidth={14}
              opacity={0.55}
              filter="url(#metro-aura)"
              style={{ transition: 'stroke 1s ease' }}
            />

            {/* ── Layer 1: Outer clock ring (FIXED) ── */}
            <circle
              cx={CX}
              cy={CY}
              r={145}
              fill="rgba(0,0,0,0.4)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <circle
              cx={CX}
              cy={CY}
              r={125}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />

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
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
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
                  x={p.x}
                  y={p.y}
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

            {/* ── Layer 2 + 3: Rotating inner disk ── */}
            <g
              style={{
                transform: `rotate(${diskDeg}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
                transition: 'transform 0.6s ease-out',
              }}
            >
              {/* ── Layer 2: Colorful segments ring — elevated ── */}
              <g filter="url(#elevation-ring)">
                {segments.map((seg) => {
                  const info = TATTWAS[seg.tattwa];
                  const isActiveSeg =
                    seg.tattwa === state.tattwa && seg.segIndex % 5 === state.tattwaIndex;
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
                        onMouseMove={(e) => {
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setHoveredSegment(null)}
                        style={{ cursor: 'default', transition: 'fill-opacity 0.3s ease' }}
                      />
                      {(() => {
                        const mid = (seg.startDeg + seg.endDeg) / 2;
                        const p = polarToCartesian(mid, 107);
                        return (
                          <text
                            x={p.x}
                            y={p.y}
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

                {/* Outer rim highlight — light on the raised top edge */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={123}
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                />
                {/* Inner shadow edge of the color ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={91}
                  fill="none"
                  stroke="rgba(0,0,0,0.6)"
                  strokeWidth="2.5"
                />
              </g>

              {/* ── Layer 3: Inner dark disk — elevated highest ── */}
              <g filter="url(#elevation-inner)">
                {/* Dark base */}
                <circle cx={CX} cy={CY} r={90} fill="rgba(8,8,22,0.93)" />

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
                      cx={p.x}
                      cy={p.y}
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

                {/* Human figure */}
                <circle
                  cx={CX}
                  cy={CY - 65}
                  r="8"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                />
                <line
                  x1={CX}
                  y1={CY - 57}
                  x2={CX}
                  y2={CY - 20}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.2"
                />
                {(() => {
                  const p4 = polarToCartesian(288, 65);
                  return (
                    <line
                      x1={CX}
                      y1={CY - 40}
                      x2={p4.x}
                      y2={p4.y}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.2"
                    />
                  );
                })()}
                {(() => {
                  const p1 = polarToCartesian(72, 65);
                  return (
                    <line
                      x1={CX}
                      y1={CY - 40}
                      x2={p1.x}
                      y2={p1.y}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.2"
                    />
                  );
                })()}
                {(() => {
                  const p3 = polarToCartesian(216, 65);
                  return (
                    <line
                      x1={CX}
                      y1={CY - 20}
                      x2={p3.x}
                      y2={p3.y}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.2"
                    />
                  );
                })()}
                {(() => {
                  const p2 = polarToCartesian(144, 65);
                  return (
                    <line
                      x1={CX}
                      y1={CY - 20}
                      x2={p2.x}
                      y2={p2.y}
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="1.2"
                    />
                  );
                })()}

                {/* TATWAMETRO text */}
                <text
                  x={CX}
                  y={CY + 82}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.2)"
                  fontSize="5"
                  fontFamily="serif"
                  letterSpacing="1"
                >
                  TATWAMETRO
                </text>

                {/* Inner disk rim highlight — top-lit raised edge */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={89}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1.5"
                />
              </g>
            </g>

            {/* ── Layer 4: Draggable needle (FIXED to viewport) ── */}
            <g
              style={{
                transform: `rotate(${nowDeg}deg)`,
                transformOrigin: `${CX}px ${CY}px`,
                transition: isDragging ? 'none' : 'transform 0.5s ease',
              }}
            >
              {/* Wide invisible hit area — only rendered when drag is enabled */}
              {isDraggable && (
                <line
                  x1={CX}
                  y1={CY + 32}
                  x2={CX}
                  y2={CY - 124}
                  stroke="transparent"
                  strokeWidth="28"
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                  onPointerDown={handleNeedlePointerDown}
                />
              )}

              {/* Main needle shaft */}
              <line
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY - 122}
                stroke={isDragging ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)'}
                strokeWidth={isDragging ? 2.2 : 1.5}
                strokeLinecap="round"
                style={{ pointerEvents: 'none' }}
              />
              {/* Needle tip dot */}
              <circle
                cx={CX}
                cy={CY - 122}
                r={isDragging ? 3.5 : 2.5}
                fill={isDragging ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)'}
                style={{ pointerEvents: 'none' }}
              />
              {/* Counterweight */}
              <line
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY + 30}
                stroke={isDragging ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.4)'}
                strokeWidth="2"
                strokeLinecap="round"
                style={{ pointerEvents: 'none' }}
              />
            </g>

            {/* ── Layer 5: Center hub ── */}
            <circle
              cx={CX}
              cy={CY}
              r={5}
              fill={activeTattwaInfo.colorLight}
              style={{ transition: 'fill 1s ease' }}
              filter="url(#metro-glow)"
            />
          </svg>

          {/* Segment tooltip (hidden while dragging).
              Portaled to <body> so the parent's `backdrop-filter` does not
              create a containing block that offsets `position: fixed`. */}
          {hoveredSegment &&
            !isDragging &&
            createPortal(
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
              </div>,
              document.body,
            )}
        </div>
      </div>

      {/* Active tattwa + datetime label */}
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
          {displayTime.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </span>
        {isDragging && onTimeChange && (
          <span className="ml-2 text-white/25 italic">drag to set</span>
        )}
      </div>
    </div>
  );
}
