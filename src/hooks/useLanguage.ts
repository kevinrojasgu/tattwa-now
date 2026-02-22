import { createContext, useContext } from 'react';
import type { Lang, Translations } from '../lib/i18n';
import { TRANSLATIONS } from '../lib/i18n';

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  t: TRANSLATIONS.en,
  toggleLang: () => {},
});

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
