import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Theme from '../../screen/Theme';
import Language from '../../screen/Language';
import About from '../../screen/About';
import { SettingsTabBarStackType } from '../types';
import CustomTabBar from './CustomTabBar';
import { ScreenNames } from '../../constants/screenNames';

const Tab = createBottomTabNavigator<SettingsTabBarStackType>();

function renderCustomTabBar(props: any) {
  return <CustomTabBar {...props} />;
}

export default function SettingsTabBarStack() {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.THEME_PAGE}
      screenOptions={{ headerShown: false }}
      tabBar={renderCustomTabBar}
    >
      <Tab.Screen name={ScreenNames.THEME_PAGE} component={Theme} />
      <Tab.Screen name={ScreenNames.LANGUAGE_PAGE} component={Language} />
      <Tab.Screen name={ScreenNames.ABOUT_PAGE} component={About} />
    </Tab.Navigator>
  );
}
