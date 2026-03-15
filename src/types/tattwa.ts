/**
 * @file tattwa.ts
 * @description Core Tattwa domain types — names, element info, state snapshots,
 * and timeline entries used across the entire application.
 */

/** The five classical Tattwas in their natural cycle order */
export type TattwaName = 'Akash' | 'Vayu' | 'Tejas' | 'Prithvi' | 'Apas';

/**
 * Complete static information record for a single Tattwa element.
 * Values are always in English; translation is performed via translateValue().
 */
export interface TattwaInfo {
  /** Canonical Tattwa name */
  name: TattwaName;
  /** Classical element name (e.g. "Ether", "Air") */
  element: string;
  /** Traditional color name (e.g. "Black / Colorless") */
  color: string;
  /** Primary hex color used for UI fills */
  colorHex: string;
  /** Lighter variant hex used for text and highlights */
  colorLight: string;
  /** Starting hex for card gradient background */
  colorGradientFrom: string;
  /** Ending hex for card gradient background */
  colorGradientTo: string;
  /** Geometric shape name (e.g. "Ear-like (Ovoid)") */
  shape: string;
  /** Ruling planet(s) (e.g. "Saturn", "Sun / Mars") */
  planet: string;
  /** Cardinal direction (e.g. "Center", "North") */
  direction: string;
  /** Associated sense organ (e.g. "Hearing") */
  sense: string;
  /** Core nature/qualities (e.g. "Destructive, meditative") */
  nature: string;
  /** Associated taste (e.g. "Bitter") */
  taste: string;
  /** Sanskrit bija symbol letter */
  symbol: string;
  /** Sanskrit seed mantra (e.g. "Ham") */
  mantra: string;
  /** Activities favored during this Tattwa */
  favorableFor: readonly string[];
  /** Activities to avoid during this Tattwa */
  unfavorableFor: readonly string[];
  /** Short description of the Tattwa's qualities */
  description: string;
  /** Sanskrit name of the associated chakra */
  chakra: string;
  /** English name of the associated chakra */
  chakraEnglish: string;
  /** Primary gemstone correspondence */
  gemstone: string;
  /** Associated mudra / hand gesture */
  mudra: string;
}

/**
 * Calculated state snapshot for the currently active Tattwa.
 * Returned by getCurrentTattwa() and stored in TattwaFullState.
 */
export interface TattwaState {
  /** Current main Tattwa */
  tattwa: TattwaName;
  /** Current sub-Tattwa within the main period */
  subTattwa: TattwaName;
  /** Index (0–4) of main Tattwa in cycle */
  tattwaIndex: number;
  /** Index (0–4) of sub-Tattwa */
  subTattwaIndex: number;
  /** Minutes elapsed into the current Tattwa period */
  minutesIntoTattwa: number;
  /** Minutes remaining in the current Tattwa period */
  minutesRemaining: number;
  /** Seconds remaining in the current Tattwa period */
  secondsRemaining: number;
  /** Progress through current Tattwa (0 to 1) */
  progress: number;
  /** Minutes elapsed into the current sub-Tattwa */
  minutesIntoSubTattwa: number;
  /** Progress through current sub-Tattwa (0 to 1) */
  subProgress: number;
  /** The effective sunrise used for calculation */
  sunrise: Date;
  /** Total minutes since the effective sunrise */
  minutesSinceSunrise: number;
  /** Which 2-hour cycle we're in (0-based) since sunrise */
  cycleNumber: number;
}

/**
 * Full composite state returned by useTattwa hook.
 * Aggregates Tattwa, moon, and sun data for a single point in time.
 */
export interface TattwaFullState {
  /** Current Tattwa calculation */
  tattwa: TattwaState;
  /** Moon phase and breathing state */
  moon: import('./moon').MoonState;
  /** Sun rise/set times */
  sun: import('./moon').SunTimes;
  /** The actual Date used for this calculation */
  viewedDate: Date;
}

/**
 * A single entry in the day's Tattwa timeline.
 * Represents one 24-minute Tattwa period.
 */
export interface TimelineEntry {
  /** The Tattwa active during this period */
  tattwa: TattwaName;
  /** Start time of this period */
  start: Date;
  /** End time of this period */
  end: Date;
  /** Whether this entry is the currently active period */
  isCurrent: boolean;
}
