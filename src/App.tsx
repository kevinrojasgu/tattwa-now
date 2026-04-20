/**
 * @file App.tsx
 * @description Root application component. Provides LanguageContext to the
 * entire app and owns client-side routing. Each route renders its own page
 * component that manages its own local state (viewedDate, openPanel).
 *
 * Routes:
 *   /             → Home page (TattwaCard + full dashboard)
 *   /tattwameter → Dedicated Tattwa Meter instrument page
 */

import React, { useState, useCallback, useMemo, useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TATTWAS } from './data/tattwaData';
import { useLocation } from './controllers/useLocation';
import { useTattwa } from './controllers/useTattwa';
import { useScrollToTop } from './controllers/useScrollToTop';
import { LanguageContext } from './controllers/useLanguage';
import { TRANSLATIONS, detectBrowserLang } from './services/i18n.service';
import { TattwaMetroPage } from './pages/TattwaMetroPage';
import type { Lang } from './types';

// Above-fold components (NOT lazy-loaded)
import { TattwaCard } from './components/organisms/TattwaCard';
import { TimeNavigator } from './components/organisms/TimeNavigator';
import { LocationPicker } from './components/organisms/LocationPicker';
import { AppLayout } from './components/templates/AppLayout';
import { Spinner } from './components/atoms/Spinner';

// Below-fold organisms (lazy-loaded for code splitting)
const Timeline = React.lazy(() => import('./components/organisms/Timeline').then((m) => ({ default: m.Timeline })));
const MoonPhasePanel = React.lazy(() => import('./components/organisms/MoonPhasePanel').then((m) => ({ default: m.MoonPhasePanel })));
const TattwaReference = React.lazy(() => import('./components/organisms/TattwaReference').then((m) => ({ default: m.TattwaReference })));
const MiniMap = React.lazy(() => import('./components/organisms/MiniMap').then((m) => ({ default: m.MiniMap })));
const TattwaMetro = React.lazy(() => import('./components/organisms/TattwaMetro').then((m) => ({ default: m.TattwaMetro })));

/**
 * Root application component.
 *
 * @returns The fully rendered app wrapped in LanguageContext
 */
function App(): React.JSX.Element {
  const { location, autoDetect, setManualLocation } = useLocation();

  // Language detection from browser / localStorage
  const [lang, setLang] = useState<Lang>(() => detectBrowserLang());

  const toggleLang = useCallback((): void => {
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

  // null = live mode, Date = time-travel
  const [viewedDate, setViewedDate] = useState<Date | null>(null);

  // Only one overlay panel open at a time
  const [openPanel, setOpenPanel] = useState<'location' | 'time' | null>(null);

  const toggleLocation = useCallback(
    (): void => setOpenPanel((p) => (p === 'location' ? null : 'location')),
    []
  );
  const closeAll = useCallback((): void => setOpenPanel(null), []);
  const handlePickerOpenChange = useCallback(
    (open: boolean): void => setOpenPanel(open ? 'time' : null),
    []
  );

  const state = useTattwa(location.lat, location.lng, viewedDate);

  const handleGoLive = useCallback((): void => setViewedDate(null), []);
  const handleDateChange = useCallback((d: Date): void => setViewedDate(d), []);

  const isLive = viewedDate === null;

  // Scroll-to-top whenever the viewed date changes
  useScrollToTop(viewedDate);

  // Scroll-driven background tint
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = (): void => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const colorHex = TATTWAS[state.tattwa.tattwa]?.colorHex ?? '#4a4a5a';

  // Scroll-driven background overlay
  const backgroundOverlay = (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: `radial-gradient(ellipse at 20% 80%, ${colorHex}33 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 20%, ${colorHex}22 0%, transparent 50%)`,
        opacity: scrollProgress * 0.85,
        transition: 'background 2s ease, opacity 0.3s ease',
      }}
    />
  );

  const header = (
    <header className="flex items-center justify-between animate-fade-in-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white/90 tracking-tight">
          {t.appTitle}
        </h1>
        <p className="text-xs sm:text-sm text-white/40 mt-0.5">{t.appSubtitle}</p>
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
  );

  const footer = (
    <footer className="text-center text-xs text-white/20 pb-4 animate-fade-in-up stagger-7">
      {t.footer}
    </footer>
  );

  const homePage = (
    <AppLayout header={header} footer={footer} backgroundOverlay={backgroundOverlay}>
      {/* Time Navigator */}
      <TimeNavigator
        viewedDate={viewedDate}
        onGoLive={handleGoLive}
        onDateChange={handleDateChange}
        isPickerOpen={openPanel === 'time'}
        onPickerOpenChange={handlePickerOpenChange}
        lat={location.lat}
        lng={location.lng}
      />

      {/* Main Tattwa Card — above fold, not lazy */}
      <div className="animate-fade-in-up stagger-1">
        <TattwaCard state={state.tattwa} isLive={isLive} viewedDate={state.viewedDate} />
      </div>

      {/* TattwaMetro — between TattwaCard and MiniMap */}
      <Suspense fallback={<Spinner />}>
        <TattwaMetro
          state={state.tattwa}
          sunrise={state.tattwa.sunrise}
          viewedDate={viewedDate}
        />
      </Suspense>

      {/* Mini Map */}
      <Suspense fallback={<Spinner />}>
        <MiniMap
          lat={location.lat}
          lng={location.lng}
          locationName={location.name}
        />
      </Suspense>

      {/* Timeline */}
      <div className="animate-fade-in-up stagger-4">
        <Suspense fallback={<Spinner />}>
          <Timeline
            now={state.viewedDate}
            lat={location.lat}
            lng={location.lng}
          />
        </Suspense>
      </div>

      {/* Moon Phase & Breathing */}
      <div className="animate-fade-in-up stagger-5">
        <Suspense fallback={<Spinner />}>
          <MoonPhasePanel moon={state.moon} sun={state.sun} />
        </Suspense>
      </div>

      {/* Reference */}
      <div className="animate-fade-in-up stagger-6">
        <Suspense fallback={<Spinner />}>
          <TattwaReference currentTattwa={state.tattwa.tattwa} />
        </Suspense>
      </div>
    </AppLayout>
  );

  return (
    <LanguageContext.Provider value={langCtx}>
      <Routes>
        <Route path="/" element={homePage} />
        <Route path="/tattwameter" element={<TattwaMetroPage />} />
      </Routes>
    </LanguageContext.Provider>
  );
}

export default App;
