/**
 * @file sunrise.service.ts
 * @description Pure service functions for computing sun rise/set times and
 * the effective sunrise used for Tattwa cycle calculations. No React
 * dependencies — safe to call from any context.
 */

import SunCalc from 'suncalc';
import type { SunTimes } from '../types';

/**
 * Get sunrise and sunset times for a given date and location.
 * Uses the suncalc library (NOAA solar position algorithm).
 *
 * @param date - The date to calculate sun times for
 * @param lat - Observer latitude in decimal degrees
 * @param lng - Observer longitude in decimal degrees
 * @returns SunTimes containing sunrise, sunset, solarNoon, dawn, dusk
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
 * Get the effective sunrise for Tattwa cycle calculations.
 * If the current time is before today's sunrise, returns yesterday's sunrise
 * so the ongoing night cycle is correctly attributed.
 *
 * @param now - The current or viewed Date
 * @param lat - Observer latitude
 * @param lng - Observer longitude
 * @returns The Date of the effective sunrise
 *
 * @example
 * const sr = getEffectiveSunrise(new Date(), 40.71, -74.01);
 */
export function getEffectiveSunrise(now: Date, lat: number, lng: number): Date {
  const todaySun = getSunTimes(now, lat, lng);
  if (now >= todaySun.sunrise) {
    return todaySun.sunrise;
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdaySun = getSunTimes(yesterday, lat, lng);
  return yesterdaySun.sunrise;
}

/**
 * Format a Date as a short time string (e.g. "6:34 AM").
 *
 * @param date - The Date to format
 * @returns Formatted time string in 12-hour format
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
