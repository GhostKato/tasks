import { View, TouchableOpacity } from 'react-native';
import { SettingsIcon } from '../../../assets/icons';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ITask } from '../../../types/task';
import Input from '../../../components/Input';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { RootState } from '../../../redux/store';
import { ScreenNames } from '../../../constants/screenNames';
import { SearchBarNavigationProp } from '../../../navigation/types';

interface ISearchBar {
  handleSearch: (text: string) => void;
  tasks?: ITask[];
  backPath?: ScreenNames;
}

export default function SearchBar({ handleSearch, backPath }: ISearchBar) {
  const color = useSelector(selectThemeColors);
  const filters = useSelector((state: RootState) => state.filters);

  const [query, setQuery] = useState('');
  const navigation = useNavigation<SearchBarNavigationProp>();

  useEffect(() => {
    const timeout = setTimeout(() => handleSearch(query), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleNavigateToFilters = () => {
    navigation.navigate(ScreenNames.FILTERS_SETTINGS_PAGE, {
      settings: filters,
      backPath: backPath ?? ScreenNames.ALL_TASKS_PAGE,
    });
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
          borderColor: color.quaternary,
        }}
        onPress={handleNavigateToFilters}
      >
        <SettingsIcon color={color.quaternary} />
      </TouchableOpacity>
    </View>
  );
}
