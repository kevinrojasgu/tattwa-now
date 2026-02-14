import SunCalc from 'suncalc';

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  dawn: Date;
  dusk: Date;
}

/**
 * Get sunrise and sunset times for a given date and location.
 * Uses the suncalc library which implements NOAA's solar position algorithm.
 */
export function getSunTimes(date: Date, lat: number, lng: number): SunTimes {
  const times = SunCalc.getTimes(date, lat, lng);
  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    dawn: times.dawn,
    dusk: times.dusk,
  };
}

/**
 * Get sunrise for a specific date. If the current time is before today's sunrise,
 * we need the previous day's sunrise for calculating the ongoing Tattwa cycle.
 */
export function getEffectiveSunrise(now: Date, lat: number, lng: number): Date {
  const todaySun = getSunTimes(now, lat, lng);

  if (now >= todaySun.sunrise) {
    return todaySun.sunrise;
  }

  // Before today's sunrise: use yesterday's sunrise
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdaySun = getSunTimes(yesterday, lat, lng);
  return yesterdaySun.sunrise;
}

/**
 * Format a Date as a time string like "6:34 AM"
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
