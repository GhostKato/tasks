import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/Header';
import { ArrowIcon } from '../../../assets/icons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../../navigation/types';
import { useTranslation } from '../../../context/LanguageContext';
import LogoutButton from '../../../components/LogoutButton';
import { fonts } from '../../../constants/fonts';
import { ScreenNames } from '../../../constants/screenNames';

interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {

  const { t } = useTranslation();
  
  return (
    <View>
      <Header isOpenDrawer={true} navigation={navigation} />
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper}
         onPress={() => navigation.navigate(ScreenNames.TASK_TAB_BAR_STACK)}>
          <Text style={styles.text}>{t.draverBar.tasks}</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}
        onPress={() => navigation.navigate(ScreenNames.SETTINGS_TAB_BAR_STACK)}>
          <Text style={styles.text}>{t.draverBar.settings}</Text>
          <ArrowIcon />
        </TouchableOpacity>        
        <LogoutButton/>
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