import React from 'react';
/**
 * @file Pill.tsx
 * @description Small rounded label pill atom. Used for tags like body parts,
 * best days, chakra names, etc.
 */

/** Props for the Pill atom */
interface PillProps {
  /** Text content of the pill */
  label: string;
  /** Optional color tint (CSS color string) */
  color?: string;
}

/**
 * Small rounded label pill for tag-like display.
 *
 * @param label - The text to show inside the pill
 * @param color - Optional accent color for border/text tint
 */
export function Pill({ label, color }: PillProps): React.JSX.Element {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs transition-all duration-200 hover:opacity-90"
      style={{
        backgroundColor: color ? `${color}15` : 'rgba(255,255,255,0.07)',
        border: `1px solid ${color ? `${color}30` : 'rgba(255,255,255,0.12)'}`,
        color: color ? color : 'rgba(255,255,255,0.65)',
      }}
    >
      {label}
    </span>
  );
}
