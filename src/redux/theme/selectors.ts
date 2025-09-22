import { RootState } from '../store';

// Theme change selector
export const selectIsDark = (state: RootState) => state.theme.isDark;
// Color selector
export const selectThemeColors = (state: RootState) => state.theme.color;
