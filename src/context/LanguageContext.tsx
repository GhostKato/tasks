// LanguageContext.tsx
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en, ua, pl, Translations } from '../constants/translations';

const LANGUAGE_KEY = 'APP_LANGUAGE';

export type LanguageCode = 'en' | 'ua' | 'pl';

type LanguageContextType = {
  t: Translations;
  language: LanguageCode; 
  setLanguage: (lang: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  t: en,
  language: 'en', 
  setLanguage: () => {},
});

const translationsMap: Record<LanguageCode, Translations> = { en, ua, pl };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('ua');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const stored = await AsyncStorage.getItem(LANGUAGE_KEY) as LanguageCode | null;
        if (stored && stored in translationsMap) {
          setLanguageState(stored);
        }
      } catch (e) {
        console.error('Error loading language:', e);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {
      console.error('Error saving language:', e);
    }
  };

  return (
    <LanguageContext.Provider value={{ t: translationsMap[language], language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);
