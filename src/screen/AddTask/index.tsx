import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TaskForm from '../../components/TaskForm';
import { ITask } from '../../types/task';
import { useSelector } from 'react-redux';
import { addTask } from '../../redux/tasks/operations';
import { selectUser} from '../../redux/auth/selectors';
import { useAppDispatch } from '../../redux/hooks';

export default function AddTaskPage() {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);  
  
  if (!user) {  
  return <Text>Необхідна авторизація</Text>;
  }
  
  const ownerId = user.uid;

  const handleAddTask = (task: ITask) => {
    dispatch(addTask({ ...task, ownerId}));
  };

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={handleAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
