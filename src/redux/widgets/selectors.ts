import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';

// Функція для фільтрації за датою
const getDateFilter = (deadline: string) => {
  const now = new Date();
  const due = new Date(deadline);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  if (due >= startOfToday && due < endOfToday) return 'today';
  if (due > endOfToday && due <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) return 'week';
  if (due < startOfToday) return 'overdue';
  return 'week';
};

export const selectAllTasks = (state: RootState) => state.tasks.allTasks;

// Мемоїзований селектор для всіх віджетів одразу
export const selectTasksByWidget = createSelector(
  selectAllTasks,
  (allTasks: ITask[]) => ({
    undone: allTasks.filter(t => t.status === 'undone'),
    inProgress: allTasks.filter(t => t.status === 'inProgress'),
    done: allTasks.filter(t => t.status === 'done'),
    low: allTasks.filter(t => t.priority === 'low'),
    medium: allTasks.filter(t => t.priority === 'medium'),
    high: allTasks.filter(t => t.priority === 'high'),
    today: allTasks.filter(t => getDateFilter(t.deadline) === 'today'),
    week: allTasks.filter(t => getDateFilter(t.deadline) === 'week'),
    overdue: allTasks.filter(t => getDateFilter(t.deadline) === 'overdue'),
    work: allTasks.filter(t => t.category === 'work'),
    personal: allTasks.filter(t => t.category === 'personal'),
    study: allTasks.filter(t => t.category === 'study'),
  })
);

// Селектор для стану віджетів (включені/виключені)
export const selectWidgets = (state: RootState) => state.widgets;
