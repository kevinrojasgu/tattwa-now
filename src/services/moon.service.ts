/**
 * @file moon.service.ts
 * @description Pure service functions for calculating moon phase state and
 * nostril breathing cycle. No React — safe for any context.
 */

import SunCalc from 'suncalc';
import type { MoonState } from '../types';
import { getEffectiveSunrise } from './sunrise.service';

/** Average lunar month in days (synodic period) */
const SYNODIC_MONTH = 29.53059;

/**
 * Get the human-readable name for a moon phase value.
 *
 * @param phase - Phase value from SunCalc (0 = new, 0.5 = full)
 * @returns Descriptive phase name string
 */
function getPhaseName(phase: number): string {
  if (phase < 0.03 || phase > 0.97) return 'New Moon';
  if (phase < 0.22) return 'Waxing Crescent';
  if (phase < 0.28) return 'First Quarter';
  if (phase < 0.47) return 'Waxing Gibbous';
  if (phase < 0.53) return 'Full Moon';
  if (phase < 0.72) return 'Waning Gibbous';
  if (phase < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
}

/**
 * Calculate moon phase and nostril breathing cycle information.
 *
 * Breathing algorithm (from the book):
 * - At New Moon (day 0), breathing starts with left nostril (Chandra/lunar)
 * - Every 3 days, the starting side alternates: 0–2 left, 3–5 right, 6–8 left…
 * - At Full Moon (day ~14.7), it starts with right nostril (Suria/solar)
 * - Within each day, breathing switches sides every 2 hours from sunrise
 *
 * @param now - The Date to calculate for
 * @param lat - Observer latitude
 * @param lng - Observer longitude
 * @returns Complete MoonState including phase, illumination, and breathing info
 */
export function getMoonState(now: Date, lat: number, lng: number): MoonState {
  const moonIllum = SunCalc.getMoonIllumination(now);
  const phase = moonIllum.phase;
  const illumination = moonIllum.fraction;
  const phaseName = getPhaseName(phase);

  const daysSinceNewMoon = phase * SYNODIC_MONTH;
  const daysUntilFullMoon = phase < 0.5
    ? (0.5 - phase) * SYNODIC_MONTH
    : (1.5 - phase) * SYNODIC_MONTH;

  // 3-day block determines the starting nostril for the day
  const threeBlockIndex = Math.floor(daysSinceNewMoon / 3);
  const startingIsLeft = threeBlockIndex % 2 === 0;

  // 2-hour blocks since sunrise alternate the active nostril
  const sunrise = getEffectiveSunrise(now, lat, lng);
  const msSinceSunrise = now.getTime() - sunrise.getTime();
  const hoursSinceSunrise = msSinceSunrise / 3600000;
  const twoHourBlockIndex = Math.floor(hoursSinceSunrise / 2);
  const blockIsEven = twoHourBlockIndex % 2 === 0;
  const isLeftNostril = startingIsLeft ? blockIsEven : !blockIsEven;

  // Sushumna: ~1-minute transition at the boundary of 2-hour blocks
  const minutesIntoBlock = (hoursSinceSunrise % 2) * 60;
  const isSushumna = minutesIntoBlock < 1 || minutesIntoBlock > 119;

  const breathingSide: 'left' | 'right' = isLeftNostril ? 'left' : 'right';
  const breathingName = isLeftNostril ? 'Lunar (Chandra)' : 'Solar (Suria)';
  const breathingSanskrit = isLeftNostril ? 'Ida' : 'Pingala';

  return {
    phase,
    illumination,
    phaseName,
    daysSinceNewMoon,
    daysUntilFullMoon,
    breathingSide,
    breathingName,
    breathingSanskrit,
    isSushumna,
    breathingBlockIndex: twoHourBlockIndex,
  };
}
