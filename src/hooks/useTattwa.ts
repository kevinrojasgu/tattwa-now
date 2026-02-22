import { useState, useEffect } from 'react';
import { getCurrentTattwa, type TattwaState } from '../lib/tattwas';
import { getMoonState, type MoonState } from '../lib/moonPhase';
import { getSunTimes, type SunTimes } from '../lib/sunrise';

export interface TattwaFullState {
  tattwa: TattwaState;
  moon: MoonState;
  sun: SunTimes;
  /** The actual Date used for this calculation */
  viewedDate: Date;
}

/**
 * Hook that calculates the Tattwa state.
 *
 * - When `overrideDate` is null, runs in **live mode**: recalculates every
 *   second using the real clock.
 * - When `overrideDate` is a Date, runs in **time-travel mode**: calculates
 *   once for that specific moment (still updates if the override changes).
 */
export function useTattwa(
  lat: number,
  lng: number,
  overrideDate: Date | null = null,
): TattwaFullState | null {
  const [state, setState] = useState<TattwaFullState | null>(null);

  useEffect(() => {
    function calculate(date: Date) {
      const tattwa = getCurrentTattwa(date, lat, lng);
      const moon = getMoonState(date, lat, lng);
      const sun = getSunTimes(date, lat, lng);
      setState({ tattwa, moon, sun, viewedDate: date });
    }

    if (overrideDate) {
      // Time-travel mode: calculate once for the given date
      calculate(overrideDate);
      return; // no interval
    }

    // Live mode: recalculate every second
    calculate(new Date());
    const interval = setInterval(() => calculate(new Date()), 1000);
    return () => clearInterval(interval);
  }, [lat, lng, overrideDate]);

  return state;
}
