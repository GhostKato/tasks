import { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.auth.user);
