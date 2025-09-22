import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetFilters, setFilter, toggleTimeStamp } from '../../redux/filters/slice';
import FilterSwitch from '../../components/FilterSwitch';
import DefaultButton from '../../components/DefaultButton';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ScreenNames } from '../../constants/screenNames';
import { selectThemeColors } from '../../redux/theme/selectors';
import { selectTranslations } from '../../redux/language/selector';
import ScreenHeader from '../../components/ScreenHeader';
import { TaskTabBarStackType } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { FiltersState } from '../../redux/filters/slice';
import { selectAreFiltersDefault } from '../../redux/filters/selectors';

type FilterSettingsNavigationProp = StackNavigationProp<TaskTabBarStackType>;
type FilterSettingsRouteProp = RouteProp<TaskTabBarStackType, ScreenNames.FILTERS_SETTINGS_PAGE>;

export default function FilterSettings() {
  const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.filters as FiltersState);
  const areFiltersDefault = useSelector(selectAreFiltersDefault);

  const navigation = useNavigation<FilterSettingsNavigationProp>();
  const route = useRoute<FilterSettingsRouteProp>();
  const backPath = route.params?.backPath ?? ScreenNames.ALL_TASKS_PAGE;

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
    sortByTimeText: { fontFamily: 'Montserrat-Regular', color: color.quaternary },
    btnText: { fontFamily: 'Montserrat-Regular', color: color.quaternary },
    actions: {
    flexDirection: "row",
    justifyContent: "space-around",
      gap: 10,
    
    },
    buttonReset: {
    flex: 0.5
    },
    buttonShowVariations: {
    flex: 1
  },
  });

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={t.namesScreenForHeader?.filtersSettings} showBack backPath={backPath} />

      <ScrollView style={{ margin: 10, gap: 20 }}>
        <View style={{ gap: 20 }}>
          {/* Sorting */}
          <TouchableOpacity onPress={() => dispatch(toggleTimeStamp())} style={styles.sortByTimeBtn}>
            <View style={styles.activeSortByTime}>
              {filters.timeStamp && <View style={styles.checkedSortByTime} />}
            </View>
            <Text style={styles.sortByTimeText}>{t.filterSettings.sortByDate}</Text>
          </TouchableOpacity>

          {/* Status */}
          <Text style={styles.btnText}>{t.filterSettings.byStatusTitle}</Text>
          <FilterSwitch<'done' | 'undone' | 'inProgress' | null>
            items={[
              { text: t.filterSettings.allTasks, id: null },
              { text: t.filterSettings.byStatus.undone, id: 'undone' },
              { text: t.filterSettings.byStatus.inProgress, id: 'inProgress' },
              { text: t.filterSettings.byStatus.done, id: 'done' },
            ]}
            active={filters.status}
            handleSwitch={item => dispatch(setFilter({ key: 'status', value: item.id }))}
          />

          {/* Priority */}
          <Text style={styles.btnText}>{t.filterSettings.byPriorityTitle}</Text>
          <FilterSwitch<'high' | 'medium' | 'low' | null>
            items={[
              { text: t.filterSettings.allTasks, id: null },
              { text: t.filterSettings.byPriority.low, id: 'low' },
              { text: t.filterSettings.byPriority.medium, id: 'medium' },
              { text: t.filterSettings.byPriority.high, id: 'high' },
            ]}
            active={filters.priority}
            handleSwitch={item => dispatch(setFilter({ key: 'priority', value: item.id }))}
          />

          {/* Dates */}
          <Text style={styles.btnText}>{t.filterSettings.byDatesTitle}</Text>
          <FilterSwitch<'today' | 'week' | 'overdue' | null>
            items={[
              { text: t.filterSettings.allTasks, id: null },
              { text: t.filterSettings.byDates.today, id: 'today' },
              { text: t.filterSettings.byDates.thisWeek, id: 'week' },
              { text: t.filterSettings.byDates.overdue, id: 'overdue' },
            ]}
            active={filters.date}
            handleSwitch={item => dispatch(setFilter({ key: 'date', value: item.id }))}
          />

          {/* Categories */}
          <Text style={styles.btnText}>{t.filterSettings.byCategoriesTitle}</Text>
          <FilterSwitch<'work' | 'personal' | 'study' | null>
            items={[
              { text: t.filterSettings.allTasks, id: null },
              { text: t.filterSettings.byCategories.work, id: 'work' },
              { text: t.filterSettings.byCategories.personal, id: 'personal' },
              { text: t.filterSettings.byCategories.study, id: 'study' },
            ]}
            active={filters.category}
            handleSwitch={item => dispatch(setFilter({ key: 'category', value: item.id }))}
          />

          <View style={styles.actions}>
             {!areFiltersDefault && (
            <View style={styles.buttonReset}>
              <DefaultButton
                onPress={() => dispatch(resetFilters())}
                text={t.filterSettings.resetFiltersBtn}
                backgroundColor={color.nonary}
              />
            </View>  
             )}
            <View style={styles.buttonShowVariations}>
              <DefaultButton
                onPress={() =>
                  navigation.navigate(ScreenNames.ALL_TASKS_PAGE, {
                    settings: filters,
                    backPath: backPath,
                  })
                }
                text={t.filterSettings.showVariationsBtn}
                backgroundColor={color.secondary}
              />
            </View>
         </View>
        </View>
      </ScrollView>
    </View>
  );
}
