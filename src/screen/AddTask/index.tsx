import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskForm from '../../components/TaskForm';
import { ITask } from '../../types/task';
import { useSelector } from 'react-redux';
import { addTask } from '../../redux/tasks/operations';
import { selectUser } from '../../redux/auth/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigation, useRoute } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import { selectTranslations } from '../../redux/language/selector';

export default function AddTaskPage() {
  const t = useSelector(selectTranslations);
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const route = useRoute();
  const { backPath } = route.params as { backPath?: string } || {};  

  if (!user) {
    return <Text>Authorization required</Text>;
  }

  const ownerId = user.uid;

  const handleAddTask = (task: ITask) => {
    dispatch(addTask({ ...task, ownerId }));
    if (backPath) {
      navigation.navigate(backPath as never);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={t.namesScreenForHeader?.addTask} showBack backPath={backPath}/>
      <View style={styles.container}>
        <TaskForm onSubmit={handleAddTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
