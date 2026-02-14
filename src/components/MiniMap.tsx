import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MiniMapProps {
  lat: number;
  lng: number;
  locationName: string;
}

export function MiniMap({ lat, lng, locationName }: MiniMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once
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

      // CartoDB Dark Matter tiles for dark theme
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
        }
      ).addTo(map);

      // Custom pulsing marker
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

    return () => {
      // Cleanup on unmount
    };
  }, []);

  // Update map center when coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([lat, lng], 11, { animate: true, duration: 1 });
      markerRef.current.setLatLng([lat, lng]);
    }
  }, [lat, lng]);

  // Invalidate map size when expanded/collapsed
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize({ animate: true });
      }, 350);
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
          <h3 className="text-sm uppercase tracking-wider text-white/50">
            Your Location
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span>{locationName}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Map container */}
      <div
        className="transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          height: isExpanded ? '200px' : '120px',
        }}
      >
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: '120px' }}
        />
      </div>

      {/* Coordinate footer */}
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
