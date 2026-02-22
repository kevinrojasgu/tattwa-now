import { useState, useCallback, useMemo } from 'react';
import { useLocation } from './hooks/useLocation';
import { useTattwa } from './hooks/useTattwa';
import { TattwaCard } from './components/TattwaCard';
import { Timeline } from './components/Timeline';
import { MoonPhaseComponent } from './components/MoonPhase';
import { LocationPicker } from './components/LocationPicker';
import { TattwaReference } from './components/TattwaReference';
import { MiniMap } from './components/MiniMap';
import { TimeNavigator } from './components/TimeNavigator';
import { LanguageContext } from './hooks/useLanguage';
import { TRANSLATIONS, detectBrowserLang } from './lib/i18n';
import type { Lang } from './lib/i18n';

function App() {
  const { location, autoDetect, setManualLocation } = useLocation();

  // Language detection: read from browser / localStorage on first render
  const [lang, setLang] = useState<Lang>(() => detectBrowserLang());

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'es' : 'en';
      localStorage.setItem('tattwa-lang', next);
      return next;
    });
  }, []);

  const langCtx = useMemo(
    () => ({ lang, t: TRANSLATIONS[lang], toggleLang }),
    [lang, toggleLang]
  );

  const t = TRANSLATIONS[lang];

  // null = live (current time), Date = time-travel to that moment
  const [viewedDate, setViewedDate] = useState<Date | null>(null);

  // Which overlay panel is open — only one at a time
  const [openPanel, setOpenPanel] = useState<'location' | 'time' | null>(null);

  const toggleLocation = useCallback(
    () => setOpenPanel((p) => (p === 'location' ? null : 'location')),
    []
  );
  const closeAll = useCallback(() => setOpenPanel(null), []);
  const handlePickerOpenChange = useCallback(
    (open: boolean) => setOpenPanel(open ? 'time' : null),
    []
  );

  const state = useTattwa(location.lat, location.lng, viewedDate);

  const handleGoLive = useCallback(() => setViewedDate(null), []);
  const handleDateChange = useCallback((d: Date) => setViewedDate(d), []);

  const isLive = viewedDate === null;

  if (!state) {
    return (
      <LanguageContext.Provider value={langCtx}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/50 text-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white/40 animate-breathe" />
              <span className="animate-fade-in-up">{t.loading}</span>
            </div>
          </div>
        </div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={langCtx}>
      <div className="min-h-screen px-4 py-6 sm:px-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <header className="flex items-center justify-between animate-fade-in-up">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white/90 tracking-tight">
                {t.appTitle}
              </h1>
              <p className="text-xs sm:text-sm text-white/40 mt-0.5">
                {t.appSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className="text-xs font-semibold tracking-wider px-2.5 py-1.5 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 transition-all duration-200 active:scale-95 border border-white/10"
                title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              >
                {t.switchLang}
              </button>
              <LocationPicker
                location={location}
                onAutoDetect={autoDetect}
                onManualSelect={setManualLocation}
                isOpen={openPanel === 'location'}
                onToggle={toggleLocation}
                onClose={closeAll}
              />
            </div>
          </header>

          {/* Time Navigator — Now button & DateTimePicker */}
          <TimeNavigator
            viewedDate={viewedDate}
            onGoLive={handleGoLive}
            onDateChange={handleDateChange}
            isPickerOpen={openPanel === 'time'}
            onPickerOpenChange={handlePickerOpenChange}
          />

          {/* Main Tattwa Card */}
          <div className="animate-fade-in-up stagger-1">
            <TattwaCard state={state.tattwa} isLive={isLive} viewedDate={state.viewedDate} />
          </div>

          {/* Mini Map */}
          <MiniMap
            lat={location.lat}
            lng={location.lng}
            locationName={location.name}
          />
          {/* Timeline */}
          <div className="animate-fade-in-up stagger-4 height-[300px]">
            <Timeline
              now={state.viewedDate}
              lat={location.lat}
              lng={location.lng}
            />
          </div>

          {/* Moon Phase & Breathing */}
          <div className="animate-fade-in-up stagger-5">
            <MoonPhaseComponent moon={state.moon} sun={state.sun} />
          </div>

          {/* Reference */}
          <div className="animate-fade-in-up stagger-6">
            <TattwaReference currentTattwa={state.tattwa.tattwa} />
          </div>

          {/* Footer */}
          <footer className="text-center text-xs text-white/20 pb-4 animate-fade-in-up stagger-7">
            {t.footer}
          </footer>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
