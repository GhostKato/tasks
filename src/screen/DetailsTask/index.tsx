import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ScreenHeader from "../../components/ScreenHeader";
import { ITask } from "../../types/task";
import { selectTranslations } from "../../redux/language/selector";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../../redux/theme/selectors";
import { DeadlineIcon, DoneIcon, InProgressIcon, PersonalIcon, StudyIcon, UndoneIcon, WorkIcon } from "../../assets/icons";

export default function DetailsTask() {
  const route = useRoute();
  const { task, backPath } = route.params as { task: ITask; backPath?: string };
  const t = useSelector(selectTranslations);
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({
  wraper: {
    flex: 1,      
  },
  mainContainer: {
    flex: 1,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: color.senary,
    gap: 20
  },
  titleTask: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: color.secondary,
    },
  descriptionTask: {
    fontSize: 16,    
    marginBottom: 10,
    color: color.quaternary,
    },
  itemContainer: {
    gap: 5
  },
  itemTitle: {
    fontWeight: "bold",
    color: color.quaternary,
    fontSize: 14,
    },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
    },
  itemText: {
    color: color.quaternary,
    },
  priorityIcon: {
    width: 15,
    height: 15,
    borderRadius: 12
  },
  });
  
  const getBackgroundColor = () => {
    switch (task.priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'white';
    }
  };

  return (
    <View style={styles.wraper}>
      <ScreenHeader title={t.namesScreenForHeader.detailsTask} backPath={backPath} />
      <View style={styles.mainContainer}>
        <Text style={styles.titleTask}>{task.title}</Text>
        <Text style={styles.itemTitle}>Опис:</Text>
        <Text style={styles.descriptionTask}>{task.description}</Text>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Пріоритет:</Text>
          <View style={styles.itemContent}>
            <View style={[styles.priorityIcon, { backgroundColor: getBackgroundColor() }]}></View>
            <Text style={styles.itemText}>{task.priority}</Text>
          </View>
        </View>
        
        <View style={styles.itemContainer}>
           <Text style={styles.itemTitle}>Статус:</Text>
           <View style={styles.itemContent}>
             {task.status === "undone" && <UndoneIcon width={16} height={16} />}
             {task.status === "inProgress" && <InProgressIcon width={16} height={16} />}
             {task.status === "done" && <DoneIcon width={16} height={16} />}
             <Text style={styles.itemText}>{task.status}</Text>
           </View>
        </View>        

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Категорія:</Text>
            <View style={styles.itemContent}>
              {task.category === "work" && <WorkIcon width={20} height={20} color={color.quaternary} />}
              {task.category === "personal" && <PersonalIcon width={16} height={16} />}
              {task.category === "study" && <StudyIcon width={20} height={20} color={color.quaternary} />}
              <Text style={styles.itemText}>{task.category}</Text>
            </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Дедлайн:</Text>
          <View style={styles.itemContent}>
            <DeadlineIcon width={16} height={16} color={color.quaternary} />
            <Text style={styles.itemText}>{task.deadline}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


