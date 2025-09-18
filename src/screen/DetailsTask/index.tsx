import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ScreenHeader from "../../components/ScreenHeader";
import { ITask } from "../../types/task";

export default function DetailsTask() {
  const route = useRoute();
  const { task, backPath } = route.params as { task: ITask; backPath?: string };

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader backPath={backPath} />
      <View style={styles.container}>
        <Text style={styles.title}>{task.title}</Text>
        <Text>Статус: {task.status}</Text>
        <Text>Пріоритет: {task.priority}</Text>
        <Text>Категорія: {task.category}</Text>
        <Text>Дедлайн: {task.deadline}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
