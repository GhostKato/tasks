import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { fetchTasks, addTask, updateTask, deleteTask } from './operations';

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
  reducers: {    
    toggleMarked(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const taskIndex = state.allTasks.findIndex(t => t.id === taskId);

      if (taskIndex !== -1) {
        state.allTasks[taskIndex].isMarked = !state.allTasks[taskIndex].isMarked;

        if (state.allTasks[taskIndex].isMarked) {
          state.markedTasks.push(state.allTasks[taskIndex]);
        } else {
          state.markedTasks = state.markedTasks.filter(t => t.id !== taskId);
        }
      }
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
        state.markedTasks = action.payload.filter(t => t.isMarked);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks.push(action.payload);
        if (action.payload.isMarked) {
          state.markedTasks.push(action.payload);
        }
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks = state.allTasks.map(t => t.id === action.payload.id ? action.payload : t);

        if (action.payload.isMarked) {
          const exists = state.markedTasks.find(t => t.id === action.payload.id);
          if (!exists) {
            state.markedTasks.push(action.payload);
          } else {
            state.markedTasks = state.markedTasks.map(t => t.id === action.payload.id ? action.payload : t);
          }
        } else {
          state.markedTasks = state.markedTasks.filter(t => t.id !== action.payload.id);
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.allTasks = state.allTasks.filter(t => t.id !== action.payload);
        state.markedTasks = state.markedTasks.filter(t => t.id !== action.payload);
      });
  },
});

export const { toggleMarked } = tasksSlice.actions;
export default tasksSlice.reducer;
