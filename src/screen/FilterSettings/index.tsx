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

export interface ISettings {
  timeStamp: boolean;
  status: 'done' | 'undone' | 'inProgress' | null;
  priority: 'high' | 'medium' | 'low' | null;
  date: 'today' | 'week' | 'overdue' | null;
  category: 'work' | 'personal' | 'study' | null;
}

export default function FilterSettings() {
  const navigation = useNavigation<FilterSettingsNavigationProp>();
  const [settings, setSettings] = useState<ISettings>({
    timeStamp: false,
    status: null,
    priority: null,
    date: null,
    category: null,
  });

  const handleSwitch = <T extends keyof ISettings>(
    key: T,
    value: ISettings[T],
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSortByTime = () => {
    setSettings(prevState => ({
      ...prevState,
      timeStamp: !prevState.timeStamp,
    }));
  };

  return (
    <ScrollView style={{ margin: 10, gap: 20 }}>
      <View style={{ gap: 20 }}>
        {/* Сортування */}
        <TouchableOpacity onPress={onSortByTime} style={styles.sortByTimeBtn}>
          <View style={styles.activeSortByTime}>
            {settings.timeStamp && <View style={styles.checkedSortByTime} />}
          </View>
          <Text style={styles.sortByTimeText}>
            Сортувати за датою додавання
          </Text>
        </TouchableOpacity>

        {/* За статусом */}
        <Text style={styles.btnText}>За статусом</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('status', item.id)}
          active={settings.status}
          items={[
            { text: 'Виконано', id: 'done' },
            { text: 'Невиконано', id: 'undone' },
            { text: 'У прогресі', id: 'inProgress' },
          ]}
        />

        {/* За пріоритетом */}
        <Text style={styles.btnText}>За пріоритетом</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('priority', item.id)}
          active={settings.priority}
          items={[
            { text: 'Високий', id: 'high' },
            { text: 'Середній', id: 'medium' },
            { text: 'Низький', id: 'low' },
          ]}
        />

        {/* За датами */}
        <Text style={styles.btnText}>За датами</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('date', item.id)}
          active={settings.date}
          items={[
            { text: 'Сьогодні', id: 'today' },
            { text: 'На цьому тижні', id: 'week' },
            { text: 'Прострочені', id: 'overdue' },
          ]}
        />

        {/* За категоріями / проєктами */}
        <Text style={styles.btnText}>За категоріями / проєктами</Text>
        <SwitchBtn
          handleSwitch={item => handleSwitch('category', item.id)}
          active={settings.category}
          items={[
            { text: 'Робота', id: 'work' },
            { text: 'Особисте', id: 'personal' },
            { text: 'Навчання', id: 'study' },
          ]}
        />

        {/* Кнопка застосувати */}
        <DefaultButton
          onPress={() => {
            // Передаємо settings у TASKS_PAGE
            navigation.navigate('TASKS_PAGE', { settings });
          }}
          text={'Показати варіанти'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sortByTimeBtn: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  activeSortByTime: {
    borderRadius: 50,
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#7A71BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedSortByTime: {
    borderRadius: 50,
    width: 10,
    height: 10,
    backgroundColor: '#7A71BA',
  },
  sortByTimeText: {
    fontFamily: fonts.MontserratRegular,
    color: 'black',
  },
  btnText: { fontFamily: fonts.MontserratRegular, color: '#0B0B0B' },
});
