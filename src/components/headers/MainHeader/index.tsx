import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {CloseIcon, DrawerIcon, Logo} from '../../../assets/icons';
import {DrawerActions} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../../navigation/types';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../../redux/theme/selectors';

interface IHeader {
  isOpenDrawer?: boolean;
  navigation: DrawerNavigationProp<DrawerStackType>;

}

export default function MainHeader({ isOpenDrawer, navigation }: IHeader) { 
  
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
  drawerBtn: {height: 20, width: 20, gap: 5},  
});
  
  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.wrapper}>
      <Logo />
      <TouchableOpacity style={styles.drawerBtn} onPress={handleOpenDrawer}>
        {isOpenDrawer ? (
          <CloseIcon />
        ) : (
          <DrawerIcon/>
        )}
      </TouchableOpacity>
    </View>
  );
}


