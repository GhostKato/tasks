import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../types/task';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, QueryDocumentSnapshot, DocumentData } from '@react-native-firebase/firestore';

const db = getFirestore();
const tasksRef = collection(db, 'tasks');

// Fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const snapshot = await getDocs(tasksRef);
  const tasks: ITask[] = snapshot.docs.map(
    (doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data() as Omit<ITask, 'id'>;
      return { ...data, id: doc.id } as ITask;
    }
  );
  return tasks;
});

// Add task
export const addTask = createAsyncThunk('tasks/addTask', async (task: Omit<ITask, 'id'>) => {
  const taskToSave = { ...task, deadline: task.deadline };
  const docRef = await addDoc(tasksRef, taskToSave);
  return { ...taskToSave, id: docRef.id } as ITask;
});

// Update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: ITask) => {
    if (!task.id) throw new Error("Task ID is required for update");
    const taskDoc = doc(db, 'tasks', task.id);    
    const { id, ...taskData } = task;
    await updateDoc(taskDoc, taskData as any);
    return task;
  }
);

// Delete task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  const taskDoc = doc(db, 'tasks', taskId);
  await deleteDoc(taskDoc);
  return taskId;
});

// Toggle marked
export const toggleMarked = createAsyncThunk(
  'tasks/toggleMarked',
  async ({ taskId }: { taskId: string }) => {
    const taskDoc = doc(db, 'tasks', taskId);
    const snapshot = await getDoc(taskDoc);
    const current = snapshot.data();
    const currentMarked = current?.isMarked ?? false;
    const newMarked = !currentMarked;
    await updateDoc(taskDoc, { isMarked: newMarked });
    return { taskId, isMarked: newMarked };
  }
);
