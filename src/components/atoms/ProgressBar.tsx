import React from 'react';
/**
 * @file ProgressBar.tsx
 * @description Shimmer progress bar atom. Renders a horizontal bar with a
 * smooth fill and an animated shimmer overlay.
 */

/** Props for the ProgressBar atom */
interface ProgressBarProps {
  /** Progress value from 0 to 1 */
  progress: number;
  /** Fill color (hex or CSS color) */
  color: string;
}

/**
 * Animated progress bar with shimmer effect.
 *
 * @param progress - Current progress (0–1)
 * @param color - Bar fill and glow color
 */
export function ProgressBar({ progress, color }: ProgressBarProps): React.JSX.Element {
  return (
    <div className="h-2 rounded-full overflow-hidden bg-white/10">
      <div
        className="h-full rounded-full shimmer-bar"
        style={{
          width: `${progress * 100}%`,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}80`,
          transition: 'width 1s linear, background-color 0.7s ease',
        }}
      />
    </div>
  );
}
