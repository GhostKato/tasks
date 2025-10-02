import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { fetchTasks, addTask, updateTask, deleteTask, toggleMarked } from './operations';
import { logoutUser } from '../auth/operations';

interface TasksState {
  allTasks: ITask[];
  markedTasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  allTasks: [],
  markedTasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
        state.loading = false;
        state.allTasks = action.payload;
        state.markedTasks = action.payload.filter(t => t.isMarked);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks.push(action.payload);
        if (action.payload.isMarked) state.markedTasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks = state.allTasks.map(t => t.id === action.payload.id ? action.payload : t);
        state.markedTasks = state.allTasks.filter(t => t.isMarked);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.allTasks = state.allTasks.filter(t => t.id !== action.payload);
        state.markedTasks = state.markedTasks.filter(t => t.id !== action.payload);
      })
      .addCase(toggleMarked.fulfilled, (state, action: PayloadAction<{ taskId: string; isMarked: boolean }>) => {
        const updatedTasks = state.allTasks.map(t =>
          t.id === action.payload.taskId ? { ...t, isMarked: action.payload.isMarked } : t
        );
        state.allTasks = updatedTasks;
        state.markedTasks = updatedTasks.filter(t => t.isMarked);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.allTasks = [];
        state.markedTasks = [];
    });
  }, 
});

export default tasksSlice.reducer;
