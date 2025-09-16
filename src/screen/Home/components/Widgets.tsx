import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import TasksList from '../../../components/TasksList';
import { RootState } from "../../../redux/store";
import { selectTasksWidgets } from "../../../redux/widgets/selectors";
import { WidgetsState } from "../../../redux/widgets/slice";
import { selectThemeColors } from "../../../redux/theme/selectors";

interface WidgetProps {
  title: string;
  filterKey: keyof WidgetsState;
  listKey: string;
}

const TaskWidget: React.FC<WidgetProps> = ({ title, filterKey, listKey }) => {
  const isActive = useSelector((state: RootState) => state.widgets[filterKey]);
  const tasks = useSelector(selectTasksWidgets(listKey));
  const color = useSelector(selectThemeColors);

    if (!isActive || tasks.length === 0) return null;
    
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 8
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
        color: color.secondary
    },
});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TasksList tasks={tasks} />
    </View>
  );
};

export default TaskWidget;


