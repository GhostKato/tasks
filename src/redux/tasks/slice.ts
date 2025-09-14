import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { fetchTasks, addTask, updateTask, deleteTask } from './operations';

interface TasksState {
  allTasks: ITask[];
  filteredTasks: ITask[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: TasksState = {
  allTasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
  searchQuery: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredTasks = state.allTasks.filter(task =>
        task.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.loading = false;
        state.allTasks = action.payload;
        state.filteredTasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
      })

      .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks.push(action.payload);
        state.filteredTasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks = state.allTasks.map(t => t.id === action.payload.id ? action.payload : t);
        state.filteredTasks = state.filteredTasks.map(t => t.id === action.payload.id ? action.payload : t);
      })

      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.allTasks = state.allTasks.filter(t => t.id !== action.payload);
        state.filteredTasks = state.filteredTasks.filter(t => t.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = tasksSlice.actions;
export default tasksSlice.reducer;
