import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ITask } from '../../types/task';

const selectAllTasks = (state: RootState) => state.tasks.allTasks;
const selectFilters = (state: RootState) => state.filters;

// Селектор для відфільтрованих задач
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

// Селектор завантаження задач
export const selectTasksLoading = (state: RootState) => state.tasks.loading;

// Селектор помилки задач
export const selectTasksError = (state: RootState) => state.tasks.error;
