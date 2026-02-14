import { useLocation } from './hooks/useLocation';
import { useTattwa } from './hooks/useTattwa';
import { TattwaCard } from './components/TattwaCard';
import { Timeline } from './components/Timeline';
import { MoonPhaseComponent } from './components/MoonPhase';
import { LocationPicker } from './components/LocationPicker';
import { TattwaReference } from './components/TattwaReference';

function App() {
  const { location, autoDetect, setManualLocation } = useLocation();
  const state = useTattwa(location.lat, location.lng);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/50 text-lg animate-pulse">
          Calculating vibrations...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white/90 tracking-tight">
              Tatva Now
            </h1>
            <p className="text-xs sm:text-sm text-white/40 mt-0.5">
              Las Vibraciones del Eter
            </p>
          </div>
          <LocationPicker
            location={location}
            onAutoDetect={autoDetect}
            onManualSelect={setManualLocation}
          />
        </header>

        {/* Main Tattwa Card */}
        <TattwaCard state={state.tattwa} />

        {/* Timeline */}
        <Timeline
          now={new Date()}
          lat={location.lat}
          lng={location.lng}
        />

        {/* Moon Phase & Breathing */}
        <MoonPhaseComponent moon={state.moon} sun={state.sun} />

        {/* Reference */}
        <TattwaReference currentTattwa={state.tattwa.tattwa} />

        {/* Footer */}
        <footer className="text-center text-xs text-white/20 pb-4">
          Based on "El Tatwametro" by Dr. Arnold Krumm-Heller (Maestro Huiracocha)
        </footer>
      </div>
    </div>
  );
}

export default App;
