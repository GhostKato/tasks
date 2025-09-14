import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en, ua, pl, Translations } from '../../constants/translations';

const LANGUAGE_KEY = 'APP_LANGUAGE';

export type LanguageCode = 'en' | 'ua' | 'pl';

interface LanguageState {
  language: LanguageCode;
  t: Translations;
}

const translationsMap: Record<LanguageCode, Translations> = { en, ua, pl };

const initialState: LanguageState = {
  language: 'ua',
  t: ua,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<LanguageCode>) {
      state.language = action.payload;
      state.t = translationsMap[action.payload];
      AsyncStorage.setItem(LANGUAGE_KEY, action.payload).catch((e) =>
        console.error('Помилка при збереженні мови:', e)
      );
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

export const loadLanguage = () => async (dispatch: any) => {
  try {
    const stored = (await AsyncStorage.getItem(LANGUAGE_KEY)) as LanguageCode | null;
    if (stored && stored in translationsMap) {
      dispatch(setLanguage(stored));
    }
  } catch (e) {
    console.error('Помилка при завантаженні мови:', e);
  }
};
