import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  searchQuery: string; 
  timeStamp: boolean;
  status: 'done' | 'undone' | 'inProgress' | null;
  priority: 'high' | 'medium' | 'low' | null;
  date: 'today' | 'week' | 'overdue' | null;
  category: 'work' | 'personal' | 'study' | null;
}

const initialState: FiltersState = {
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
    setFilter<T extends keyof FiltersState>(
      state: FiltersState,
      action: PayloadAction<{ key: T; value: FiltersState[T] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    toggleTimeStamp(state: FiltersState) {
      state.timeStamp = !state.timeStamp;
    },
    resetFilters(state: FiltersState) {
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
