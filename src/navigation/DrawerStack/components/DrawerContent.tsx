import {StyleSheet, View} from 'react-native';
import Header from '../../../components/Header';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../../navigation/types';
import LogoutButton from '../../../components/LogoutButton';
import { fonts } from '../../../constants/fonts';
import ThemeSwitcher from '../../../components/ThemeSwitcher';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../../../redux/language/selector';
import LanguageFlags from '../../../components/LanguageFlags';

interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {

  const t = useSelector(selectTranslations);
  
  return (
    <View>
      <Header isOpenDrawer={true} navigation={navigation} />
      <View style={styles.mainWrapper}>            
        <ThemeSwitcher />
        <LanguageFlags/>
        <LogoutButton />        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainWrapper: {margin: 20, gap: 40},
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