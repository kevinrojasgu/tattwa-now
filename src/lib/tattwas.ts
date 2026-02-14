import type { TattwaName } from './tattwaData';
import { TATTWA_ORDER, TATTWA_DURATION_MIN, CYCLE_DURATION_MIN, SUB_TATTWA_DURATION_MIN } from './tattwaData';
import { getEffectiveSunrise } from './sunrise';

export interface TattwaState {
  /** Current main Tattwa */
  tattwa: TattwaName;
  /** Current sub-Tattwa within the main period */
  subTattwa: TattwaName;
  /** Index (0-4) of main Tattwa in cycle */
  tattwaIndex: number;
  /** Index (0-4) of sub-Tattwa */
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
 * Calculate the current Tattwa state given the current time and location.
 */
export function getCurrentTattwa(now: Date, lat: number, lng: number): TattwaState {
  const sunrise = getEffectiveSunrise(now, lat, lng);

  const msSinceSunrise = now.getTime() - sunrise.getTime();
  const minutesSinceSunrise = msSinceSunrise / 60000;

  // Position within the 120-minute cycle
  const positionInCycle = ((minutesSinceSunrise % CYCLE_DURATION_MIN) + CYCLE_DURATION_MIN) % CYCLE_DURATION_MIN;

  // Main Tattwa
  const tattwaIndex = Math.floor(positionInCycle / TATTWA_DURATION_MIN);
  const minutesIntoTattwa = positionInCycle - tattwaIndex * TATTWA_DURATION_MIN;
  const minutesRemaining = TATTWA_DURATION_MIN - minutesIntoTattwa;
  const secondsRemaining = minutesRemaining * 60;
  const progress = minutesIntoTattwa / TATTWA_DURATION_MIN;

  // Sub-Tattwa
  const subTattwaIndex = Math.min(
    Math.floor(minutesIntoTattwa / SUB_TATTWA_DURATION_MIN),
    4
  );
  const minutesIntoSubTattwa = minutesIntoTattwa - subTattwaIndex * SUB_TATTWA_DURATION_MIN;
  const subProgress = minutesIntoSubTattwa / SUB_TATTWA_DURATION_MIN;

  const cycleNumber = Math.floor(minutesSinceSunrise / CYCLE_DURATION_MIN);

  return {
    tattwa: TATTWA_ORDER[tattwaIndex],
    subTattwa: TATTWA_ORDER[subTattwaIndex],
    tattwaIndex,
    subTattwaIndex,
    minutesIntoTattwa,
    minutesRemaining,
    secondsRemaining,
    progress,
    minutesIntoSubTattwa,
    subProgress,
    sunrise,
    minutesSinceSunrise,
    cycleNumber,
  };
}

export interface TimelineEntry {
  tattwa: TattwaName;
  start: Date;
  end: Date;
  isCurrent: boolean;
}

/**
 * Generate a full day's timeline of Tattwa periods from sunrise.
 */
export function getDayTimeline(now: Date, lat: number, lng: number): TimelineEntry[] {
  const sunrise = getEffectiveSunrise(now, lat, lng);
  const entries: TimelineEntry[] = [];

  // Generate 24 hours worth of cycles (12 full cycles = 60 entries)
  const totalPeriods = 60;

  for (let i = 0; i < totalPeriods; i++) {
    const tattwaIndex = i % 5;
    const startMs = sunrise.getTime() + i * TATTWA_DURATION_MIN * 60000;
    const endMs = startMs + TATTWA_DURATION_MIN * 60000;
    const start = new Date(startMs);
    const end = new Date(endMs);

    const isCurrent = now.getTime() >= startMs && now.getTime() < endMs;

    entries.push({
      tattwa: TATTWA_ORDER[tattwaIndex],
      start,
      end,
      isCurrent,
    });
  }

  return entries;
}
