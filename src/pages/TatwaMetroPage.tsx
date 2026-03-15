/**
 * @file TatwaMetroPage.tsx
 * @description Dedicated full-page view for the Tatwa Meter instrument.
 * Accessible at `/tattwametter`. Shows the shared app header, the
 * TimeNavigator date selector, and the TatwaMetro dial — all reacting
 * to the same selected datetime. The dial fills the available width up
 * to 480px so it feels like a proper instrument panel on any screen size.
 */

import React, { useState, useCallback, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from '../controllers/useLocation';
import { useTattwa } from '../controllers/useTattwa';
import { useScrollToTop } from '../controllers/useScrollToTop';
import { useLanguage } from '../controllers/useLanguage';
import { LocationPicker } from '../components/organisms/LocationPicker';
import { TimeNavigator } from '../components/organisms/TimeNavigator';
import { Spinner } from '../components/atoms/Spinner';
import { AppLayout } from '../components/templates/AppLayout';
import { TATTWAS } from '../data/tattwaData';

/** Lazy-load the heavy dial — it's the only thing on this page but still split */
const TatwaMetro = React.lazy(() =>
  import('../components/organisms/TatwaMetro').then((m) => ({ default: m.TatwaMetro }))
);

/**
 * Dedicated page for the TatwaMetro instrument.
 * URL: /tattwametter
 *
 * Shares the same language context and location hooks as the home page.
 * Manages its own `viewedDate` and `openPanel` state independently.
 */
export function TatwaMetroPage(): React.JSX.Element {
  const { t, lang, toggleLang } = useLanguage();
  const { location, autoDetect, setManualLocation } = useLocation();

  /** null = live mode, Date = time-travel to that moment */
  const [viewedDate, setViewedDate] = useState<Date | null>(null);

  /** Only one overlay panel open at a time */
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
  const handleGoLive = useCallback((): void => setViewedDate(null), []);
  const handleDateChange = useCallback((d: Date): void => setViewedDate(d), []);

  const state = useTattwa(location.lat, location.lng, viewedDate);

  // Scroll to top whenever the user jumps to a different date
  useScrollToTop(viewedDate);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <div className="w-2 h-2 rounded-full bg-white/40 animate-breathe" />
          <span className="animate-fade-in-up">{t.loading}</span>
        </div>
      </div>
    );
  }

  const colorHex = TATTWAS[state.tattwa.tattwa]?.colorHex ?? '#4a4a5a';

  /** Subtle ambient glow matching the current tattwa — static on this page */
  const backgroundOverlay = (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: `radial-gradient(ellipse at 50% 60%, ${colorHex}20 0%, transparent 65%)`,
        transition: 'background 2s ease',
        opacity: 0.6,
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
    <footer className="text-center text-xs text-white/20 pb-4 animate-fade-in-up">
      {t.footer}
    </footer>
  );

  return (
    <AppLayout header={header} footer={footer} backgroundOverlay={backgroundOverlay}>
      {/* Back to home */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95 -mt-1 mb-1"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.5 10.5 3 6l4.5-4.5" />
        </svg>
        {t.appTitle}
      </Link>

      {/* Date/time selector — same as home page */}
      <TimeNavigator
        viewedDate={viewedDate}
        onGoLive={handleGoLive}
        onDateChange={handleDateChange}
        isPickerOpen={openPanel === 'time'}
        onPickerOpenChange={handlePickerOpenChange}
        lat={location.lat}
        lng={location.lng}
      />

      {/* The instrument — larger on this dedicated page */}
      <div className="animate-fade-in-up stagger-1">
        <Suspense fallback={<Spinner />}>
          <TatwaMetro
            state={state.tattwa}
            sunrise={state.tattwa.sunrise}
            viewedDate={viewedDate}
            maxSize={480}
          />
        </Suspense>
      </div>
    </AppLayout>
  );
}
