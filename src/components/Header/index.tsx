import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CloseIcon, Label} from '../../assets/icons';
import {DrawerActions} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../navigation/types';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';

interface IHeader {
  isOpenDrawer?: boolean;
  navigation: DrawerNavigationProp<DrawerStackType>;

}

export default function Header({ isOpenDrawer, navigation }: IHeader) { 
  
  const color = useSelector(selectThemeColors);

  const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.secondary,
  },
  burgerBtn: {height: 20, width: 20, gap: 5},
  line: {width: '100%', height: 2, backgroundColor: color.septenary},
});
  
  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.wrapper}>
      <Label />
      <TouchableOpacity style={styles.burgerBtn} onPress={handleOpenDrawer}>
        {isOpenDrawer ? (
          <CloseIcon />
        ) : (
          <>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}


