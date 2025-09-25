import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Widget from "./components/Widgets";
import { useSelector } from "react-redux";
import { WidgetsState } from "../../redux/widgets/slice";
import { selectTranslations } from "../../redux/language/selector";
import { selectWidgets, selectTasksByWidget } from "../../redux/widgets/selectors";
import { selectAllTasks } from "../../redux/tasks/selectors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskTabBarStackType } from "../../navigation/types";
import { ScreenNames } from "../../constants/screenNames";
import { ITask } from "../../types/task";
import { getFilters } from "../../constants/widgetConfig";
import { selectThemeColors } from "../../redux/theme/selectors";
import { fonts } from "../../constants/fonts";

const Home = () => {
  const widgets = useSelector(selectWidgets);
  const t = useSelector(selectTranslations);
  const color = useSelector(selectThemeColors);
  const navigation = useNavigation<StackNavigationProp<TaskTabBarStackType>>();  
  const allTasks: ITask[] = useSelector(selectAllTasks);
  const tasksByWidget = useSelector(selectTasksByWidget);

  const filters: { key: keyof WidgetsState; listKey: keyof typeof tasksByWidget; label: string }[] = getFilters(t);  
  const activeFilters = filters.filter(f => widgets[f.key]);

  const styles = StyleSheet.create({
    container: {      
    },
    text: {
      fontFamily: fonts.MontserratRegular,
      fontSize: 16,
      color: color.quaternary,
      textAlign: "center",
      marginTop: 30,
    },      
  });
  
  if (allTasks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t.taskListEmpty}</Text>
      </View>
    );
  }
  
  if (activeFilters.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t.screenHome.selectWidgets}</Text>
      </View>
    );
  }
  
  const noTasksInWidgets = activeFilters.every(f => tasksByWidget[f.listKey].length === 0);
  if (noTasksInWidgets) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t.screenHome.selectWidgetsEmpty}</Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={activeFilters}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <Widget
          title={item.label}
          filterKey={item.key}
          listKey={item.listKey}
          onTaskPress={(task: ITask) =>
            navigation.navigate(ScreenNames.DETAILS_TASK_PAGE, {
              task,
              backPath: ScreenNames.HOME_PAGE,
            })
          }
        />
      )}
    />
  );
};

export default Home;
