import React from 'react';
/**
 * @file PropertyChip.tsx
 * @description Label + value display chip molecule. Used in TattwaCard and
 * TattwaReference property grids.
 */

/** Props for PropertyChip */
interface PropertyChipProps {
  /** Property label (e.g. "Planet") */
  label: string;
  /** Property value (e.g. "Saturn") */
  value: string;
  /** Optional animation delay for staggered entrance */
  animationDelay?: string;
}

/**
 * A small chip showing a label and value, styled for dark glass backgrounds.
 *
 * @param label - The property label
 * @param value - The property value
 * @param animationDelay - Optional CSS animation-delay for entrance stagger
 */
export function PropertyChip({ label, value, animationDelay }: PropertyChipProps): React.JSX.Element {
  return (
    <div
      className="bg-white/5 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:scale-[1.02]"
      style={{ animationDelay }}
    >
      <div className="text-white/40 text-xs">{label}</div>
      <div className="text-white/90 font-medium text-sm">{value}</div>
    </div>
  );
}
