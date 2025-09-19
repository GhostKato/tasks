import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ScreenHeader from "../../components/ScreenHeader";
import { ITask } from "../../types/task";
import { selectTranslations } from "../../redux/language/selector";
import { useSelector } from "react-redux";

export default function DetailsTask() {
  const route = useRoute();
  const { task, backPath } = route.params as { task: ITask; backPath?: string };
  const t = useSelector(selectTranslations);

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={t.namesScreenForHeader?.detailsTask} backPath={backPath} />
      <View style={styles.container}>
        <Text style={styles.title}>{task.title}</Text>
         <Text style={styles.title}>{task.description}</Text>
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
