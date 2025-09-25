import { RootState } from '../store';

// Task state selector
export const selectTasksState = (state: RootState) => state.tasks;
// Selector of all tasks
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;
// Selector of marked tasks
export const selectMarkedTasks = (state: RootState) => state.tasks.markedTasks;
// Task load selector
export const selectTasksLoading = (state: RootState) => state.tasks.loading;


