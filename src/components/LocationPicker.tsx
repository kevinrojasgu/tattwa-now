import { useState } from 'react';
import type { LocationState } from '../hooks/useLocation';
import { CITY_OPTIONS } from '../hooks/useLocation';

interface LocationPickerProps {
  location: LocationState;
  onAutoDetect: () => void;
  onManualSelect: (lat: number, lng: number, name: string) => void;
}

export function LocationPicker({
  location,
  onAutoDetect,
  onManualSelect,
}: LocationPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = CITY_OPTIONS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Current location display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-white/60 hover:text-white/90 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{location.isLoading ? 'Detecting...' : location.name}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {location.error && (
        <div className="text-xs text-red-400/80 mt-1 px-3">{location.error}</div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-2xl z-50 overflow-hidden">
          <div className="p-3 border-b border-white/10">
            <button
              onClick={() => {
                onAutoDetect();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="2" x2="12" y2="6" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="2" y1="12" x2="6" y2="12" />
                <line x1="18" y1="12" x2="22" y2="12" />
              </svg>
              Auto-detect my location
            </button>
          </div>

          <div className="p-3 border-b border-white/10">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white/5 text-white/90 placeholder-white/30 rounded-lg border border-white/10 focus:border-white/30 focus:outline-none"
              autoFocus
            />
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredCities.map((city) => (
              <button
                key={city.name}
                onClick={() => {
                  onManualSelect(city.lat, city.lng, city.name);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white/90 transition-colors flex justify-between items-center"
              >
                <span>{city.name}</span>
                <span className="text-xs text-white/30">
                  {city.lat.toFixed(1)}°, {city.lng.toFixed(1)}°
                </span>
              </button>
            ))}
            {filteredCities.length === 0 && (
              <div className="px-4 py-3 text-sm text-white/40">
                No cities found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsOpen(false);
            setSearchQuery('');
          }}
        />
      )}
    </div>
  );
}
