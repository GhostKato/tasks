import { RootState } from '../store';

export const selectTasksState = (state: RootState) => state.tasks;
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;
export const selectMarkedTasks = (state: RootState) => state.tasks.markedTasks;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;


