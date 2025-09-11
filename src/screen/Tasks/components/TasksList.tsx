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
  return (
    <View style={styles.flex}>
      <FlatList
        data={tasks}
        style={styles.mainContainer}
        numColumns={1} 
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onTaskPress && onTaskPress(item)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>
                Статус: {item.status} | Пріоритет: {item.priority}
              </Text>
              <Text style={styles.info}>
                Категорія: {item.category} | Дата: {item.date}
              </Text>
            </View>
          </TouchableOpacity>
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
  textContainer: { gap: 5 },
  name: {
    fontFamily: fonts.MontserratSemiBold,
    fontSize: 16,
    color: '#0B0B0B',
  },
  info: {
    fontFamily: fonts.MontserratRegular,
    fontSize: 14,
    color: '#333',
  },
});
