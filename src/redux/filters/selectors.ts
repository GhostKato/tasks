import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Селектор для всіх задач
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;

// Селектор для фільтрів
export const selectFilters = (state: RootState) => state.filters;

// Селектор для відфільтрованих задач
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) => {
    const now = new Date();

    return tasks.filter(task => {
      // Статус
      const statusMatch = filters.status ? task.status === filters.status : true;
      // Пріоритет
      const priorityMatch = filters.priority ? task.priority === filters.priority : true;
      // Категорія
      const categoryMatch = filters.category ? task.category === filters.category : true;

      // Дата
      let dateMatch = true;
      if (filters.date) {
        const taskDate = new Date(task.deadline);
        switch (filters.date) {
          case 'today':
            dateMatch =
              taskDate.getDate() === now.getDate() &&
              taskDate.getMonth() === now.getMonth() &&
              taskDate.getFullYear() === now.getFullYear();
            break;
          case 'week':
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            dateMatch = taskDate >= startOfWeek && taskDate <= endOfWeek;
            break;
          case 'overdue':
            dateMatch = taskDate < now;
            break;
        }
      }

      return statusMatch && priorityMatch && categoryMatch && dateMatch;
    });
  }
);

// Селектор завантаження задач
export const selectTasksLoading = (state: RootState) => state.tasks.loading;

// Селектор помилки задач
export const selectTasksError = (state: RootState) => state.tasks.error;
