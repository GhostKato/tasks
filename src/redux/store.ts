import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import filtersReducer from './filters/slice';
import tasksReducer from './tasks/slice';
import themeReducer from '../redux/theme/slice'
import languageReducer from '../redux/language/slice';
import widgetsReducer from '../redux/widgets/slice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    tasks: tasksReducer,
    theme: themeReducer,
    language: languageReducer,
    widgets: widgetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
