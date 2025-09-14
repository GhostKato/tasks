import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowIcon} from '../../../assets/icons';
import {fonts} from '../../../constants/fonts';
import {useNavigation} from '@react-navigation/core';
import {FilterSettingsNavigationProp} from '../../../navigation/types';
import { useTranslation } from '../../../context/LanguageContext';
import { ScreenNames } from '../../../constants/screenNames';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/settings/selectors';

export default function FilterSettingsHeader() {

  const color = useSelector(selectThemeColors);
  const { t } = useTranslation();
  const navigation = useNavigation<FilterSettingsNavigationProp>();

  const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: color.tertiary,    
  },
  backBtn: {
    transform: [{rotate: '180deg'}],
  },
  title: {
    flex: 0.62,
    fontFamily: fonts.MontserratSemiBold,
    color: color.quaternary,
  },
  });
  
  return (
    <View style={styles.mainWrapper}>
      <TouchableOpacity
        onPress={() => navigation.navigate(ScreenNames.ALL_TASKS_PAGE, {})}
        style={styles.backBtn}>
        <ArrowIcon width={20} height={20} />
      </TouchableOpacity>
      <Text style={styles.title}>{t.screenFilterSettings.headerTitle}</Text>
    </View>
  );
}
