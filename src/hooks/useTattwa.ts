import { useState, useEffect } from 'react';
import { getCurrentTattwa, type TattwaState } from '../lib/tattwas';
import { getMoonState, type MoonState } from '../lib/moonPhase';
import { getSunTimes, type SunTimes } from '../lib/sunrise';

export interface TattwaFullState {
  tattwa: TattwaState;
  moon: MoonState;
  sun: SunTimes;
}

/**
 * Hook that calculates and updates the current Tattwa state every second.
 */
export function useTattwa(lat: number, lng: number): TattwaFullState | null {
  const [state, setState] = useState<TattwaFullState | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      const tattwa = getCurrentTattwa(now, lat, lng);
      const moon = getMoonState(now, lat, lng);
      const sun = getSunTimes(now, lat, lng);
      setState({ tattwa, moon, sun });
    }

    // Initial calculation
    update();

    // Update every second for smooth countdown
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [lat, lng]);

  return state;
}
