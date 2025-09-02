import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorite from '../../screen/Favorite';
import Home from '../../screen/Home';
import Tasks from '../../screen/Tasks';
import { MainTabBarStackType } from '../types';
import CustomTabBar from './CustomTabBar';
import { ScreenNames } from '../../constants/screenNames';

const Tab = createBottomTabNavigator<MainTabBarStackType>();

function renderCustomTabBar(props: any) {
  return <CustomTabBar {...props} />;
}

export default function MainTabBarStack() {  

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={{ headerShown: false }}
      tabBar={ renderCustomTabBar}
    >
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.TASKS_PAGE} component={Tasks} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
