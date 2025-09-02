import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Theme from '../../screen/Theme';
import Language from '../../screen/Language';
import About from '../../screen/About';
import { SettingsTabBarStackType } from '../types';
import { useTheme } from '../../context/ThemeContext';
import CustomTabBar from './CustomTabBar';
import { ScreenNames } from '../../constants/screenNames';

const Tab = createBottomTabNavigator<SettingsTabBarStackType>();

export default function SettingsTabBarStack() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.THEME_PAGE}
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} theme={theme} />}
    >
      <Tab.Screen name={ScreenNames.THEME_PAGE} component={Theme} />
      <Tab.Screen name={ScreenNames.LANGUAGE_PAGE} component={Language} />
      <Tab.Screen name={ScreenNames.ABOUT_PAGE} component={About} />
    </Tab.Navigator>
  );
}
