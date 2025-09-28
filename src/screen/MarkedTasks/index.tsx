import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import TasksList from '../../components/TasksList';
import { selectMarkedTasks } from '../../redux/tasks/selectors';
import { ITask } from '../../types/task';
import { ScreenNames } from '../../constants/screenNames';
import { useNavigation } from '@react-navigation/native';
import { MarkedNavigationProp } from '../../navigation/types';

export default function MarkedTasks() {
  const tasks = useSelector(selectMarkedTasks);  
  const navigation = useNavigation<MarkedNavigationProp>();

  const handleTaskPress = (task: ITask) => {
    navigation.navigate(ScreenNames.DETAILS_TASK_PAGE, { task, backPath: ScreenNames.MARKED_TASKS_PAGE });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10    
    },
    flex: {
      flex: 1       
      },    
    });  

  return (
    <View style={styles.container}>    
        <TasksList tasks={tasks} onTaskPress={handleTaskPress} />     
    </View>
  );
}
