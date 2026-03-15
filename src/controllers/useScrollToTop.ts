/**
 * @file useScrollToTop.ts
 * @description Smoothly scrolls the page to the top whenever the watched
 * value changes. Used to reset viewport position when the user time-travels
 * to a different date so they see the TattwaCard first.
 */

import { useEffect } from 'react';

/**
 * Scroll to top on trigger change.
 *
 * @param trigger - Any value; when it changes the page scrolls to top
 *
 * @example
 * useScrollToTop(viewedDate); // scroll to top whenever date changes
 */
export function useScrollToTop(trigger: unknown): void {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [trigger]);
}
