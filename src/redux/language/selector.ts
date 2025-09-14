import { RootState } from '../store';

export const selectLanguage = (state: RootState) => state.language.language;
export const selectTranslations = (state: RootState) => state.language.t;
