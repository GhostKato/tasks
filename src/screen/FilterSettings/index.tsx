import { 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { fonts } from '../../constants/fonts';
import SwitchBtn from '../../components/SwitchButton';
import DefaultButton from '../../components/DefaultButton';
import { useNavigation } from '@react-navigation/core';
import { FilterSettingsNavigationProp } from '../../navigation/types'; 
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';
import { ScreenNames } from '../../constants/screenNames';

export interface ISettings {
  timeStamp: boolean; // локальний прапорець сортування
  status: 'done' | 'undone' | 'inProgress' | null;
  priority: 'high' | 'medium' | 'low' | null;
  date: 'today' | 'week' | 'overdue' | null;
  category: 'work' | 'personal' | 'study' | null;
}

export default function FilterSettings() {
  const { color } = useTheme();
  const { t } = useTranslation();

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
      fontFamily: fonts.MontserratRegular,
      color: color.quaternary,
    },
    btnText: { fontFamily: fonts.MontserratRegular, color: color.quaternary },
  });

  const navigation = useNavigation<FilterSettingsNavigationProp>();
  const [settings, setSettings] = useState<ISettings>({
    timeStamp: false,
    status: null,
    priority: null,
    date: null,
    category: null,
  });

  const handleSwitch = <T extends keyof ISettings>(key: T, value: ISettings[T]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const onSortByTime = () => {
    setSettings(prev => ({ ...prev, timeStamp: !prev.timeStamp }));
  };

  return (
    <ScrollView style={{ margin: 10, gap: 20 }}>
      <View style={{ gap: 20 }}>
        {/* Сортування */}
        <TouchableOpacity onPress={onSortByTime} style={styles.sortByTimeBtn}>
          <View style={styles.activeSortByTime}>
            {settings.timeStamp && <View style={styles.checkedSortByTime} />}
          </View>
          <Text style={styles.sortByTimeText}>{t.screenFilterSettings.sortByDate}</Text>
        </TouchableOpacity>

        {/* За статусом */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byStatusTitle}</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('status', item.id)}
          active={settings.status}
          items={[
            { text: t.screenFilterSettings.byStatus.done, id: 'done' },
            { text: t.screenFilterSettings.byStatus.undone, id: 'undone' },
            { text: t.screenFilterSettings.byStatus.inProgress, id: 'inProgress' },
          ]}
        />

        {/* За пріоритетом */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byPriorityTitle}</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('priority', item.id)}
          active={settings.priority}
          items={[
            { text: t.screenFilterSettings.byPriority.high, id: 'high' },
            { text: t.screenFilterSettings.byPriority.medium, id: 'medium' },
            { text: t.screenFilterSettings.byPriority.low, id: 'low' },
          ]}
        />

        {/* За датами */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byDatesTitle}</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('date', item.id)}
          active={settings.date}
          items={[
            { text: t.screenFilterSettings.byDates.today, id: 'today' },
            { text: t.screenFilterSettings.byDates.thisWeek, id: 'week' },
            { text: t.screenFilterSettings.byDates.overdue, id: 'overdue' },
          ]}
        />

        {/* За категоріями */}
        <Text style={styles.btnText}>{t.screenFilterSettings.byCategoriesTitle}</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('category', item.id)}
          active={settings.category}
          items={[
            { text: t.screenFilterSettings.byCategories.work, id: 'work' },
            { text: t.screenFilterSettings.byCategories.personal, id: 'personal' },
            { text: t.screenFilterSettings.byCategories.learning, id: 'study' },
          ]}
        />

        {/* Кнопка застосувати */}
        <DefaultButton
          onPress={() => {
            navigation.navigate(ScreenNames.TASKS_PAGE, { settings });
          }}
          text={t.screenFilterSettings.showVariationsBtn}
        />
      </View>
    </ScrollView>
  );
}
