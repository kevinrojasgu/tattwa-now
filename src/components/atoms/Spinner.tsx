import React from 'react';
/**
 * @file Spinner.tsx
 * @description Loading spinner atom. Used as Suspense fallback for lazy-loaded
 * organisms. Matches the app's dark aesthetic with a pulsing circle.
 */

/**
 * Simple pulsing spinner for loading states.
 *
 * @returns A centered pulsing dot element
 */
export function Spinner(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-3 h-3 rounded-full bg-white/30 animate-breathe" />
    </div>
  );
}
