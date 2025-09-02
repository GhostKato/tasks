import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, ThemeColors } from '../constants/theme';

type ThemeContextType = {
  color: ThemeColors; 
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'dark') setIsDark(true);
        if (savedTheme === 'light') setIsDark(false);
      } catch (e) {
        console.log('Помилка при завантаженні теми:', e);
      }
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('theme', isDark ? 'dark' : 'light');
      } catch (e) {
        console.log('Помилка при збереженні теми:', e);
      }
    })();
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{ color: isDark ? darkTheme : lightTheme, isDark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
};
