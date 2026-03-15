/**
 * @file useLocation.ts
 * @description React hook for geolocation state management. Handles
 * auto-detection via navigator.geolocation, manual city selection, and
 * persistence to localStorage.
 *
 * Side-effects: reads/writes localStorage, calls navigator.geolocation.
 */

import { useState, useEffect, useCallback } from 'react';
import type { LocationState } from '../types';
import { DEFAULT_LOCATION, loadSavedLocation, saveLocation } from '../services/location.service';

/**
 * Hook that manages the user's location state.
 *
 * @returns Object with { location, autoDetect, setManualLocation }
 *
 * @example
 * const { location, autoDetect, setManualLocation } = useLocation();
 */
export function useLocation(): {
  location: LocationState;
  autoDetect: () => void;
  setManualLocation: (lat: number, lng: number, name: string) => void;
} {
  const [location, setLocation] = useState<LocationState>(() => {
    return loadSavedLocation() ?? DEFAULT_LOCATION;
  });

  /**
   * Trigger a browser geolocation request. Updates location state on
   * success or populates the error field on failure.
   */
  const autoDetect = useCallback((): void => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Geolocation is not supported by this browser.',
      }));
      return;
    }

    setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc: LocationState = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: `${position.coords.latitude.toFixed(2)}°, ${position.coords.longitude.toFixed(2)}°`,
          isAutoDetected: true,
          isLoading: false,
          error: null,
        };
        setLocation(newLoc);
        saveLocation(newLoc);
      },
      (err) => {
        setLocation((prev) => ({
          ...prev,
          isLoading: false,
          error: `Location access denied: ${err.message}`,
        }));
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  /**
   * Set location manually from the city picker or coordinates.
   *
   * @param lat - Latitude
   * @param lng - Longitude
   * @param name - Display name of the location
   */
  const setManualLocation = useCallback(
    (lat: number, lng: number, name: string): void => {
      const newLoc: LocationState = {
        lat,
        lng,
        name,
        isAutoDetected: false,
        isLoading: false,
        error: null,
      };
      setLocation(newLoc);
      saveLocation(newLoc);
    },
    []
  );

  // Auto-detect on first mount if no saved location exists
  useEffect(() => {
    const saved = loadSavedLocation();
    if (!saved) {
      autoDetect();
    } else {
      setLocation({ ...saved, isLoading: false });
    }
  }, [autoDetect]);

  return { location, autoDetect, setManualLocation };
}
