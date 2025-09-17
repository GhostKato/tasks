import { RootState } from "../store";
import { ITask } from "../../types/task"; 

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

export const selectTasksWidgets = (key: string) => (state: RootState) =>
    selectTasksByFilterKey(state, key);


export const selectWidgetBoolean = (state: RootState) => state.widgets;
