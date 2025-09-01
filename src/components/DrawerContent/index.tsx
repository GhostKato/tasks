import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../Header';
import {fonts} from '../../constants/fonts';
import { ArrowIcon } from '../../assets/icons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../navigation/types';
import ThemeSwitcher from '../ThemeSwitcher';


interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {
  return (
    <View>
      <Header isOpenDrawer={true} navigation={navigation} />
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>Наш сайт</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>Налаштування мови</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>Вихід</Text>
        </TouchableOpacity>
        <ThemeSwitcher />
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