import { createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ITask } from '../../types/task';

// Fetch all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const user = auth().currentUser;
  if (!user) throw new Error('Not authenticated');

  const snapshot = await firestore()
    .collection('tasks')
    .where('ownerId', '==', user.uid)
    .get({ source: 'server' });

  const tasks: ITask[] = snapshot.docs.map((doc) => {
    const data = doc.data() as Omit<ITask, 'id'>;
    return { ...data, id: doc.id } as ITask;
  });
  return tasks;
});

// Add task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<ITask, 'id'>) => {
    const user = auth().currentUser;
    if (!user) throw new Error('Not authenticated');

    const taskToSave = { ...task, ownerId: user.uid };
    const docRef = await firestore().collection('tasks').add(taskToSave);

    return { ...taskToSave, id: docRef.id } as ITask;
  }
);

// Update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: ITask) => {
    if (!task.id) throw new Error('Task ID is required for update');
    const { id, ...taskData } = task;

    await firestore().collection('tasks').doc(id).update(taskData);

    return task;
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await firestore().collection('tasks').doc(taskId).delete();
    return taskId;
  }
);

// Toggle marked
export const toggleMarked = createAsyncThunk(
  'tasks/toggleMarked',
  async ({ taskId }: { taskId: string }) => {
    const taskDoc = firestore().collection('tasks').doc(taskId);
    const snapshot = await taskDoc.get();
    const current = snapshot.data();
    const currentMarked = current?.isMarked ?? false;
    const newMarked = !currentMarked;
    await taskDoc.update({ isMarked: newMarked });
    return { taskId, isMarked: newMarked };
  }
);
