import { getFirestore, collection, addDoc, Timestamp } from '@react-native-firebase/firestore';

// Дані для тестових задач
const tasks = [
  { 
    title: 'Написати звіт', 
    description: 'Фіналізувати звіт за тиждень і відправити керівнику', 
    status: 'inProgress', 
    priority: 'high', 
    category: 'work', 
    deadline: new Date('2025-09-12'), 
    isFavorite: false,
    ownerId: 'test',
  },
  { 
    title: 'Купити продукти', 
    description: 'Молоко, хліб, овочі та м\'ясо', 
    status: 'undone', 
    priority: 'medium', 
    category: 'personal', 
    deadline: new Date('2025-09-11'), 
    isFavorite: true,
    ownerId: 'test',
  },
  { 
    title: 'Підготувати презентацію', 
    description: 'Зробити слайди для виступу у п\'ятницю', 
    status: 'done', 
    priority: 'high', 
    category: 'work', 
    deadline: new Date('2025-09-10'), 
    isFavorite: false,
     ownerId: 'test',
  },
  { 
    title: 'Прочитати розділ з підручника', 
    description: 'Розділ 3: Алгоритми сортування', 
    status: 'undone', 
    priority: 'low', 
    category: 'study', 
    deadline: new Date('2025-09-15'), 
    isFavorite: false,
    ownerId: 'test',
  },
  { 
    title: 'Зателефонувати колезі', 
    description: 'Уточнити деталі по проєкту', 
    status: 'inProgress', 
    priority: 'medium', 
    category: 'work', 
    deadline: new Date('2025-09-13'), 
    isFavorite: false,
    ownerId: 'test',
  },
  { 
    title: 'Пробіжка в парку', 
    description: '30 хвилин кардіо на свіжому повітрі', 
    status: 'undone', 
    priority: 'low', 
    category: 'personal', 
    deadline: new Date('2025-09-14'), 
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
        deadline: Timestamp.fromDate(task.deadline),
      });
      console.log(`Задача "${task.title}" додана!`);
    }
  } catch (error) {
    console.error('Помилка при додаванні задач:', error);
  }
}


// import { getAuth } from '@react-native-firebase/auth';
// import { getFirestore, collection, addDoc, Timestamp } from '@react-native-firebase/firestore';

// // Дані для тестових задач
// const tasks = [
//   { 
//     title: 'Написати звіт', 
//     description: 'Фіналізувати звіт за тиждень і відправити керівнику', 
//     status: 'inProgress', 
//     priority: 'high', 
//     category: 'work', 
//     deadline: new Date('2025-09-12'), 
//     isFavorite: false 
//   },
//   { 
//     title: 'Купити продукти', 
//     description: 'Молоко, хліб, овочі та м\'ясо', 
//     status: 'undone', 
//     priority: 'medium', 
//     category: 'personal', 
//     deadline: new Date('2025-09-11'), 
//     isFavorite: true 
//   },
//   { 
//     title: 'Підготувати презентацію', 
//     description: 'Зробити слайди для виступу у п\'ятницю', 
//     status: 'done', 
//     priority: 'high', 
//     category: 'work', 
//     deadline: new Date('2025-09-10'), 
//     isFavorite: false 
//   },
//   { 
//     title: 'Прочитати розділ з підручника', 
//     description: 'Розділ 3: Алгоритми сортування', 
//     status: 'undone', 
//     priority: 'low', 
//     category: 'study', 
//     deadline: new Date('2025-09-15'), 
//     isFavorite: false 
//   },
//   { 
//     title: 'Зателефонувати колезі', 
//     description: 'Уточнити деталі по проєкту', 
//     status: 'inProgress', 
//     priority: 'medium', 
//     category: 'work', 
//     deadline: new Date('2025-09-13'), 
//     isFavorite: false 
//   },
//   { 
//     title: 'Пробіжка в парку', 
//     description: '30 хвилин кардіо на свіжому повітрі', 
//     status: 'undone', 
//     priority: 'low', 
//     category: 'personal', 
//     deadline: new Date('2025-09-14'), 
//     isFavorite: true 
//   },
// ];

// export async function addTasks() {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user) {
//     console.log('Користувач не авторизований');
//     return;
//   }

//   const db = getFirestore();
//   const tasksRef = collection(db, 'tasks');

//   try {
//     for (const task of tasks) {
//       await addDoc(tasksRef, {
//         ...task,
//         ownerId: user.uid,
//         deadline: Timestamp.fromDate(task.deadline), // перетворюємо на Timestamp
//       });
//       console.log(`Задача "${task.title}" додана!`);
//     }
//   } catch (error) {
//     console.error('Помилка при додаванні задач:', error);
//   }
// }