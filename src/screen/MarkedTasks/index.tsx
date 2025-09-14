import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import TasksList from '../../components/TasksList';
import { selectMarkedTasks, selectTasksLoading } from '../../redux/tasks/selectors';

export default function MarkedTasks() {  

  const tasks = useSelector(selectMarkedTasks);
  const loading = useSelector(selectTasksLoading);

  return (
    <View style={{ flex: 1, margin: 10 }}>
            {loading ? (
              <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
              <TasksList tasks={tasks} />
            )}
          </View>
  );
}