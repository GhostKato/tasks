import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import TaskForm from "../../components/TaskForm";
import { updateTask } from "../../redux/tasks/operations";
import { selectUser } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";
import { ITask } from "../../types/task";
import { selectTranslations } from "../../redux/language/selector";
import ScreenHeader from "../../components/ScreenHeader";
import { TaskTabBarStackType } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  UPDATE_TASK_PAGE: { task: ITask };
};

type UpdateTaskRouteProp = RouteProp<RootStackParamList, "UPDATE_TASK_PAGE">;

export default function UpdateTaskPage() {
  const route = useRoute<UpdateTaskRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<TaskTabBarStackType>>();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const t = useSelector(selectTranslations);

  const { task } = route.params;

  const handleUpdate = (updatedTask: ITask) => {
  if (!user) return;

  dispatch(updateTask({ ...updatedTask, ownerId: user.uid }))
    .unwrap()
    .then(() => {      
      navigation.goBack();
    })
    .catch((err) => console.error("Error updating task:", err));
};

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Please login to edit the task</Text>
      </View>
    );
  }

  return (
    <>      
      <ScreenHeader title={t.namesScreenForHeader?.updateTask} />
      <View style={styles.container}>
        <TaskForm initialTask={task} onSubmit={handleUpdate} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
