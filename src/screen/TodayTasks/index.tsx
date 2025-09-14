import { ActivityIndicator, View } from 'react-native';
import { selectTodayTasks } from '../../redux/filters/selectors';
import { useSelector } from 'react-redux';
import TasksList from '../../components/TasksList';
import { selectTasksLoading } from '../../redux/tasks/selectors';

export default function TodayTasks() {  

  const tasks = useSelector(selectTodayTasks);
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