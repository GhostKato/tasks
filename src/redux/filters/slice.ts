import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFiltersState {
  searchQuery: string; 
  timeStamp: boolean;
  status: 'done' | 'undone' | 'inProgress' | null;
  priority: 'high' | 'medium' | 'low' | null;
  date: 'today' | 'week' | 'overdue' | null;
  category: 'work' | 'personal' | 'study' | null;
}

export const initialState: IFiltersState = {
  searchQuery: '',
  timeStamp: false,
  status: null,
  priority: null,
  date: null,
  category: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter<T extends keyof IFiltersState>(
      state: IFiltersState,
      action: PayloadAction<{ key: T; value: IFiltersState[T] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    toggleTimeStamp(state: IFiltersState) {
      state.timeStamp = !state.timeStamp;
    },
    resetFilters(state: IFiltersState) {
      state.searchQuery = '';
      state.timeStamp = false;
      state.status = null;
      state.priority = null;
      state.date = null;
      state.category = null;
    },
  },
});

export const { setFilter, toggleTimeStamp, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
