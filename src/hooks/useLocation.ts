import { useState, useEffect, useCallback } from 'react';

export interface LocationState {
  lat: number;
  lng: number;
  name: string;
  isAutoDetected: boolean;
  isLoading: boolean;
  error: string | null;
}

const DEFAULT_LOCATION: LocationState = {
  lat: 40.7128,
  lng: -74.006,
  name: 'New York, US',
  isAutoDetected: false,
  isLoading: true,
  error: null,
};

const STORAGE_KEY = 'tatva-now-location';

/**
 * A curated list of major cities for manual fallback selection.
 */
export const CITY_OPTIONS = [
  { name: 'New York, US', lat: 40.7128, lng: -74.006 },
  { name: 'Los Angeles, US', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago, US', lat: 41.8781, lng: -87.6298 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
  { name: 'Berlin, Germany', lat: 52.52, lng: 13.405 },
  { name: 'Barcelona, Spain', lat: 41.3874, lng: 2.1686 },
  { name: 'Madrid, Spain', lat: 40.4168, lng: -3.7038 },
  { name: 'Rome, Italy', lat: 41.9028, lng: 12.4964 },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Mumbai, India', lat: 19.076, lng: 72.8777 },
  { name: 'New Delhi, India', lat: 28.6139, lng: 77.209 },
  { name: 'São Paulo, Brazil', lat: -23.5505, lng: -46.6333 },
  { name: 'Buenos Aires, Argentina', lat: -34.6037, lng: -58.3816 },
  { name: 'Mexico City, Mexico', lat: 19.4326, lng: -99.1332 },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Bangkok, Thailand', lat: 13.7563, lng: 100.5018 },
  { name: 'Cairo, Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'Moscow, Russia', lat: 55.7558, lng: 37.6173 },
  { name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'San Francisco, US', lat: 37.7749, lng: -122.4194 },
  { name: 'Denver, US', lat: 39.7392, lng: -104.9903 },
  { name: 'Lima, Peru', lat: -12.0464, lng: -77.0428 },
  { name: 'Bogotá, Colombia', lat: 4.711, lng: -74.0721 },
  { name: 'Santiago, Chile', lat: -33.4489, lng: -70.6693 },
  { name: 'Johannesburg, South Africa', lat: -26.2041, lng: 28.0473 },
  { name: 'Nairobi, Kenya', lat: -1.2921, lng: 36.8219 },
  { name: 'Hamburg, Germany', lat: 53.5511, lng: 9.9937 },
  { name: 'Vienna, Austria', lat: 48.2082, lng: 16.3738 },
  { name: 'Amsterdam, Netherlands', lat: 52.3676, lng: 4.9041 },
  { name: 'Seoul, South Korea', lat: 37.5665, lng: 126.978 },
  { name: 'Beijing, China', lat: 39.9042, lng: 116.4074 },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  { name: 'Lisbon, Portugal', lat: 38.7223, lng: -9.1393 },
  { name: 'Athens, Greece', lat: 37.9838, lng: 23.7275 },
  { name: 'Stockholm, Sweden', lat: 59.3293, lng: 18.0686 },
  { name: 'Helsinki, Finland', lat: 60.1699, lng: 24.9384 },
].sort((a, b) => a.name.localeCompare(b.name));

function loadSavedLocation(): LocationState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, isLoading: false, error: null };
    }
  } catch {
    // ignore
  }
  return null;
}

function saveLocation(state: LocationState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        lat: state.lat,
        lng: state.lng,
        name: state.name,
        isAutoDetected: state.isAutoDetected,
      })
    );
  } catch {
    // ignore
  }
}

export function useLocation() {
  const [location, setLocation] = useState<LocationState>(() => {
    return loadSavedLocation() || DEFAULT_LOCATION;
  });

  const autoDetect = useCallback(() => {
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

  const setManualLocation = useCallback(
    (lat: number, lng: number, name: string) => {
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

  // Auto-detect on first load if no saved location
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
