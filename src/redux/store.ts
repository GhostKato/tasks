import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import filtersReducer from './filters/slice';
import tasksReducer from './tasks/slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
