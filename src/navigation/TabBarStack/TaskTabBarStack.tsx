import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MarkedTasks from '../../screen/MarkedTasks';
import DetailsTask from '../../screen/DetailsTask';
import Home from '../../screen/Home';
import AllTasks from '../../screen/AllTasks';
import AddTask from '../../screen/AddTask';
import UpdateTask from '../../screen/UpdateTask';
import FilterSettings from '../../screen/FilterSettings';
import { TaskTabBarStackType } from '../types';
import CustomTabBar from './CustomTabBar';
import { ScreenNames } from '../../constants/screenNames';

const Tab = createBottomTabNavigator<TaskTabBarStackType>();

function renderCustomTabBar(props: any) {
  return <CustomTabBar {...props} />;
}

export default function TaskTabBarStack() {  
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={{ headerShown: false }}
      tabBar={renderCustomTabBar}
    >
      {/* Visible buttons */}
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.ALL_TASKS_PAGE} component={AllTasks} />
      <Tab.Screen name={ScreenNames.MARKED_TASKS_PAGE} component={MarkedTasks} />

      {/* Hidden buttons */}
      <Tab.Screen
        name={ScreenNames.DETAILS_TASK_PAGE}
        component={DetailsTask}
        options={{
          tabBarButton: () => null,
          headerShown: false,
          
        }}
      />
      <Tab.Screen
        name={ScreenNames.ADD_TASK_PAGE}
        component={AddTask}
        options={{
          tabBarButton: () => null,
          headerShown: false,          
        }}
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
          headerShown: false,
          
         }}
      />
    </Tab.Navigator>
  );
}
