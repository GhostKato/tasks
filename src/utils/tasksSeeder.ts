import { getFirestore, collection, addDoc } from '@react-native-firebase/firestore';

// Дані для тестових задач
const tasks = [
  { 
    title: 'Написати звіт', 
    description: 'Фіналізувати звіт за тиждень і відправити керівнику', 
    status: 'inProgress', 
    priority: 'high', 
    category: 'work', 
    deadline: new Date('2025-09-10').toISOString(), 
    isFavorite: false,
    ownerId: 'test',
  },
  { 
    title: 'Купити продукти', 
    description: 'Молоко, хліб, овочі та м\'ясо', 
    status: 'undone', 
    priority: 'medium', 
    category: 'personal', 
    deadline: new Date('2025-09-19').toISOString(), 
    isFavorite: true,
    ownerId: 'test',
  },
  { 
    title: 'Підготувати презентацію', 
    description: 'Зробити слайди для виступу у п\'ятницю', 
    status: 'done', 
    priority: 'high', 
    category: 'work', 
    deadline: new Date('2025-09-11').toISOString(), 
    isFavorite: false,
     ownerId: 'test',
  },
  { 
    title: 'Прочитати розділ з підручника', 
    description: 'Розділ 3: Алгоритми сортування', 
    status: 'undone', 
    priority: 'low', 
    category: 'study', 
    deadline: new Date('2025-09-14').toISOString(), 
    isFavorite: false,
    ownerId: 'test',
  },
  { 
    title: 'Зателефонувати колезі', 
    description: 'Уточнити деталі по проєкту', 
    status: 'inProgress', 
    priority: 'medium', 
    category: 'work', 
    deadline: new Date('2025-09-18').toISOString(),
    isFavorite: false,
    ownerId: 'test',
  },
  { 
    title: 'Пробіжка в парку', 
    description: '30 хвилин кардіо на свіжому повітрі', 
    status: 'undone', 
    priority: 'low', 
    category: 'personal', 
    deadline: new Date('2025-09-14').toISOString(), 
    isFavorite: true,
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


