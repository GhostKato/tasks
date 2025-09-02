import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenNames } from '../../constants/screenNames';
import MainTabBarStack from '../TabBarStack/MainTabBarStack';
import SettingsTabBarStack from '../TabBarStack/SettingsTabBarStack';
import { DrawerStackType } from '../types';
import Header from '../../components/Header';
import { Dimensions } from 'react-native';
import DrawerContent from '../../components/DrawerContent';
import { useTheme } from '../../context/ThemeContext';

const Drawer = createDrawerNavigator<DrawerStackType>();

export default function DrawerStack() {

  const { theme } = useTheme();

  return (
    <Drawer.Navigator
  initialRouteName={ScreenNames.MAIN_TAB_BAR_STACK}
  drawerContent={(props) => <DrawerContent {...props} />}
  screenOptions={{
    drawerPosition: 'right',
    drawerStyle: {
      width: Dimensions.get('window').width,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: theme.primary, 
    },    
  }}
>
  <Drawer.Screen
    name={ScreenNames.MAIN_TAB_BAR_STACK}
    component={MainTabBarStack}
    options={{
      header: ({ navigation }) => <Header navigation={navigation} />,
    }}
      />
      <Drawer.Screen
    name={ScreenNames.SETTINGS_TAB_BAR_STACK}
    component={SettingsTabBarStack}
    options={{
      header: ({ navigation }) => <Header navigation={navigation} />,
    }}
  />
</Drawer.Navigator>

  );
}
