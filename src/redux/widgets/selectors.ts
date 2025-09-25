import { RootState } from "../store";
import { ITask } from "../../types/task"; 
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

type Status = "done" | "undone" | "inProgress";
type Priority = "high" | "medium" | "low";
type DateFilter = "today" | "week" | "overdue";
type Category = "work" | "personal" | "study";

const statusValues: Status[] = ["done", "undone", "inProgress"];
const priorityValues: Priority[] = ["high", "medium", "low"];
const dateValues: DateFilter[] = ["today", "week", "overdue"];
const categoryValues: Category[] = ["work", "personal", "study"];

const getDateFilter = (deadline: string): DateFilter => {
  const now = new Date();
  const due = new Date(deadline);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  if (due >= startOfToday && due < endOfToday) return "today";
  if (due > endOfToday && due <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) return "week";
  if (due < startOfToday) return "overdue";
  return "week";
};

const selectAllTasks = (state: RootState) => state.tasks.allTasks;

const selectTasksByFilterKey = (state: RootState, key: string): ITask[] => {
  return selectAllTasks(state).filter((task) => {
    if (statusValues.includes(key as Status)) return task.status === key;
    if (priorityValues.includes(key as Priority)) return task.priority === key;
    if (dateValues.includes(key as DateFilter)) return getDateFilter(task.deadline) === key;
    if (categoryValues.includes(key as Category)) return task.category === key;
    return false;
  });
};

// The task list selector for a specific filter is dynamic
export const selectTasksWidgets = (key: string) => (state: RootState) =>
    selectTasksByFilterKey(state, key);

// The selector returns the entire piece of widgets state, which stores Boolean values about the visibility or activity of widgets.
export const selectWidgets = (state: RootState) => state.widgets;

// We get wheelbarrows on all widgets
 export const selectTasksByWidget = (state: RootState) => ({
  undone: selectTasksWidgets("undone")(state),
  inProgress: selectTasksWidgets("inProgress")(state),
  done: selectTasksWidgets("done")(state),
  low: selectTasksWidgets("low")(state),
  medium: selectTasksWidgets("medium")(state),
  high: selectTasksWidgets("high")(state),
  today: selectTasksWidgets("today")(state),
  week: selectTasksWidgets("week")(state),
  overdue: selectTasksWidgets("overdue")(state),
  work: selectTasksWidgets("work")(state),
  personal: selectTasksWidgets("personal")(state),
  study: selectTasksWidgets("study")(state),
});

// Selector of the initial value of widgets
export const selectAreWidgetDefault = createSelector(
  [selectWidgets],
  (wigets) => {
    return (
      wigets.isUndone === initialState.isUndone &&
      wigets.isInProgress === initialState.isInProgress &&
      wigets.isDone === initialState.isDone &&
      wigets.isLow === initialState.isLow &&
      wigets.isMedium === initialState.isMedium &&
      wigets.isHigh === initialState.isHigh &&
      wigets.isToday === initialState.isToday &&
      wigets.isThisWeek === initialState.isThisWeek &&
      wigets.isOverdue === initialState.isOverdue &&
      wigets.isWork === initialState.isWork &&
      wigets.isPersonal === initialState.isPersonal &&
      wigets.isStudy === initialState.isStudy 
    );
  }
);
