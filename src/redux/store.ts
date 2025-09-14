import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import filtersReducer from './filters/slice';
import tasksReducer from './tasks/slice';
import settingsReducer from './settings/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    tasks: tasksReducer,
    theme: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
