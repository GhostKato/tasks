import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';

const tasks = [
  { 
    title: 'Write report', 
    description: 'Finalize the weekly report and send it to the manager', 
    status: 'inProgress', 
    priority: 'high', 
    category: 'work', 
    deadline: new Date('2025-09-10').toISOString(), 
    isMarked: false,
    ownerId: 'test',
  },
  { 
    title: 'Buy groceries', 
    description: 'Milk, bread, vegetables, and meat', 
    status: 'undone', 
    priority: 'medium', 
    category: 'personal', 
    deadline: new Date('2025-09-19').toISOString(), 
    isMarked: true,
    ownerId: 'test',
  },
  { 
    title: 'Prepare presentation', 
    description: 'Make slides for the Friday speech', 
    status: 'done', 
    priority: 'high', 
    category: 'work', 
    deadline: new Date('2025-09-11').toISOString(), 
    isMarked: false,
    ownerId: 'test',
  },
  { 
    title: 'Read textbook chapter', 
    description: 'Chapter 3: Sorting algorithms', 
    status: 'undone', 
    priority: 'low', 
    category: 'study', 
    deadline: new Date('2025-09-14').toISOString(), 
    isMarked: false,
    ownerId: 'test',
  },
  { 
    title: 'Call colleague', 
    description: 'Clarify project details', 
    status: 'inProgress', 
    priority: 'medium', 
    category: 'work', 
    deadline: new Date('2025-09-18').toISOString(),
    isMarked: false,
    ownerId: 'test',
  },
  { 
    title: 'Jog in the park', 
    description: '30 minutes of cardio outdoors', 
    status: 'undone', 
    priority: 'low', 
    category: 'personal', 
    deadline: new Date('2025-09-14').toISOString(), 
    isMarked: true,
    ownerId: 'test',
  },
];

export async function addTasksToBase() {
  const db = getFirestore();
  const tasksRef = collection(db, 'tasks');

  try {
    for (const task of tasks) {
      await addDoc(tasksRef, {
        ...task,        
      });
      console.log(`Задача "${task.title}" додана!`);
    }
  } catch (error) {
    console.error('Помилка при додаванні задач:', error);
  }
}


