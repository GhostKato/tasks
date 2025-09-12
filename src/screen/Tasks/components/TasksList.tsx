import {  
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ITask } from '../index';
import { fonts } from '../../../constants/fonts';

interface ITasksListProps {
  tasks: ITask[];
  onTaskPress?: (task: ITask) => void;
}

export default function TasksList({ tasks, onTaskPress }: ITasksListProps) {
  const renderTask = ({ item }: { item: ITask }) => {
    const deadlineDate = item.deadline.toDate();
    const formattedDeadline = `${deadlineDate.toLocaleDateString()} ${deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => onTaskPress && onTaskPress(item)}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.title}</Text>
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
        keyExtractor={item => item.id}
        renderItem={renderTask}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Немає задач</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mainContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  item: {
    backgroundColor: '#7A71BA20', 
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
  },
  textContainer: { marginBottom: 5 },
  name: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: 16,
    color: '#0B0B0B',
    marginBottom: 4,
  },
  info: {
    fontFamily: fonts.MontserratRegular,
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  emptyText: {
    fontFamily: fonts.MontserratRegular,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
