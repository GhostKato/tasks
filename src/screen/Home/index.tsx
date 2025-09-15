import React from "react";
import { FlatList } from "react-native";
import Widget from "./components/Widgets";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { WidgetsState } from "../../redux/widgets/slice";
import { selectTranslations } from "../../redux/language/selector";

const Home = () => {
  const widgets = useSelector((state: RootState) => state.widgets);
  const t = useSelector(selectTranslations);

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
        />
      )}
    />
  );
};

export default Home;
