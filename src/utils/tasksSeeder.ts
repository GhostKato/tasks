import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const tasks = [
  { name: 'Написати звіт', status: 'У прогресі', priority: 'Високий', category: 'Робота', date: '2025-09-12', isFavorite: false },
  { name: 'Купити продукти', status: 'Невиконано', priority: 'Середній', category: 'Особисте', date: '2025-09-11', isFavorite: true },
  { name: 'Підготувати презентацію', status: 'Виконано', priority: 'Високий', category: 'Робота', date: '2025-09-10', isFavorite: false },
  { name: 'Написати звіт', status: 'У прогресі', priority: 'Високий', category: 'Робота', date: '2025-09-12', isFavorite: false },
  { name: 'Купити продукти', status: 'Невиконано', priority: 'Середній', category: 'Особисте', date: '2025-09-11', isFavorite: true },
  { name: 'Підготувати презентацію', status: 'Виконано', priority: 'Високий', category: 'Робота', date: '2025-09-10', isFavorite: false },
];

export async function addTasks() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log('Користувач не авторизований');
    return;
  }

  try {
    for (const task of tasks) {
      await firestore().collection('tasks').add({
        ...task,
        ownerId: user.uid,
      });
      console.log(`Задача "${task.name}" додана!`);
    }
  } catch (error) {
    console.error('Помилка при додаванні задач:', error);
  }
}
