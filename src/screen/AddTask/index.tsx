import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskForm from '../../components/TaskForm';
import { ITask } from '../../types/task';
import { addTask } from '../../redux/tasks/operations';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenHeader from '../../components/headers/ScreenHeader';
import { useTranslation } from 'react-i18next';

export default function AddTaskPage() {
  const { t } = useTranslation('namesScreenForHeader');
  const dispatch = useAppDispatch();  
  const navigation = useNavigation();
  const route = useRoute();
  const { backPath } = route.params as { backPath?: string } || {}; 

  const handleAddTask = (task: Omit<ITask, 'id' | 'ownerId'>) => {
  dispatch(addTask(task));
  if (backPath) {
    navigation.navigate(backPath as never);
  } else {
    navigation.goBack();
  }
};

  return (
    <View style={styles.flex}>
      <ScreenHeader title={t('addTask')} backPath={backPath}/>
      <View style={styles.container}>
        <TaskForm onSubmit={handleAddTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,    
  },
  container: {
    flex: 1,
    padding: 16,
    marginVertical: 20
  },
});
