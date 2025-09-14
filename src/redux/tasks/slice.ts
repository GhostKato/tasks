import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { fetchTasks, addTask, updateTask, deleteTask } from './operations';

interface TasksState {
  allTasks: ITask[];
  filteredTasks: ITask[];
  favoriteTasks: ITask[]; 
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: TasksState = {
  allTasks: [],
  filteredTasks: [],
  favoriteTasks: [], 
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

    // ✅ toggleFavorite
    toggleFavorite(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const taskIndex = state.allTasks.findIndex(t => t.id === taskId);

      if (taskIndex !== -1) {
        // міняємо значення isFavorite
        state.allTasks[taskIndex].isFavorite = !state.allTasks[taskIndex].isFavorite;

        if (state.allTasks[taskIndex].isFavorite) {
          // додаємо у favoriteTasks
          state.favoriteTasks.push(state.allTasks[taskIndex]);
        } else {
          // видаляємо з favoriteTasks
          state.favoriteTasks = state.favoriteTasks.filter(t => t.id !== taskId);
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
        state.favoriteTasks = action.payload.filter(t => t.isFavorite); // ✅ ініціалізація фаворитів
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
      })

      .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks.push(action.payload);
        state.filteredTasks.push(action.payload);
        if (action.payload.isFavorite) {
          state.favoriteTasks.push(action.payload); // якщо нова таска зразу фаворит
        }
      })

      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.allTasks = state.allTasks.map(t => t.id === action.payload.id ? action.payload : t);
        state.filteredTasks = state.filteredTasks.map(t => t.id === action.payload.id ? action.payload : t);

        // оновлюємо favoriteTasks
        if (action.payload.isFavorite) {
          const exists = state.favoriteTasks.find(t => t.id === action.payload.id);
          if (!exists) {
            state.favoriteTasks.push(action.payload);
          } else {
            state.favoriteTasks = state.favoriteTasks.map(t => t.id === action.payload.id ? action.payload : t);
          }
        } else {
          state.favoriteTasks = state.favoriteTasks.filter(t => t.id !== action.payload.id);
        }
      })

      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.allTasks = state.allTasks.filter(t => t.id !== action.payload);
        state.filteredTasks = state.filteredTasks.filter(t => t.id !== action.payload);
        state.favoriteTasks = state.favoriteTasks.filter(t => t.id !== action.payload);
      });
  },
});

export const { setSearchQuery, toggleFavorite } = tasksSlice.actions;
export default tasksSlice.reducer;
