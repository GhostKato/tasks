import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/Header';
import { ArrowIcon } from '../../../assets/icons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../../navigation/types';
import LogoutButton from '../../../components/LogoutButton';
import { fonts } from '../../../constants/fonts';
import { ScreenNames } from '../../../constants/screenNames';
import LanguageDropdown from '../../../components/LanguageDropdown';
import ThemeSwitcher from '../../../components/ThemeSwitcher';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../../redux/language/selector';

interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {

  const t = useSelector(selectTranslations);
  
  return (
    <View>
      <Header isOpenDrawer={true} navigation={navigation} />
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper}
         onPress={() => navigation.navigate(ScreenNames.TASK_TAB_BAR_STACK)}>
          <Text style={styles.text}>{t.draverBar.tasks}</Text>
          <ArrowIcon />
        </TouchableOpacity>        
        <ThemeSwitcher />
        <LanguageDropdown/>
        <LogoutButton />        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {marginHorizontal: 10, gap: 16},
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 16,
    color: 'black',
  },
});