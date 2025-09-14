import { View, TouchableOpacity } from 'react-native';
import { SettingsIcon } from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../../navigation/types';
import { ITask } from '../../../types/task';
import Input from '../../../components/Input';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';

interface ISearchBar {
  handleSearch: (text: string) => void;
  tasks: ITask[];
}

export default function SearchBar({ handleSearch, tasks }: ISearchBar) {

  const color = useSelector(selectThemeColors);

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
    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
      <Input
        placeholder="Пошук задач"
        value={query}
        onChangeText={setQuery}
        additionalContainerStyle={{ flex: 1 }}
      />
      <TouchableOpacity
        style={{
          height: 45,
          width: 45,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',          
          marginLeft: 10,
          borderWidth: 1,
          borderColor: color.quaternary
        }}
        onPress={handleNavigateToFilters}
      >
        <SettingsIcon color={color.quaternary} />
      </TouchableOpacity>
    </View>
  );
}
