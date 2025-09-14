import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenNames } from '../../constants/screenNames';
import TaskTabBarStack from '../TabBarStack/TaskTabBarStack';
import SettingsTabBarStack from '../TabBarStack/SettingsTabBarStack';
import { DrawerStackType } from '../types';
import Header from '../../components/Header';
import { Dimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator<DrawerStackType>();

export default function DrawerStack() {

  const { color } = useTheme();

  return (
    <Drawer.Navigator
  initialRouteName={ScreenNames.TASK_TAB_BAR_STACK}
  drawerContent={(props) => <DrawerContent {...props} />}
  screenOptions={{
    drawerPosition: 'right',
    drawerStyle: {
      width: Dimensions.get('window').width,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: color.primary, 
    },    
  }}
>
  <Drawer.Screen
    name={ScreenNames.TASK_TAB_BAR_STACK}
    component={TaskTabBarStack}
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
