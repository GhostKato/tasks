import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ITask } from "../../types/task";
import { fonts } from "../../constants/fonts";
import { useSelector, useDispatch } from "react-redux";
import { selectThemeColors } from "../../redux/theme/selectors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { toggleMarked } from "../../redux/tasks/slice";
import { selectTranslations } from "../../redux/language/selector";

interface ITasksListProps {
  tasks: ITask[];
  onTaskPress?: (task: ITask) => void;
}

export default function TasksList({ tasks, onTaskPress }: ITasksListProps) {
  const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();

  const priorityColors = {
    high: "red",
    medium: "orange",
    low: "green",
  };

  const categoryIcons: Record<string, string> = {
    work: "briefcase",
    personal: "account",
    shopping: "cart",
    // додай свої категорії
  };

  const styles = StyleSheet.create({
    flex: { flex: 1 },
    mainContainer: { paddingHorizontal: 10 },
    item: {
      borderWidth: 2,
      borderRadius: 15,
      padding: 10,
      marginVertical: 8,
      backgroundColor: color.primary,
      position: "relative",
    },
    title: {
      fontFamily: fonts.MontserratSemiBold,
      fontSize: 16,
      color: color.quaternary,
      marginBottom: 6,
    },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    infoText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 14,
      color: color.quaternary,
      marginLeft: 4,
    },
    emptyText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 16,
      color: color.quaternary,
      textAlign: "center",
      marginTop: 20,
    },
    favoriteButton: {
      position: "absolute",
      top: 10,
      right: 10,
      padding: 6,
      zIndex: 10,
    },
  });

  const renderTask = ({ item }: { item: ITask }) => {
    const deadlineDate = new Date(item.deadline);
    const formattedDeadline = `${deadlineDate.toLocaleDateString()} ${deadlineDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const borderColor = priorityColors[item.priority];

    return (
      <TouchableOpacity
        style={[styles.item, { borderColor }]}
        activeOpacity={0.7}
        onPress={() => onTaskPress && onTaskPress(item)}
      >
        {/* Кнопка додавання у "Вибране" */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            if (item.id) {
              dispatch(toggleMarked(item.id));
            }
          }}
        >
          <Icon
            name={item.isMarked ? "star" : "star-outline"}
            size={20}
            color={item.isMarked ? "gold" : color.quaternary}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{item.title}</Text>        

        <View style={styles.infoRow}>
          <Icon name="flag" size={16} color={borderColor} />
          <Text style={styles.infoText}>Статус: {item.status}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name={categoryIcons[item.category] || "folder"} size={16} color={color.quaternary} />
          <Text style={styles.infoText}>{item.category}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="clock-outline" size={16} color={color.quaternary} />
          <Text style={styles.infoText}>{formattedDeadline}</Text>
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
          <Text style={styles.emptyText}>{t.taskListEmpty}</Text>
        )}
      />
    </View>
  );
}
