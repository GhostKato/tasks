import React from "react";
import { FlatList } from "react-native";
import Widget from "./components/Widgets";
import { useSelector } from "react-redux";
import { WidgetsState } from "../../redux/widgets/slice";
import { selectTranslations } from "../../redux/language/selector";
import { selectWidgetBoolean } from "../../redux/widgets/selectors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TaskTabBarStackType } from "../../navigation/types";
import { ScreenNames } from "../../constants/screenNames";
import { ITask } from "../../types/task";

const Home = () => {
  const widgets = useSelector(selectWidgetBoolean);
  const t = useSelector(selectTranslations);
  const navigation = useNavigation<StackNavigationProp<TaskTabBarStackType>>();

  const filters: { key: keyof WidgetsState; listKey: string; title: string }[] = [
    { key: "isUndone", listKey: "undone", title: t.filterSettings.byStatus.undone },
    { key: "isInProgress", listKey: "inProgress", title: t.filterSettings.byStatus.inProgress },
    { key: "isDone", listKey: "done", title: t.filterSettings.byStatus.done },
    { key: "isLow", listKey: "low", title: t.filterSettings.byPriority.low },
    { key: "isMedium", listKey: "medium", title: t.filterSettings.byPriority.medium },
    { key: "isHigh", listKey: "high", title: t.filterSettings.byPriority.high },
    { key: "isToday", listKey: "today", title: t.filterSettings.byDates.today },
    { key: "isThisWeek", listKey: "week", title: t.filterSettings.byDates.thisWeek },
    { key: "isOverdue", listKey: "overdue", title: t.filterSettings.byDates.overdue },
    { key: "isWork", listKey: "work", title: t.filterSettings.byCategories.work },
    { key: "isPersonal", listKey: "personal", title: t.filterSettings.byCategories.personal },
    { key: "isStudy", listKey: "study", title: t.filterSettings.byCategories.study },
  ];

  const activeFilters = filters.filter(f => widgets[f.key]);

  return (
    <FlatList
      data={activeFilters}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <Widget
          title={item.title}
          filterKey={item.key}
          listKey={item.listKey}
          onTaskPress={(task: ITask) => 
            navigation.navigate(ScreenNames.DETAILS_TASK_PAGE, {
              task,
              backPath: ScreenNames.HOME_PAGE
            })
          }
        />
      )}
    />
  );
};

export default Home;
