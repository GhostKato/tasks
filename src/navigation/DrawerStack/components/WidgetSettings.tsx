import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectThemeColors } from "../../../redux/theme/selectors";
import DefaultSwitch from "../../../components/DefaultSwitch";
import { selectWidgetBoolean } from "../../../redux/widgets/selectors";
import { toggleWidget } from "../../../redux/widgets/slice";
import { selectTranslations } from "../../../redux/language/selector";

export default function WidgetSettings() {
  const color = useSelector(selectThemeColors);
  const isActive = useSelector(selectWidgetBoolean);
  const t = useSelector(selectTranslations);

  const styles = StyleSheet.create({    
    contentWrapper: {
      padding: 20,
      gap: 10,      
      borderWidth: 2,
      borderColor: color.secondary,      
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      minHeight: 200,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent:'space-around'
    },
    switchItem: {
      gap: 10,
      alignItems: 'center',
      width: 90,
    },
    titleCategory: {
      textAlign: 'center',
      color: color.senary,
      paddingBottom: 10,
      fontWeight: 'bold',
      fontSize: 16,
    },
    nameSwitch: {
      color: color.senary 
    },   
  });

  const switchBlocks = [
    {
      title: t.filterSettings.byStatusTitle,
      items: [
        { key: 'isUndone', label: t.filterSettings.byStatus.undone },
        { key: 'isInProgress', label: t.filterSettings.byStatus.inProgress },
        { key: 'isDone', label: t.filterSettings.byStatus.done },
      ]
    },
    {
      title: t.filterSettings.byPriorityTitle,
      items: [
        { key: 'isLow', label: t.filterSettings.byPriority.low },
        { key: 'isMedium', label: t.filterSettings.byPriority.medium },
        { key: 'isHigh', label: t.filterSettings.byPriority.high },
      ]
    },
    {
      title: t.filterSettings.byDatesTitle,
      items: [
        { key: 'isToday', label: t.filterSettings.byDates.today },
        { key: 'isThisWeek', label: t.filterSettings.byDates.thisWeek },
        { key: 'isOverdue', label: t.filterSettings.byDates.overdue },
      ]
    },
    {
      title: t.filterSettings.byCategoriesTitle,
      items: [
        { key: 'isWork', label: t.filterSettings.byCategories.work },
        { key: 'isPersonal', label: t.filterSettings.byCategories.personal },
        { key: 'isStudy', label: t.filterSettings.byCategories.study },
      ]
    }
  ];

  return (
    <View style={styles.contentWrapper}>
      {switchBlocks.map((block, i) => (
        <View key={i}>
          <Text style={styles.titleCategory}>{block.title}</Text>
          <View style={styles.switchContainer}>
            {block.items.map((item) => (
              <View style={styles.switchItem} key={item.key}>
                <Text style={styles.nameSwitch}>{item.label}</Text>
                <DefaultSwitch 
                  isActive={isActive[item.key as keyof typeof isActive]} 
                  action={toggleWidget} 
                  payload={item.key} 
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
