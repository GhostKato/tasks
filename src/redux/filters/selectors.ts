import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ITask } from '../../types/task';
import { initialState } from '../filters/slice';

const selectAllTasks = (state: RootState) => state.tasks.allTasks;
const selectFilters = (state: RootState) => state.filters;

// Selector for filtered tasks
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks: ITask[], filters) => {
    return tasks.filter(task => {      
      const matchesQuery = task.title.toLowerCase().includes(filters.searchQuery.toLowerCase());      
      const matchesStatus = filters.status ? task.status === filters.status : true;      
      const matchesPriority = filters.priority ? task.priority === filters.priority : true;      
      const matchesCategory = filters.category ? task.category === filters.category : true;      
      let matchesDate = true;
      if (filters.date && task.deadline) {
        const now = new Date();
        const deadline = new Date(task.deadline);
        if (filters.date === 'today') {
          matchesDate = deadline.toDateString() === now.toDateString();
        } else if (filters.date === 'week') {
          const weekFromNow = new Date();
          weekFromNow.setDate(now.getDate() + 7);
          matchesDate = deadline >= now && deadline <= weekFromNow;
        } else if (filters.date === 'overdue') {
          matchesDate = deadline < now;
        }
      }
      return matchesQuery && matchesStatus && matchesPriority && matchesCategory && matchesDate;
    });
  }
);

// Task loading selector
export const selectTasksLoading = (state: RootState) => state.tasks.loading;

// Task error selector
export const selectTasksError = (state: RootState) => state.tasks.error;

// Selector of the initial value of filters
export const selectAreFiltersDefault = createSelector(
  [selectFilters],
  (filters) => {
    return (
      filters.searchQuery === initialState.searchQuery &&
      filters.timeStamp === initialState.timeStamp &&
      filters.status === initialState.status &&
      filters.priority === initialState.priority &&
      filters.date === initialState.date &&
      filters.category === initialState.category
    );
  }
);