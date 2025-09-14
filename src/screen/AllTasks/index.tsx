import { ActivityIndicator, View } from 'react-native';
import SearchBar from './components/SearchBar';
import TasksList from '../../components/TasksList';
import DefaultButton from '../../components/DefaultButton';
import { ScreenNames } from '../../constants/screenNames';
import { useNavigation } from '@react-navigation/core';
import { AddTaskNavigationProp } from '../../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setSearchQuery } from '../../redux/tasks/slice';
import {
  selectFilteredTasks,
  selectTasksLoading,
} from '../../redux/tasks/selectors';
import { selectTranslations } from '../../redux/language/selector';

export default function AllTasks() {
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<AddTaskNavigationProp>();

  const tasks = useSelector(selectFilteredTasks);
  const loading = useSelector(selectTasksLoading);

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <SearchBar handleSearch={handleSearch} tasks={tasks} />

      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" style={{ flex: 1 }} />
        ) : (
          <TasksList tasks={tasks} />
        )}
      </View>

      <DefaultButton
        onPress={() => navigation.navigate(ScreenNames.ADD_TASK_PAGE, {})}
        text={t.screenTasks.AddBtn}
      />
    </View>
  );
}
