import React from 'react';
/**
 * @file Badge.tsx
 * @description Status badge atoms for Live, Time-Travel, and Active states.
 */

/** Props for the ActiveBadge */
interface ActiveBadgeProps {
  /** Text to display inside the badge */
  label: string;
  /** Hex color for the badge background tint and text */
  colorHex: string;
  /** Lighter hex for text color */
  colorLight: string;
}

/**
 * Badge indicating the currently active Tattwa in the reference list.
 *
 * @param label - Text label (e.g. "ACTIVE" or "ACTIVO")
 * @param colorHex - Element color hex for background tint
 * @param colorLight - Lighter variant for text
 */
export function ActiveBadge({ label, colorHex, colorLight }: ActiveBadgeProps): React.JSX.Element {
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        backgroundColor: `${colorHex}30`,
        color: colorLight,
        animation: 'pulseGlow 2s ease-in-out infinite',
      }}
    >
      {label}
    </span>
  );
}

/**
 * Live indicator badge — green pulsing dot with "LIVE" label.
 *
 * @param label - Localized live label text
 */
export function LiveBadge({ label }: { label: string }): React.JSX.Element {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="relative flex items-center justify-center w-5 h-5">
        <div className="absolute w-2.5 h-2.5 rounded-full bg-green-400 animate-breathe" />
        <div className="absolute w-5 h-5 rounded-full bg-green-400/20" />
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-green-400/80">
        {label}
      </span>
    </div>
  );
}
