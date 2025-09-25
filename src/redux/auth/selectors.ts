import { RootState } from '../store';

// Selector for obtaining a user
export const selectUser = (state: RootState) => state.auth.user;
// Account loading selector
export const selectLoading = (state: RootState) => state.auth.loading;
// Account error loading selector
export const selectError = (state: RootState) => state.auth.error;
// User login selector
export const selectIsLoggedIn = (state: RootState) => Boolean(state.auth.user);
