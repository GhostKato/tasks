import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../../i18.config';
import { en, ua, pl, Translations } from '../../constants/translations';
import { AppDispatch } from '../store';

const LANGUAGE_KEY = 'APP_LANGUAGE';

export type LanguageCode = 'en' | 'ua' | 'pl';

interface LanguageState {
  language: LanguageCode;  
}

const translationsMap: Record<LanguageCode, Translations> = { en, ua, pl };

const initialState: LanguageState = {
  language: 'en',  
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageCode>) {
      state.language = action.payload;     
      
      AsyncStorage.setItem(LANGUAGE_KEY, action.payload).catch((e) =>
        console.error('Error saving language:', e)
      );
      
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

export const loadLanguage = () => async (dispatch: AppDispatch) => {
  try {
    const stored = (await AsyncStorage.getItem(LANGUAGE_KEY)) as LanguageCode | null;
    if (stored && stored in translationsMap) {
      dispatch(setLanguage(stored));
    }
  } catch (e) {
    console.error('Error loading language:', e);
  }
};
