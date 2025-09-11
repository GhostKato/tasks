import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AboutIcon } from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../../navigation/types';
import { ITask } from '../../Tasks';

interface ISearchBar {
  handleSearch: (text: string) => void;
  tasks: ITask[];
}

export default function SearchBar({ handleSearch, tasks }: ISearchBar) {
  const [query, setQuery] = useState('');
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleNavigateToFilters = () => {
    navigation.navigate('FILTERS_SETTINGS_PAGE', { tasksList: tasks });
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchIconWrapper}>
          <AboutIcon />
        </View>
        <TextInput
          placeholder={'Пошук задач'}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={handleNavigateToFilters}
      >
        <AboutIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flexDirection: 'row', alignItems: 'center' },
  searchWrapper: {
    borderRadius: 20,
    backgroundColor: '#EFF1F4',
    height: 40,
    width: Dimensions.get('window').width - 70,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIconWrapper: { marginHorizontal: 20 },
  settingsIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF1F4',
  },
});
