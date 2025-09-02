import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../Header';
import {fonts} from '../../constants/fonts';
import { ArrowIcon } from '../../assets/icons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../navigation/types';

interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {
  return (
    <View>
      <Header isOpenDrawer={true} navigation={navigation} />
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper}
         onPress={() => navigation.navigate('MAIN_TAB_BAR_STACK')}>
          <Text style={styles.text}>Tasks</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}
        onPress={() => navigation.navigate('SETTINGS_TAB_BAR_STACK')}>
          <Text style={styles.text}>Settings</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>Exit</Text>
        </TouchableOpacity>        
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