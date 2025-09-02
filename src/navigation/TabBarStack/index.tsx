import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorite from '../../screen/Favorite';
import Home from '../../screen/Home';
import Tasks from '../../screen/Tasks';
import { TabBarStackType } from '../types';
import { useTheme } from '../../context/ThemeContext';
import CustomTabBar from './CustomTabBar';
import { ScreenNames } from '../../constants/screenNames';

const Tab = createBottomTabNavigator<TabBarStackType>();

export default function TabBarStack() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} theme={theme} />}
    >
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.TASKS_PAGE} component={Tasks} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
