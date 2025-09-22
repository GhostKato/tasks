import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import TasksList from '../../components/TasksList';
import { selectMarkedTasks, selectTasksLoading } from '../../redux/tasks/selectors';
import { ITask } from '../../types/task';
import { ScreenNames } from '../../constants/screenNames';
import { useNavigation } from '@react-navigation/native';
import { MarkedNavigationProp } from '../../navigation/types';

export default function MarkedTasks() {
  const tasks = useSelector(selectMarkedTasks);
  const loading = useSelector(selectTasksLoading);
  const navigation = useNavigation<MarkedNavigationProp>();

  const handleTaskPress = (task: ITask) => {
    navigation.navigate(ScreenNames.DETAILS_TASK_PAGE, { task, backPath: ScreenNames.MARKED_TASKS_PAGE });
  };

  return (
    <View style={{ flex: 1, margin: 10 }}>
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <TasksList tasks={tasks} onTaskPress={handleTaskPress} />
      )}
    </View>
  );
}
