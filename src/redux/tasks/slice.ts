import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { fetchTasks, addTask, updateTask, deleteTask } from './operations';

interface TasksState {
  allTasks: ITask[];
  filteredTasks: ITask[];
  markedTasks: ITask[]; 
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: TasksState = {
  allTasks: [],
  filteredTasks: [],
  markedTasks: [], 
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

    // ✅ toggleMarked
    toggleFavorite(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const taskIndex = state.allTasks.findIndex(t => t.id === taskId);

      if (taskIndex !== -1) {
        // міняємо значення isMarked
        state.allTasks[taskIndex].isMarked = !state.allTasks[taskIndex].isMarked;

        if (state.allTasks[taskIndex].isMarked) {
          // додаємо у markedTasks
          state.markedTasks.push(state.allTasks[taskIndex]);
        } else {
          // видаляємо з markedTasks
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
        state.filteredTasks = action.payload;
        state.markedTasks = action.payload.filter(t => t.isMarked); // ✅ ініціалізація відмічених
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
      })

      .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks.push(action.payload);
        state.filteredTasks.push(action.payload);
        if (action.payload.isMarked) {
          state.markedTasks.push(action.payload); // якщо нова таска зразу відміченна
        }
      })

      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks = state.allTasks.map(t => t.id === action.payload.id ? action.payload : t);
        state.filteredTasks = state.filteredTasks.map(t => t.id === action.payload.id ? action.payload : t);

        // оновлюємо markedTasks
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
        state.filteredTasks = state.filteredTasks.filter(t => t.id !== action.payload);
        state.markedTasks = state.markedTasks.filter(t => t.id !== action.payload);
      });
  },
});

export const { setSearchQuery, toggleFavorite } = tasksSlice.actions;
export default tasksSlice.reducer;
