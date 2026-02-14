import SunCalc from 'suncalc';
import { getEffectiveSunrise } from './sunrise';

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
  /** Breathing name */
  breathingName: string;
  /** Sanskrit name for breathing */
  breathingSanskrit: string;
  /** Whether we're in Sushumna (transition between sides, ~few minutes) */
  isSushumna: boolean;
  /** Which 2-hour breathing block we're in since sunrise */
  breathingBlockIndex: number;
}

const SYNODIC_MONTH = 29.53059; // Average lunar month in days

/**
 * Get the human-readable name for a moon phase value.
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
 * Calculate moon phase and breathing cycle information.
 * 
 * According to the book:
 * - At New Moon, breathing starts with left nostril (Chandra/lunar)
 * - Every 3 days, it alternates: days 0-2 left, days 3-5 right, days 6-8 left...
 * - At Full Moon, it starts with right nostril (Suria/solar)
 * - Within each day, the breathing switches sides every 2 hours from sunrise
 */
export function getMoonState(now: Date, lat: number, lng: number): MoonState {
  const moonIllum = SunCalc.getMoonIllumination(now);
  const phase = moonIllum.phase;
  const illumination = moonIllum.fraction;
  const phaseName = getPhaseName(phase);

  // Days since new moon (phase 0 = new moon, phase goes 0 to 1)
  const daysSinceNewMoon = phase * SYNODIC_MONTH;
  
  // Days until full moon
  const daysUntilFullMoon = phase < 0.5
    ? (0.5 - phase) * SYNODIC_MONTH
    : (1.5 - phase) * SYNODIC_MONTH;

  // Breathing calculation
  // Every 3 days, the starting nostril alternates
  // Block 0 (days 0-2): left (Chandra)
  // Block 1 (days 3-5): right (Suria)
  // Block 2 (days 6-8): left
  // etc.
  const threeBlockIndex = Math.floor(daysSinceNewMoon / 3);
  const startingIsLeft = threeBlockIndex % 2 === 0;

  // Within the day, breathing switches every 2 hours from sunrise
  const sunrise = getEffectiveSunrise(now, lat, lng);
  const msSinceSunrise = now.getTime() - sunrise.getTime();
  const hoursSinceSunrise = msSinceSunrise / 3600000;
  const twoHourBlockIndex = Math.floor(hoursSinceSunrise / 2);
  
  // Each 2-hour block alternates the side
  const blockIsEven = twoHourBlockIndex % 2 === 0;
  const isLeftNostril = startingIsLeft ? blockIsEven : !blockIsEven;

  // Sushumna: brief period at the transition between 2-hour blocks
  // The book describes it as a short time when breathing is even through both nostrils
  const minutesIntoBlock = (hoursSinceSunrise % 2) * 60;
  const isSushumna = minutesIntoBlock < 1 || minutesIntoBlock > 119; // ~1 min transition

  const breathingSide = isLeftNostril ? 'left' : 'right';
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
