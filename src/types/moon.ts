/**
 * @file moon.ts
 * @description Types for moon phase state and sun times.
 */

/**
 * Moon phase and nostril breathing state for a given moment and location.
 */
export interface MoonState {
  /** Moon phase value (0 = new moon, 0.5 = full moon) */
  phase: number;
  /** Moon illumination fraction (0 to 1) */
  illumination: number;
  /** Human-readable phase name */
  phaseName: string;
  /** Days since last new moon (approximate) */
  daysSinceNewMoon: number;
  /** Days until next full moon (approximate) */
  daysUntilFullMoon: number;
  /** Breathing side: 'left' (Chandra/Lunar) or 'right' (Suria/Solar) */
  breathingSide: 'left' | 'right';
  /** Breathing nadi name in English */
  breathingName: string;
  /** Sanskrit name for breathing nadi */
  breathingSanskrit: string;
  /** Whether we're in Sushumna (transition between sides, ~1 min) */
  isSushumna: boolean;
  /** Which 2-hour breathing block we're in since sunrise */
  breathingBlockIndex: number;
}

/**
 * Key sun event times for a given day and location.
 */
export interface SunTimes {
  /** Astronomical sunrise (upper limb on horizon) */
  sunrise: Date;
  /** Astronomical sunset */
  sunset: Date;
  /** Solar noon (highest elevation) */
  solarNoon: Date;
  /** Civil dawn (sun 6° below horizon) */
  dawn: Date;
  /** Civil dusk (sun 6° below horizon after sunset) */
  dusk: Date;
}
