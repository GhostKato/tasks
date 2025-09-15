import {  
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ITask } from '../../types/task';
import { fonts } from '../../constants/fonts';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';

interface ITasksListProps {
  tasks: ITask[];
  onTaskPress?: (task: ITask) => void;
}

export default function TasksList({ tasks, onTaskPress }: ITasksListProps) {
  const color = useSelector(selectThemeColors);
  
  const styles = StyleSheet.create({
    flex: { flex: 1 },
    mainContainer: { },
    item: {
      borderWidth: 1,
      borderColor: color.secondary, 
      borderRadius: 15,
      padding: 10,
      marginVertical: 8,      
    },
    textContainer: {  },
    title: {
      fontFamily: fonts.MontserratSemiBold,
      fontSize: 16,
      color: color.quaternary,
      marginBottom: 4,
    },
    info: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 14,
      color: color.quaternary,
      marginBottom: 2,
    },
    emptyText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 16,
      color: color.quaternary,
      textAlign: 'center',
      marginTop: 20,
    },
  });

  const renderTask = ({ item }: { item: ITask }) => {
    const deadlineDate = new Date(item.deadline);
    const formattedDeadline = `${deadlineDate.toLocaleDateString()} ${deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => onTaskPress && onTaskPress(item)}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.info}>
            Статус: {item.status} | Пріоритет: {item.priority}
          </Text>
          <Text style={styles.info}>
            Категорія: {item.category} | Дедлайн: {formattedDeadline}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.flex}>
      <FlatList
        data={tasks}
        style={styles.mainContainer}
        numColumns={1}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={renderTask}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Немає задач</Text>
        )}
      />
    </View>
  );
}
