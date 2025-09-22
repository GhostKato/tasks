import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, ThemeColors } from '../../constants/theme';

interface ThemeState {
  isDark: boolean;
  color: ThemeColors;
}

const initialState: ThemeState = {
  isDark: false,
  color: lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
      state.color = action.payload ? darkTheme : lightTheme;
      AsyncStorage.setItem('theme', action.payload ? 'dark' : 'light').catch((e) =>
        console.log('Error saving topic:', e)
      );
    },
    toggleTheme(state) {
      state.isDark = !state.isDark;
      state.color = state.isDark ? darkTheme : lightTheme;
      AsyncStorage.setItem('theme', state.isDark ? 'dark' : 'light').catch((e) =>
        console.log('Error saving topic:', e)
      );
    },
  },
});

export const { setDarkMode, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const loadTheme = () => async (dispatch: any) => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme === 'dark') dispatch(setDarkMode(true));
    if (savedTheme === 'light') dispatch(setDarkMode(false));
  } catch (e) {
    console.log('Error saving topic:', e);
  }
};
