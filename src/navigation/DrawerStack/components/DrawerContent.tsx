import {StyleSheet, View} from 'react-native';
import Header from '../../../components/Header';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackType} from '../../../navigation/types';
import LogoutButton from '../../../components/LogoutButton';

import ThemeSwitcher from '../../../components/ThemeSwitcher';
import { useSelector } from 'react-redux';

import LanguageFlags from '../../../components/LanguageFlags';
import { selectThemeColors } from '../../../redux/theme/selectors';

interface Props {
  navigation: DrawerNavigationProp<DrawerStackType>;
}

export default function DrawerContent({ navigation }: Props) {

  const color = useSelector(selectThemeColors);  

  const styles = StyleSheet.create({
    mainWrapper: {     
      height: '100%',
      backgroundColor: color.tertiary,       
    },
    contentWrapper: {
      padding: 20,
      gap: 40,
      margin: 20,           
      borderWidth: 2,
      borderColor: color.secondary,
      borderRadius: 20,      
    },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },  
});
  
  return (
    <View style={styles.mainWrapper}>
      <Header isOpenDrawer={true} navigation={navigation} />
      <View style={styles.contentWrapper}>            
        <ThemeSwitcher />
        <LanguageFlags/>
        <LogoutButton />        
      </View>
    </View>
  );
}
