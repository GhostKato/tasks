import { ActivityIndicator, View } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import TasksList from './components/TasksList';
import SearchBar from './components/SearchBar';
import { ISettings } from '../FilterSettings';
import { RouteProp, useRoute } from '@react-navigation/core';
// import { addTasks } from '../../utils/tasksSeeder';

export interface ITask {
  id: string;
  name: string;
  status: 'Виконано' | 'Невиконано' | 'У прогресі';
  priority: 'Високий' | 'Середній' | 'Низький';
  category: 'Робота' | 'Особисте' | 'Навчання';
  date: string;
  isFavorite: boolean;
  ownerId: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute<RouteProp<{ params: { settings: ISettings } }>>();

  // Наповнення бази даних (тільки один раз для тесту)
  // useEffect(() => {
  //   addTasks();
  // }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> =
          firestore().collection('tasks');

        // Фільтрування по settings
        if (route?.params?.settings) {
          (Object.entries(route.params.settings) as [keyof ISettings, string | null][]).forEach(
            ([key, value]) => {
              if (value !== null && key !== 'timeStamp') {
                query = query.where(key, '==', value);
              }
            }
          );
        }

        const result = await query.get();

        const temp: ITask[] = result.docs.map((doc) => {
          const data = doc.data() as Omit<ITask, 'id'>;
          return { id: doc.id, ...data };
        });

        setTasks(temp);
      } catch (e) {
        console.log('Firestore error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [route?.params?.settings]);

  const handleSearch = async (text: string) => {
    try {
      const result = await firestore()
        .collection('tasks')
        .orderBy('name')
        .startAt(text)
        .endAt(text + '\uf8ff')
        .get();

      const temp: ITask[] = result.docs.map((doc) => {
        const data = doc.data() as Omit<ITask, 'id'>;
        return { id: doc.id, ...data };
      });

      setTasks(temp);
    } catch (e) {
      console.log('Firestore search error:', e);
    }
  };

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
    </View>
  );
}
