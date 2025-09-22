import { RootState } from '../store';

// Theme change selector
export const selectLanguage = (state: RootState) => state.language.language;

// Text selector
export const selectTranslations = (state: RootState) => state.language.t;
