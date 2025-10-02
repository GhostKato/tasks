import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../../i18.config';
import { AppDispatch } from '../store';

const LANGUAGE_KEY = 'APP_LANGUAGE';

export type LanguageCode = 'en' | 'uk' | 'pl';

export interface ILanguageState {
  language: LanguageCode;
}

const initialState: ILanguageState = {
  language: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageCode>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

export const changeLanguage =
  (lang: LanguageCode) => async (dispatch: AppDispatch) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
      i18n.changeLanguage(lang);
      dispatch(setLanguage(lang));
    } catch (e) {
      console.error('Error saving language:', e);
    }
  };

export const loadLanguage = () => async (dispatch: AppDispatch) => {
  try {
    const stored = (await AsyncStorage.getItem(LANGUAGE_KEY)) as LanguageCode | null;
    if (stored) {
      i18n.changeLanguage(stored);
      dispatch(setLanguage(stored));
    }
  } catch (e) {
    console.error('Error loading language:', e);
  }
};
