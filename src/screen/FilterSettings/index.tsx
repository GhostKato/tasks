import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetFilters, setFilter, toggleTimeStamp } from '../../redux/filters/slice';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';
import SwitchBtn from '../../components/SwitchButton';
import DefaultButton from '../../components/DefaultButton';
import { useNavigation } from '@react-navigation/core';
import { FilterSettingsNavigationProp } from '../../navigation/types';
import { ScreenNames } from '../../constants/screenNames';

export default function FilterSettings() {
  const { color } = useTheme();
  const { t } = useTranslation();
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
          <Text style={styles.sortByTimeText}>{t.screenFilterSettings.sortByDate}</Text>
        </TouchableOpacity>

        {/* Статус */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byStatusTitle}</Text>
        <SwitchBtn<'done' | 'undone' | 'inProgress' | null>
          items={[
            { text: t.screenFilterSettings.allTasks, id: null },
            { text: t.screenFilterSettings.byStatus.done, id: 'done' },
            { text: t.screenFilterSettings.byStatus.undone, id: 'undone' },
            { text: t.screenFilterSettings.byStatus.inProgress, id: 'inProgress' },
          ]}
          active={filters.status}
          handleSwitch={item => dispatch(setFilter({ key: 'status', value: item.id }))}
        />

        {/* Пріоритет */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byPriorityTitle}</Text>
        <SwitchBtn<'high' | 'medium' | 'low' | null>
          items={[
            { text: t.screenFilterSettings.allTasks, id: null },
            { text: t.screenFilterSettings.byPriority.high, id: 'high' },
            { text: t.screenFilterSettings.byPriority.medium, id: 'medium' },
            { text: t.screenFilterSettings.byPriority.low, id: 'low' },
          ]}
          active={filters.priority}
          handleSwitch={item => dispatch(setFilter({ key: 'priority', value: item.id }))}
        />

        {/* Дати */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byDatesTitle}</Text>
        <SwitchBtn<'today' | 'week' | 'overdue' | null>
          items={[
            { text: t.screenFilterSettings.allTasks, id: null },
            { text: t.screenFilterSettings.byDates.today, id: 'today' },
            { text: t.screenFilterSettings.byDates.thisWeek, id: 'week' },
            { text: t.screenFilterSettings.byDates.overdue, id: 'overdue' },
          ]}
          active={filters.date}
          handleSwitch={item => dispatch(setFilter({ key: 'date', value: item.id }))}
        />

        {/* Категорії */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byCategoriesTitle}</Text>
        <SwitchBtn<'work' | 'personal' | 'study' | null>
          items={[
            { text: t.screenFilterSettings.allTasks, id: null },
            { text: t.screenFilterSettings.byCategories.work, id: 'work' },
            { text: t.screenFilterSettings.byCategories.personal, id: 'personal' },
            { text: t.screenFilterSettings.byCategories.learning, id: 'study' },
          ]}
          active={filters.category}
          handleSwitch={item => dispatch(setFilter({ key: 'category', value: item.id }))}
        />        
          
          {/* Зкинути фільтри */}
          <DefaultButton
            onPress={() => dispatch(resetFilters())}
            text={t.screenFilterSettings.resetFiltersBtn}
        />
        
        {/* Застосувати */}
          <DefaultButton
            onPress={() => navigation.navigate(ScreenNames.ALL_TASKS_PAGE, { settings: filters })}
            text={t.screenFilterSettings.showVariationsBtn}
          />
      </View>
    </ScrollView>
  );
}
