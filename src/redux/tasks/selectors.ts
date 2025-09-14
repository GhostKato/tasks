import { RootState } from '../store';

export const selectTasksState = (state: RootState) => state.tasks;
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;
export const selectFilteredTasks = (state: RootState) => state.tasks.filteredTasks;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
