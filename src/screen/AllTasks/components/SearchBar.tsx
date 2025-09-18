import { View, TouchableOpacity } from 'react-native';
import { SettingsIcon } from '../../../assets/icons';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../components/Input';
import { selectThemeColors } from '../../../redux/theme/selectors';
import { RootState } from '../../../redux/store';
import { ScreenNames } from '../../../constants/screenNames';
import { SearchBarNavigationProp } from '../../../navigation/types';
import { setFilter } from '../../../redux/filters/slice';

interface ISearchBar {
  backPath?: ScreenNames;
}

export default function SearchBar({ backPath }: ISearchBar) {
  const color = useSelector(selectThemeColors);
  const searchQuery = useSelector((state: RootState) => state.filters.searchQuery);
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const navigation = useNavigation<SearchBarNavigationProp>();

  const handleSearch = useCallback(
    (text: string) => {
      dispatch(setFilter({ key: 'searchQuery', value: text }));
    },
    [dispatch]
  );

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
        value={searchQuery}
        onChangeText={handleSearch}
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
