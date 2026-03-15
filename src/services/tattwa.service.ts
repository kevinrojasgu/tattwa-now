/**
 * @file tattwa.service.ts
 * @description Pure service functions for calculating the current Tattwa state
 * based on local sunrise time. No React dependencies — safe to call from
 * any context (hooks, workers, tests).
 */

import type { TattwaName, TattwaState, TimelineEntry } from '../types';
import { TATTWA_ORDER, TATTWA_DURATION_MIN, CYCLE_DURATION_MIN, SUB_TATTWA_DURATION_MIN } from '../data/tattwaData';
import { getEffectiveSunrise } from './sunrise.service';

/**
 * Calculates which Tattwa is currently active given the current time and location.
 *
 * @param now - The Date to calculate for
 * @param lat - Latitude of the observer
 * @param lng - Longitude of the observer
 * @returns Full TattwaState including progress, sub-tattwa, and cycle info
 *
 * @example
 * const state = getCurrentTattwa(new Date(), 40.71, -74.01);
 * console.log(state.tattwa); // "Prithvi"
 */
export function getCurrentTattwa(now: Date, lat: number, lng: number): TattwaState {
  const sunrise = getEffectiveSunrise(now, lat, lng);

  const msSinceSunrise = now.getTime() - sunrise.getTime();
  const minutesSinceSunrise = msSinceSunrise / 60000;

  // Position within the 120-minute cycle (handles negative values before sunrise)
  const positionInCycle =
    ((minutesSinceSunrise % CYCLE_DURATION_MIN) + CYCLE_DURATION_MIN) % CYCLE_DURATION_MIN;

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
    tattwa: TATTWA_ORDER[tattwaIndex] as TattwaName,
    subTattwa: TATTWA_ORDER[subTattwaIndex] as TattwaName,
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

/**
 * Generate a full day's timeline of Tattwa periods from sunrise.
 * Produces 60 entries (12 full 2-hour cycles = 24 hours of coverage).
 *
 * @param now - The date to generate the timeline for
 * @param lat - Observer latitude
 * @param lng - Observer longitude
 * @returns Array of TimelineEntry objects ordered by start time
 */
export function getDayTimeline(now: Date, lat: number, lng: number): TimelineEntry[] {
  const sunrise = getEffectiveSunrise(now, lat, lng);
  const entries: TimelineEntry[] = [];
  const totalPeriods = 60;

  for (let i = 0; i < totalPeriods; i++) {
    const tattwaIndex = i % 5;
    const startMs = sunrise.getTime() + i * TATTWA_DURATION_MIN * 60000;
    const endMs = startMs + TATTWA_DURATION_MIN * 60000;
    const start = new Date(startMs);
    const end = new Date(endMs);
    const isCurrent = now.getTime() >= startMs && now.getTime() < endMs;

    entries.push({
      tattwa: TATTWA_ORDER[tattwaIndex] as TattwaName,
      start,
      end,
      isCurrent,
    });
  }

  return entries;
}
