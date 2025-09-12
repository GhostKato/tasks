import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowIcon} from '../../assets/icons';
import {fonts} from '../../constants/fonts';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';

export default function SettingsHeader() {

  const { color } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: color.secondary,    
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
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <ArrowIcon width={20} height={20} />
      </TouchableOpacity>
      <Text style={styles.title}>{t.screenFilterSettings.headerTitle}</Text>
    </View>
  );
}
