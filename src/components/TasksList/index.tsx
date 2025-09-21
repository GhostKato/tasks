import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ITask } from "../../types/task";
import { fonts } from "../../constants/fonts";
import { useSelector, useDispatch } from "react-redux";
import { selectThemeColors } from "../../redux/theme/selectors";
import { toggleMarked } from "../../redux/tasks/slice";
import { selectTranslations } from "../../redux/language/selector";
import {
  UndoneIcon,
  InProgressIcon,
  DoneIcon,
  WorkIcon,
  PersonalIcon,
  StudyIcon,
  MarkedTrueIcon,
  MarkedFalseIcon,
} from "../../assets/icons";

interface ITasksListProps {
  tasks: ITask[];
  onTaskPress?: (task: ITask) => void;
}

export default function TasksList({ tasks, onTaskPress }: ITasksListProps) {
  const color = useSelector(selectThemeColors);
  const t= useSelector(selectTranslations);
  const dispatch = useDispatch();

  const priorityColors = {
    high: color.nonary,
    medium: color.denary,
    low: color.octonary,
  };

  const styles = StyleSheet.create({
    flex: {
      flex: 1
    },
    mainContainer: {
      paddingHorizontal: 10
    },
    item: {
      borderWidth: 1,
      borderRadius: 15,
      padding: 12,
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
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap:'10',
      marginBottom: 4
    },
    infoText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 14,
      color: color.quaternary,      
    },
    emptyText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 16,
      color: color.quaternary,
      textAlign: "center",
      marginTop: 20,
    },
    markedButton: {
      position: "absolute",
      top: 10,
      right: 10,
      padding: 6,
      zIndex: 10,
    },
    infoIconContainer: {      
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent:'space-between'

    },
    deadlineRow: {      
      justifyContent:'flex-end'
      
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
        {/* Кнопка "Вибране" */}
        <TouchableOpacity
          style={styles.markedButton}
          onPress={() => item.id && dispatch(toggleMarked(item.id))}
        >
          {item.isMarked ? <MarkedTrueIcon width={20} height={20} /> : <MarkedFalseIcon width={20} height={20} />}
        </TouchableOpacity>

        <Text style={styles.title}>{item.title}</Text>

       <View style={styles.infoContainer}>
          <View style={styles.infoIconContainer}>
            {/* Статус */}
            <View style={styles.infoRow}>
              {item.status === "undone" && <UndoneIcon width={16} height={16} />}
              {item.status === "inProgress" && <InProgressIcon width={16} height={16} />}
              {item.status === "done" && <DoneIcon width={16} height={16} />}
              <Text style={styles.infoText}>{item.status}</Text>
            </View>
    
            {/* Категорія */}
            <View style={styles.infoRow}>
              {item.category === "work" && <WorkIcon width={16} height={16} />}
              {item.category === "personal" && <PersonalIcon width={16} height={16} />}
              {item.category === "study" && <StudyIcon width={16} height={16} />}
              <Text style={styles.infoText}>{item.category}</Text>
            </View>
          </View>
  
          {/* Дедлайн */}
          <View style={styles.deadlineRow}>
            <Text style={styles.infoText}>{formattedDeadline}</Text>
          </View>
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
        ListEmptyComponent={() => <Text style={styles.emptyText}>{t.taskListEmpty}</Text>}
      />
    </View>
  );
}
