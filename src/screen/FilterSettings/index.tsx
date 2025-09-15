import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetFilters, setFilter, toggleTimeStamp } from '../../redux/filters/slice';
import DefaultFilterSwitch from '../../components/DefaultFilterSwitch';
import DefaultButton from '../../components/DefaultButton';
import { useNavigation } from '@react-navigation/core';
import { FilterSettingsNavigationProp } from '../../navigation/types';
import { ScreenNames } from '../../constants/screenNames';
import { selectThemeColors } from '../../redux/theme/selectors';
import { selectTranslations } from '../../redux/language/selector';

export default function FilterSettings() {
  const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const navigation = useNavigation<FilterSettingsNavigationProp>();
  const filters = useSelector((state: any) => state.filters); 

  const styles = StyleSheet.create({
    sortByTimeBtn: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    activeSortByTime: {
      borderRadius: 50,
      width: 15,
      height: 15,
      borderWidth: 1,
      borderColor: color.secondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkedSortByTime: {
      borderRadius: 50,
      width: 10,
      height: 10,
      backgroundColor: color.secondary,
    },
    sortByTimeText: {
      fontFamily: 'Montserrat-Regular',
      color: color.quaternary,
    },    
    btnText: { fontFamily: 'Montserrat-Regular', color: color.quaternary },
  });

  return (
    <ScrollView style={{ margin: 10, gap: 20 }}>
      <View style={{ gap: 20 }}>

        {/* Сортування */}
        <TouchableOpacity onPress={() => dispatch(toggleTimeStamp())} style={styles.sortByTimeBtn}>
          <View style={styles.activeSortByTime}>
            {filters.timeStamp && <View style={styles.checkedSortByTime} />}
          </View>
          <Text style={styles.sortByTimeText}>{t.filterSettings.sortByDate}</Text>
        </TouchableOpacity>

        {/* Статус */}
        <Text style={styles.btnText}>{t.filterSettings.byStatusTitle}</Text>
        <DefaultFilterSwitch<'done' | 'undone' | 'inProgress' | null>
          items={[
            { text: t.filterSettings.allTasks, id: null },            
            { text: t.filterSettings.byStatus.undone, id: 'undone' },
            { text: t.filterSettings.byStatus.inProgress, id: 'inProgress' },
            { text: t.filterSettings.byStatus.done, id: 'done' },
          ]}
          active={filters.status}
          handleSwitch={item => dispatch(setFilter({ key: 'status', value: item.id }))}
        />

        {/* Пріоритет */}
        <Text style={styles.btnText}>{t.filterSettings.byPriorityTitle}</Text>
        <DefaultFilterSwitch<'high' | 'medium' | 'low' | null>
          items={[
            { text: t.filterSettings.allTasks, id: null },
             { text: t.filterSettings.byPriority.low, id: 'low' },
            { text: t.filterSettings.byPriority.medium, id: 'medium' },           
            { text: t.filterSettings.byPriority.high, id: 'high' },
          ]}
          active={filters.priority}
          handleSwitch={item => dispatch(setFilter({ key: 'priority', value: item.id }))}
        />

        {/* Дати */}
        <Text style={styles.btnText}>{t.filterSettings.byDatesTitle}</Text>
        <DefaultFilterSwitch<'today' | 'week' | 'overdue' | null>
          items={[
            { text: t.filterSettings.allTasks, id: null },
            { text: t.filterSettings.byDates.today, id: 'today' },
            { text: t.filterSettings.byDates.thisWeek, id: 'week' },
            { text: t.filterSettings.byDates.overdue, id: 'overdue' },
          ]}
          active={filters.date}
          handleSwitch={item => dispatch(setFilter({ key: 'date', value: item.id }))}
        />

        {/* Категорії */}
        <Text style={styles.btnText}>{t.filterSettings.byCategoriesTitle}</Text>
        <DefaultFilterSwitch<'work' | 'personal' | 'study' | null>
          items={[
            { text: t.filterSettings.allTasks, id: null },
            { text: t.filterSettings.byCategories.work, id: 'work' },
            { text: t.filterSettings.byCategories.personal, id: 'personal' },
            { text: t.filterSettings.byCategories.study, id: 'study' },
          ]}
          active={filters.category}
          handleSwitch={item => dispatch(setFilter({ key: 'category', value: item.id }))}
        />        
          
          {/* Зкинути фільтри */}
          <DefaultButton
            onPress={() => dispatch(resetFilters())}
            text={t.filterSettings.resetFiltersBtn}
        />
        
        {/* Застосувати */}
          <DefaultButton
            onPress={() => navigation.navigate(ScreenNames.ALL_TASKS_PAGE, { settings: filters })}
            text={t.filterSettings.showVariationsBtn}
          />
      </View>
    </ScrollView>
  );
}
