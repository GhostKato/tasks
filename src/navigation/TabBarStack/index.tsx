import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Favorite from '../../screen/Favorite';
import {ScreenNames} from '../../constants/screenNames';
import Home from '../../screen/Home';
import {TabBarStackType} from '../types';
import getTabOptions from './options';
import { useTheme } from '../../context/ThemeContext';

const Tab = createBottomTabNavigator<TabBarStackType>();
export default function TabBarStack() {

  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({route}) => getTabOptions(route, theme)}>
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}