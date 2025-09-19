import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeColors } from "../../../redux/theme/selectors";
import DefaultSwitch from "../../../components/DefaultSwitch";
import { selectWidgetBoolean } from "../../../redux/widgets/selectors";
import { resetWidget, toggleWidget } from "../../../redux/widgets/slice";
import { selectTranslations } from "../../../redux/language/selector";
import DefaultButton from "../../../components/DefaultButton";
import { fonts } from "../../../constants/fonts";

export default function WidgetSettings() {
  const color = useSelector(selectThemeColors);
  const isActive = useSelector(selectWidgetBoolean);
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({    
    contentWrapper: {
      padding: 20,
      gap: 20,      
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
      fontFamily: fonts.MontserratExtraBold,
      fontSize: 16,
    },
    nameSwitch: {
      color: color.senary,
      fontFamily: fonts.MontserratMedium,
    },
    btnContainer: {
      paddingHorizontal: 120, 
    },   
  });

  const switchBlocks = [
    {
      title: t.drawer.widget.byStatusTitle,
      items: [
        { key: 'isUndone', label: t.drawer.widget.byStatus.undone },
        { key: 'isInProgress', label: t.drawer.widget.byStatus.inProgress },
        { key: 'isDone', label: t.drawer.widget.byStatus.done },
      ]
    },
    {
      title: t.drawer.widget.byPriorityTitle,
      items: [
        { key: 'isLow', label: t.drawer.widget.byPriority.low },
        { key: 'isMedium', label: t.drawer.widget.byPriority.medium },
        { key: 'isHigh', label: t.drawer.widget.byPriority.high },
      ]
    },
    {
      title: t.drawer.widget.byDatesTitle,
      items: [
        { key: 'isToday', label: t.drawer.widget.byDates.today },
        { key: 'isThisWeek', label: t.drawer.widget.byDates.thisWeek },
        { key: 'isOverdue', label: t.drawer.widget.byDates.overdue },
      ]
    },
    {
      title: t.drawer.widget.byCategoriesTitle,
      items: [
        { key: 'isWork', label: t.drawer.widget.byCategories.work },
        { key: 'isPersonal', label: t.drawer.widget.byCategories.personal },
        { key: 'isStudy', label: t.drawer.widget.byCategories.study },
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
     <View style={styles.btnContainer}>
        <DefaultButton 
          text={t.drawer.widget.resetBtn} 
          onPress={() => dispatch(resetWidget())}
          backgroundColor={color.nonary}
        />
     </View >
    </View>
  );
}
