import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import TaskForm from "../../components/TaskForm";
import { updateTask } from "../../redux/tasks/operations";
import { selectUser } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";
import { ITask } from "../../types/task";

type RootStackParamList = {
  UPDATE_TASK_PAGE: { task: ITask };
};

type UpdateTaskRouteProp = RouteProp<RootStackParamList, "UPDATE_TASK_PAGE">;

export default function UpdateTaskPage() {
  const route = useRoute<UpdateTaskRouteProp>();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  const { task } = route.params;

  const handleUpdate = (updatedTask: ITask) => {
    if (!user) {
      return;
    }

    dispatch(updateTask({ ...updatedTask, ownerId: user.uid }))
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.error("Помилка при оновленні задачі:", err);
      });
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Будь ласка, увійдіть, щоб редагувати задачу</Text>
      </View>
    );
  }

  return (
    <TaskForm
      initialTask={task}
      onSubmit={handleUpdate}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
