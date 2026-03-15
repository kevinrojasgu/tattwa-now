import React from 'react';
/**
 * @file MiniMap.tsx
 * @description Mini map organism. Shows a collapsible Leaflet map with a
 * pulsing marker at the user's selected location. Uses CartoDB Dark Matter
 * tiles for a dark aesthetic consistent with the rest of the app.
 */

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/** Props for MiniMap */
interface MiniMapProps {
  /** Observer latitude */
  lat: number;
  /** Observer longitude */
  lng: number;
  /** Human-readable location name */
  locationName: string;
}

/**
 * Collapsible map showing the current observation location.
 * Click the card to expand or collapse the map height.
 *
 * @param lat - Latitude to center the map on
 * @param lng - Longitude to center the map on
 * @param locationName - Display name shown in the header
 */
export function MiniMap({ lat, lng, locationName }: MiniMapProps): React.JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current) return;
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
      }).setView([lat, lng], 11);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      const pulseIcon = L.divIcon({
        className: '',
        html: '<div class="map-marker-pulse"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const marker = L.marker([lat, lng], { icon: pulseIcon }).addTo(map);
      mapInstanceRef.current = map;
      markerRef.current = marker;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update center when coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([lat, lng], 11, { animate: true, duration: 1 });
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng]);

  // Re-measure map size when expanded/collapsed
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => { mapInstanceRef.current?.invalidateSize({ animate: true }); }, 350);
    }
  }, [isExpanded]);

  return (
    <div
      className="animate-fade-in-up stagger-3 glass-card rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-breathe" />
          <h3 className="text-sm uppercase tracking-wider text-white/50">Your Location</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span>{locationName}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Map */}
      <div
        className="transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ height: isExpanded ? '200px' : '120px' }}
      >
        <div ref={mapRef} className="w-full h-full" style={{ minHeight: '120px' }} />
      </div>

      {/* Footer */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-white/30 border-t border-white/5">
        <span className="font-mono tabular-nums">
          {lat.toFixed(4)}°N, {lng.toFixed(4)}°W
        </span>
        <span className="text-white/20 group-hover:text-white/40 transition-colors">
          {isExpanded ? 'click to collapse' : 'click to expand'}
        </span>
      </div>
    </div>
  );
}
