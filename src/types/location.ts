/**
 * @file location.ts
 * @description Types for geolocation state and city selection.
 */

/**
 * Current location state including coordinates, display name, and status flags.
 */
export interface LocationState {
  /** Latitude in decimal degrees */
  lat: number;
  /** Longitude in decimal degrees */
  lng: number;
  /** Human-readable location name (city or coordinate string) */
  name: string;
  /** True if coordinates came from navigator.geolocation */
  isAutoDetected: boolean;
  /** True while a geolocation request is in flight */
  isLoading: boolean;
  /** Error message if geolocation failed, null otherwise */
  error: string | null;
}

/**
 * A city option entry for the manual location picker.
 */
export interface CityOption {
  /** Display name of the city */
  name: string;
  /** Latitude in decimal degrees */
  lat: number;
  /** Longitude in decimal degrees */
  lng: number;
}
