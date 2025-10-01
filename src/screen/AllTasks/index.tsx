import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TasksList from '../../components/TasksList';
import { selectTasksLoading } from '../../redux/tasks/selectors';
import { selectAreFiltersDefault, selectFilteredTasks } from '../../redux/filters/selectors';
import { selectThemeColors } from '../../redux/theme/selectors';
import { useNavigation } from '@react-navigation/core';
import { AddTaskNavigationProp } from '../../navigation/types';
import DefaultButton from '../../components/DefaultButton';
import { ScreenNames } from '../../constants/screenNames';
import { ITask } from '../../types/task';
import SearchBar from './components/SearchBar';
import { resetFilters } from '../../redux/filters/slice';
import { useTranslation } from 'react-i18next';

export default function AllTasks() {
  const { t } = useTranslation();
  const color = useSelector(selectThemeColors);
  const dispatch = useDispatch();
  const areFiltersDefault = useSelector(selectAreFiltersDefault);
  
  const navigation = useNavigation<AddTaskNavigationProp>();

  const tasks = useSelector(selectFilteredTasks);
  const loading = useSelector(selectTasksLoading);
  const isTasksEmpty = tasks.length === 0;

  const handleTaskPress = (task: ITask) => {
    navigation.navigate(ScreenNames.DETAILS_TASK_PAGE, {
      task,
      backPath: ScreenNames.ALL_TASKS_PAGE,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10     
    },
    flex: {
      flex: 1           
      },
      actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
        gap: 10, 
      marginHorizontal: 6
      },
      buttonReset: {
      flex: 0.5
      },
      buttonAdd: {
      flex: 1
    },
    });

  return (
    <View style={styles.container}>
      {!(areFiltersDefault && isTasksEmpty) && (
  <SearchBar />
)}
      <View style={styles.flex}>
        {loading ? (
          <ActivityIndicator size="large" style={styles.flex} />
        ) : (
          <TasksList tasks={tasks} onTaskPress={handleTaskPress} />
        )}
      </View>

    
      <View style={styles.actions}>
        {!areFiltersDefault && (
         <View style={styles.buttonReset}>
                <DefaultButton
                  onPress={() => dispatch(resetFilters())}
                  text={t('filterSettings.resetFiltersBtn')}
                  backgroundColor={color.nonary}
                />
          </View>  
      )}  
        <View style={styles.buttonAdd}>
          <DefaultButton
            onPress={() =>
              navigation.navigate(ScreenNames.ADD_TASK_PAGE, {
                backPath: ScreenNames.ALL_TASKS_PAGE,
              })
            }
            text={t('screenAllTasks.addBtn')}
            backgroundColor={color.secondary}
          />
        </View>
       </View>
    </View>
  );
}
