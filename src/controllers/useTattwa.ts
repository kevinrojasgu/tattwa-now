/**
 * @file useTattwa.ts
 * @description React hook that computes the full Tattwa state.
 *
 * - Live mode (overrideDate = null): recalculates every second
 * - Time-travel mode (overrideDate = Date): calculates once for that moment
 *
 * Side-effects: sets an interval timer in live mode.
 */

import { useState, useEffect } from 'react';
import type { TattwaFullState } from '../types';
import { getCurrentTattwa } from '../services/tattwa.service';
import { getMoonState } from '../services/moon.service';
import { getSunTimes } from '../services/sunrise.service';

/**
 * Hook that calculates the Tattwa state for a given location and time.
 *
 * @param lat - Observer latitude in decimal degrees
 * @param lng - Observer longitude in decimal degrees
 * @param overrideDate - null for live mode, Date for time-travel mode
 * @returns TattwaFullState or null while the first calculation is pending
 *
 * @example
 * const state = useTattwa(40.71, -74.01, null);
 * if (state) console.log(state.tattwa.tattwa); // "Prithvi"
 */
export function useTattwa(
  lat: number,
  lng: number,
  overrideDate: Date | null = null
): TattwaFullState | null {
  const [state, setState] = useState<TattwaFullState | null>(null);

  useEffect(() => {
    function calculate(date: Date): void {
      const tattwa = getCurrentTattwa(date, lat, lng);
      const moon = getMoonState(date, lat, lng);
      const sun = getSunTimes(date, lat, lng);
      setState({ tattwa, moon, sun, viewedDate: date });
    }

    if (overrideDate) {
      calculate(overrideDate);
      return;
    }

    // Live mode: tick every second
    calculate(new Date());
    const interval = setInterval(() => calculate(new Date()), 1000);
    return () => clearInterval(interval);
  }, [lat, lng, overrideDate]);

  return state;
}
