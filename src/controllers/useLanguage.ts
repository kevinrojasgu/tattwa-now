/**
 * @file useLanguage.ts
 * @description Language context and hook for i18n. Provides the current
 * language, translation object, and toggle function to all child components
 * via React context.
 */

import { createContext, useContext } from 'react';
import type { Lang, Translations } from '../types';
import { TRANSLATIONS } from '../services/i18n.service';

/** Shape of the LanguageContext value */
interface LanguageContextValue {
  /** Current active language code */
  lang: Lang;
  /** Translation object for the current language */
  t: Translations;
  /** Toggle between 'en' and 'es' */
  toggleLang: () => void;
}

/**
 * Context that provides language state to the component tree.
 * Must be wrapped with LanguageContext.Provider in App.tsx.
 */
export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  t: TRANSLATIONS.en,
  toggleLang: () => {},
});

/**
 * Hook to consume the language context.
 *
 * @returns Object with { lang, t, toggleLang }
 *
 * @example
 * const { t, lang, toggleLang } = useLanguage();
 * return <h1>{t.appTitle}</h1>;
 */
export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
