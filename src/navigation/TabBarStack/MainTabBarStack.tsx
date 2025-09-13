import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorite from '../../screen/Favorite';
import Home from '../../screen/Home';
import Tasks from '../../screen/Tasks';
import AddTask from '../../screen/AddTask';
import UpdateTask from '../../screen/UpdateTask';
import FilterSettings from '../../screen/FilterSettings';
import { MainTabBarStackType } from '../types';
import CustomTabBar from './CustomTabBar';
import { ScreenNames } from '../../constants/screenNames';
import FilterSettingsHeader from '../../screen/FilterSettings/components/FilterSettingsHeader';

const Tab = createBottomTabNavigator<MainTabBarStackType>();

function renderCustomTabBar(props: any) {
  return <CustomTabBar {...props} />;
}

export default function MainTabBarStack() {  
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={{ headerShown: false }}
      tabBar={renderCustomTabBar}
    >
      {/* Видимі кнопки */}
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.TASKS_PAGE} component={Tasks} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />

      {/* Приховані кнопки */}
      <Tab.Screen
        name={ScreenNames.ADD_TASK_PAGE}
        component={AddTask}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name={ScreenNames.UPDATE_TASK_PAGE}
        component={UpdateTask}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name={ScreenNames.FILTERS_SETTINGS_PAGE}
        component={FilterSettings}
        options={{
          tabBarButton: () => null,
          headerShown: true,
          header: () => <FilterSettingsHeader/>
         }}
      />
    </Tab.Navigator>
  );
}
