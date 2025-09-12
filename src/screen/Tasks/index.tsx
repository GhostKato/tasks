import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import TasksList from './components/TasksList';
import SearchBar from './components/SearchBar';
import { ISettings } from '../FilterSettings';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ScreenNames } from '../../constants/screenNames';
import { useNavigation } from '@react-navigation/core';
import { AddTaskNavigationProp } from '../../navigation/types'; 

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  startAt,
  endAt,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from '@react-native-firebase/firestore';

import { addTasks } from '../../utils/tasksSeeder';
import DefaultButton from '../../components/DefaultButton';
import { useTranslation } from '../../context/LanguageContext';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: 'done' | 'undone' | 'inProgress';
  priority: 'high' | 'medium' | 'low';
  category: 'work' | 'personal' | 'study';
  deadline: Timestamp; // дата дедлайну
  isFavorite: boolean;
  ownerId: string;
}

export default function Tasks() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute<RouteProp<{ params: { settings: ISettings } }>>();

  const db = getFirestore();
  const tasksRef = collection(db, 'tasks');

  // Seeder для тестових задач
  useEffect(() => {
    addTasks();
  }, []);

  // Fetch tasks з фільтрами
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        let q = query(tasksRef);

        if (route?.params?.settings) {
          const { status, priority, category } = route.params.settings;
          if (status) q = query(q, where('status', '==', status));
          if (priority) q = query(q, where('priority', '==', priority));
          if (category) q = query(q, where('category', '==', category));
        }

        const snapshot = await getDocs(q);

        const temp: ITask[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data() as Omit<ITask, 'id'>;
            return { id: doc.id, ...data };
          }
        );

        // Фільтр по дедлайну
        if (route?.params?.settings?.date) {
          const now = new Date();
          const filtered = temp.filter(task => {
            const taskDate = task.deadline.toDate();
            switch (route.params.settings.date) {
              case 'today':
                return (
                  taskDate.getDate() === now.getDate() &&
                  taskDate.getMonth() === now.getMonth() &&
                  taskDate.getFullYear() === now.getFullYear()
                );
              case 'week':
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay()); // початок тижня
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6); // кінець тижня
                return taskDate >= startOfWeek && taskDate <= endOfWeek;
              case 'overdue':
                return taskDate < now;
              default:
                return true;
            }
          });
          setTasks(filtered);
        } else {
          setTasks(temp);
        }

        // Сортування по дедлайну, якщо включено timeStamp
        if (route?.params?.settings?.timeStamp) {
          setTasks(prev =>
            [...prev].sort(
              (a, b) => b.deadline.toDate().getTime() - a.deadline.toDate().getTime()
            )
          );
        }
      } catch (e) {
        console.log('Firestore error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [route?.params?.settings, tasksRef]);

  // Пошук
  const handleSearch = async (text: string) => {
    try {
      const q = query(tasksRef, orderBy('title'), startAt(text), endAt(text + '\uf8ff'));
      const snapshot = await getDocs(q);

      const temp: ITask[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as Omit<ITask, 'id'>;
          return { id: doc.id, ...data };
        }
      );

      setTasks(temp);
    } catch (e) {
      console.log('Firestore search error:', e);
    }
  };

  const navigation = useNavigation<AddTaskNavigationProp>();  

  return (
    <View style={{ flex: 1 }}>
      <SearchBar handleSearch={handleSearch} tasks={tasks} />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <TasksList tasks={tasks} />
      )}
      <DefaultButton
                onPress={() => {
                  navigation.navigate(ScreenNames.ADD_TASK_PAGE, {});
                }}
                text={t.screenTasks.AddBtn}
              />
    </View>
  );
}
