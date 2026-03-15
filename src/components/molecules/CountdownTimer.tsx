import React from 'react';
/**
 * @file CountdownTimer.tsx
 * @description Animated countdown timer molecule. Displays MM:SS with a
 * subtle scale pulse on each second change.
 */

import { useEffect, useRef, useState } from 'react';

/** Format total seconds into "M:SS" string */
function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Props for CountdownTimer */
interface CountdownTimerProps {
  /** Total seconds remaining */
  seconds: number;
  /** Text color (hex or CSS color) */
  color: string;
}

/**
 * Animated countdown display with a brief scale pulse on each tick.
 *
 * @param seconds - Seconds remaining in the current period
 * @param color - Text and glow color
 */
export function CountdownTimer({ seconds, color }: CountdownTimerProps): React.JSX.Element {
  const text = formatCountdown(seconds);
  const prevRef = useRef(text);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (prevRef.current !== text) {
      setIsFlipping(true);
      const t = setTimeout(() => setIsFlipping(false), 150);
      prevRef.current = text;
      return () => clearTimeout(t);
    }
  }, [text]);

  return (
    <span
      className="text-4xl sm:text-5xl font-mono font-bold tabular-nums inline-block transition-transform duration-150"
      style={{
        color,
        transform: isFlipping ? 'scale(1.04)' : 'scale(1)',
        textShadow: `0 0 20px ${color}40`,
      }}
    >
      {text}
    </span>
  );
}
