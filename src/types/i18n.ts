/**
 * @file i18n.ts
 * @description Internationalization types: language codes, translation
 * shape, and extended per-Tattwa text structures.
 */

/** Supported UI language codes */
export type Lang = 'en' | 'es';

/**
 * Full set of UI strings for one language.
 * Every key must be present in both 'en' and 'es' translation objects.
 */
export interface Translations {
  // App
  /** Application title */
  appTitle: string;
  /** Application subtitle / tagline */
  appSubtitle: string;
  /** Loading state message */
  loading: string;
  /** Footer attribution text */
  footer: string;
  /** Label on the language toggle button */
  switchLang: string;

  // LocationPicker
  /** Shown while geolocation is in progress */
  detecting: string;
  /** Label for auto-detect geolocation button */
  autoDetect: string;
  /** Placeholder for city search input */
  searchCities: string;
  /** Shown when no cities match the search query */
  noCitiesFound: string;

  // TattwaCard
  /** Label above the main tattwa name */
  currentTattwa: string;
  /** Suffix after countdown timer */
  remaining: string;
  /** Property label */
  planet: string;
  /** Property label */
  direction: string;
  /** Property label */
  sense: string;
  /** Property label */
  mantra: string;
  /** Prefix for cycle start time */
  cycleStartedSunrise: string;
  /** Prefix for cycle number */
  cycle: string;

  // SubTattwa
  /** Label for the sub-Tattwa tracker */
  subTattwa: string;

  // TattwaReference
  /** Section heading */
  tattwaReference: string;
  /** Badge shown on currently active Tattwa */
  active: string;
  /** Property label */
  color: string;
  /** Property label */
  shape: string;
  /** Property label */
  taste: string;
  /** Property label */
  symbol: string;
  /** Section label for favorable activities */
  favorableFor: string;
  /** Section label for unfavorable activities */
  unfavorableFor: string;
  /** Property label for chakra */
  chakra: string;
  /** Property label for body areas */
  bodyParts: string;
  /** Property label for gemstone */
  gemstone: string;
  /** Property label for mudra */
  mudra: string;
  /** Property label for best days */
  bestDays: string;
  /** Property label for emotional state */
  emotionalState: string;
  /** Property label for breathing note */
  breathingNote: string;
  /** Section heading for TatwaMetro */
  tatwaMetro: string;
  /** Link to open the dedicated TatwaMetro page */
  fullView: string;

  // TimeNavigator
  /** Live mode indicator label */
  live: string;
  /** Time-travel mode indicator label */
  viewingPast: string;
  /** Button label to return to current time */
  now: string;
  /** Button label to close date picker */
  close: string;
  /** Button label to open date picker */
  pickDate: string;
  /** Prefix in time-travel banner */
  viewingTattwaFor: string;
  /** Link in time-travel banner */
  returnToNow: string;
  /** Label above the datetime input */
  selectDateTime: string;
  /** Quick preset: yesterday sunrise */
  yesterdaySunrise: string;
  /** Quick preset: tomorrow sunrise */
  tomorrowSunrise: string;
  /** Label for fine-step buttons row */
  stepByPeriod: string;

  // MoonPhase
  /** Section heading */
  moonAndBreathing: string;
  /** Suffix for illumination percentage */
  illuminated: string;
  /** Template string with {day} placeholder */
  dayLunarCycle: string;
  /** Label for Sushumna (both nostrils balanced) */
  balanced: string;
  /** Label for left nostril dominant */
  leftNostril: string;
  /** Label for right nostril dominant */
  rightNostril: string;
  /** Label for nadi */
  nadi: string;
  /** Sun event label */
  dawn: string;
  /** Sun event label */
  sunrise: string;
  /** Sun event label */
  sunset: string;
  /** Sun event label */
  dusk: string;

  /** Date locale string for toLocaleDateString / toLocaleTimeString */
  dateLocale: string;
}

/**
 * Enriched per-Tattwa extended text for use in TattwaReference expanded view.
 * Exists in both EN and ES variants.
 */
export interface TattwaExtendedText {
  /** Long-form description of the Tattwa's qualities and significance */
  description: string;
  /** Activities and intentions that benefit from this Tattwa */
  favorableFor: readonly string[];
  /** Activities and intentions that are hindered by this Tattwa */
  unfavorableFor: readonly string[];
  /** Body areas and organs governed by this Tattwa */
  bodyParts: readonly string[];
  /** Days of the week most aligned with this Tattwa */
  bestDays: readonly string[];
  /** Emotional and psychological qualities active during this Tattwa */
  emotionalState: string;
  /** Note on breathing pattern and nostril activity during this Tattwa */
  breathingNote: string;
}
