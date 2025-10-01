import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import { mainEN, mainUK, mainPL } from './src/localization';

const resources = {
  en: { translation: mainEN },
  uk: { translation: mainUK },
  pl: { translation: mainPL }
};

const deviceLanguage = getLocales()[0]?.languageCode || 'en';

const langMap: Record<string, string> = {
  uk: 'uk',
  en: 'en',
  pl: 'pl'
};

const lng = langMap[deviceLanguage] || 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    initImmediate: false
  });

export default i18n;
