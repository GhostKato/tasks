import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WidgetsState {
  isUndone: boolean;
  isInProgress: boolean;
  isDone: boolean;
  isLow: boolean;
  isMedium: boolean;
  isHigh: boolean;
  isToday: boolean;
  isWeek: boolean;
  isOverdue: boolean;
  isWork: boolean;
  isPersonal: boolean;
  isStudy: boolean;
}

export const initialState: WidgetsState = {
  isUndone: false,
  isInProgress: false,
  isDone: false,
  isLow: false,
  isMedium: false,
  isHigh: false,
  isToday: false,
  isWeek: false,
  isOverdue: false,
  isWork: false,
  isPersonal: false,
  isStudy: false,
};

const STORAGE_KEY = 'widgets';

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleWidget(state, action: PayloadAction<keyof WidgetsState>) {
  const key = action.payload;
  
  state[key] = !state[key];

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch((e) =>
    console.log('Error saving widgets:', e)
  );
} ,
  resetWidget() {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialState)).catch(
        (e) => console.log('Error resetting widgets:', e)
      );
      return initialState;
    },
    setWidget(_, action: PayloadAction<WidgetsState>) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload)).catch(
        (e) => console.log('Error saving widgets:', e)
      );
      return action.payload;
    },
  },
});

export const { toggleWidget, resetWidget, setWidget } = widgetSlice.actions;
export default widgetSlice.reducer;

export const loadWidget = () => async (dispatch: any) => {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (saved) {
      dispatch(setWidget(JSON.parse(saved)));
    }
  } catch (e) {
    console.log('Error loading widgets:', e);
  }
};
