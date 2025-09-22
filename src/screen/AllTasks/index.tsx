import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import TasksList from '../../components/TasksList';
import { selectTasksLoading } from '../../redux/tasks/selectors';
import { selectFilteredTasks } from '../../redux/filters/selectors';
import { selectTranslations } from '../../redux/language/selector';
import { selectThemeColors } from '../../redux/theme/selectors';
import { useNavigation } from '@react-navigation/core';
import { AddTaskNavigationProp } from '../../navigation/types';
import DefaultButton from '../../components/DefaultButton';
import { ScreenNames } from '../../constants/screenNames';
import { ITask } from '../../types/task';
import SearchBar from './components/SearchBar';

export default function AllTasks() {
  const t = useSelector(selectTranslations);
  const color = useSelector(selectThemeColors);
  
  const navigation = useNavigation<AddTaskNavigationProp>();

  const tasks = useSelector(selectFilteredTasks);
  const loading = useSelector(selectTasksLoading);  

  const handleTaskPress = (task: ITask) => {
    navigation.navigate(ScreenNames.DETAILS_TASK_PAGE, {
      task,
      backPath: ScreenNames.ALL_TASKS_PAGE,
    });
  };

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <SearchBar />
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" style={{ flex: 1 }} />
        ) : (
          <TasksList tasks={tasks} onTaskPress={handleTaskPress} />
        )}
      </View>
      <DefaultButton
        onPress={() =>
          navigation.navigate(ScreenNames.ADD_TASK_PAGE, {
            backPath: ScreenNames.ALL_TASKS_PAGE,
          })
        }
        text={t.screenAllTasks.addBtn}
        backgroundColor={color.secondary}
      />
    </View>
  );
}
