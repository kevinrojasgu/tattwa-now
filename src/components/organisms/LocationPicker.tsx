import React from 'react';
/**
 * @file LocationPicker.tsx
 * @description Location picker organism. Renders a trigger button in the header
 * and a portal-rendered dropdown with auto-detect and city search.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { LocationState } from '../../types';
import { CITY_OPTIONS } from '../../services/location.service';
import { useLanguage } from '../../controllers/useLanguage';

/** Props for LocationPicker */
interface LocationPickerProps {
  /** Current location state */
  location: LocationState;
  /** Callback to trigger browser geolocation */
  onAutoDetect: () => void;
  /** Callback when user selects a city */
  onManualSelect: (lat: number, lng: number, name: string) => void;
  /** Whether the dropdown is open */
  isOpen: boolean;
  /** Toggle open/closed */
  onToggle: () => void;
  /** Close and reset */
  onClose: () => void;
}

/** Props for DropdownPortal */
interface DropdownPortalProps {
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  onClickOutside: () => void;
}

/**
 * Renders the dropdown via a React portal so it always appears above all
 * other content, positioned relative to the trigger button.
 *
 * @param anchorRef - Ref to the trigger button for position calculations
 * @param children - Dropdown content
 * @param onClickOutside - Callback when backdrop is clicked
 */
function DropdownPortal({ anchorRef, children, onClickOutside }: DropdownPortalProps): React.JSX.Element {
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((): void => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
  }, [anchorRef]);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [updatePosition]);

  return createPortal(
    <>
      <div className="fixed inset-0" style={{ zIndex: 9998 }} onClick={onClickOutside} />
      <div
        ref={dropdownRef}
        className="fixed rounded-xl overflow-hidden animate-slide-down"
        style={{
          zIndex: 9999,
          top: `${pos.top}px`,
          right: `${pos.right}px`,
          width: 'min(320px, calc(100vw - 1.5rem))',
          background: 'rgb(20 11 29)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7)',
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

/**
 * Location picker with portal dropdown, auto-detect, and city search.
 *
 * @param location - Current location state
 * @param onAutoDetect - Trigger geolocation
 * @param onManualSelect - Select a city by lat/lng/name
 * @param isOpen - Controlled open state
 * @param onToggle - Toggle open/closed
 * @param onClose - Close and reset
 */
export function LocationPicker({
  location,
  onAutoDetect,
  onManualSelect,
  isOpen,
  onToggle,
  onClose,
}: LocationPickerProps): React.JSX.Element {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredCities = CITY_OPTIONS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = useCallback((): void => {
    onClose();
    setSearchQuery('');
  }, [onClose]);

  return (
    <>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={onToggle}
        className="flex items-center gap-2 text-sm text-white/90 hover:text-white transition-all duration-200 px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/14 active:scale-95 border border-white/10 hover:border-white/20"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={location.isLoading ? 'animate-breathe' : ''}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="font-medium">{location.isLoading ? t.detecting : location.name}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 opacity-60 ${isOpen ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {location.error && (
        <div className="text-xs text-red-400 mt-1 px-3 animate-fade-in-up">{location.error}</div>
      )}

      {isOpen && (
        <DropdownPortal anchorRef={buttonRef} onClickOutside={handleClose}>
          {/* Auto-detect */}
          <div className="p-3 border-b border-white/10">
            <button
              onClick={() => { onAutoDetect(); handleClose(); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-white font-medium hover:bg-white/12 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
              </svg>
              {t.autoDetect}
            </button>
          </div>

          {/* Search */}
          <div className="p-3 border-b border-white/10">
            <input
              ref={inputRef}
              type="text"
              placeholder={t.searchCities}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-white/10 text-white placeholder-white/50 rounded-lg border border-white/15 focus:border-white/40 focus:outline-none focus:bg-white/14 transition-all duration-200"
            />
          </div>

          {/* City list */}
          <div className="max-h-56 overflow-y-auto">
            {filteredCities.map((city, i) => (
              <button
                key={city.name}
                onClick={() => { onManualSelect(city.lat, city.lng, city.name); handleClose(); }}
                className="w-full text-left px-4 py-2.5 text-sm text-white/85 hover:bg-white/12 hover:text-white transition-all duration-150 flex justify-between items-center active:bg-white/18"
                style={{ animation: `fadeInUp 0.15s ease-out ${Math.min(i * 0.02, 0.3)}s both` }}
              >
                <span>{city.name}</span>
                <span className="text-xs text-white/45 font-mono tabular-nums ml-3 shrink-0">
                  {city.lat.toFixed(1)}°, {city.lng.toFixed(1)}°
                </span>
              </button>
            ))}
            {filteredCities.length === 0 && (
              <div className="px-4 py-3 text-sm text-white/50 animate-fade-in-up">
                {t.noCitiesFound}
              </div>
            )}
          </div>
        </DropdownPortal>
      )}
    </>
  );
}
