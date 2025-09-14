import { RootState } from '../store'; 

export const selectIsDark = (state: RootState) => state.theme.isDark;
export const selectThemeColors = (state: RootState) => state.theme.color;
