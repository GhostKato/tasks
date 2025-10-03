import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import TasksList from '../../../../components/TasksList';
import { RootState } from '../../../../redux/store';
import { selectTasksByWidget } from '../../../../redux/widgets/selectors';
import { IWidgetsState } from '../../../../redux/widgets/slice';
import { selectThemeColors } from '../../../../redux/theme/selectors';
import { ITask } from '../../../../types/task';
import { fonts } from '../../../../constants/fonts';

interface WidgetProps {
  title: string;
  filterKey: keyof IWidgetsState;
  listKey: keyof ReturnType<typeof selectTasksByWidget>;
  onTaskPress?: (task: ITask) => void;
}

const Widgets: React.FC<WidgetProps> = ({ title, filterKey, listKey, onTaskPress }) => {
  const isActive = useSelector((state: RootState) => state.widgets[filterKey]);
  const tasksByWidget = useSelector(selectTasksByWidget);
  const tasks = tasksByWidget[listKey];
  const color = useSelector(selectThemeColors);

  if (!isActive || tasks.length === 0) return null;

  const styles = StyleSheet.create({
    container: { padding: 8 },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 6,
      color: color.secondary,
      fontFamily: fonts.ComfortaaBold,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TasksList tasks={tasks} onTaskPress={onTaskPress} />
    </View>
  );
};

export default Widgets;
