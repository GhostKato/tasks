import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MarkedTasks from '../../screen/MarkedTasks';
import TodayTasks from '../../screen/TodayTasks';
import AllTasks from '../../screen/AllTasks';
import AddTask from '../../screen/AddTask';
import UpdateTask from '../../screen/UpdateTask';
import FilterSettings from '../../screen/FilterSettings';
import { TaskTabBarStackType } from '../types';
import CustomTabBar from './CustomTabBar';
import { ScreenNames } from '../../constants/screenNames';
import ScreenHeader from '../../components/ScreenHeader';

const Tab = createBottomTabNavigator<TaskTabBarStackType>();

function renderCustomTabBar(props: any) {
  return <CustomTabBar {...props} />;
}

export default function TaskTabBarStack() {  
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.TODAY_TASKS_PAGE}
      screenOptions={{ headerShown: false }}
      tabBar={renderCustomTabBar}
    >
      {/* Видимі кнопки */}
      <Tab.Screen name={ScreenNames.TODAY_TASKS_PAGE} component={TodayTasks} />
      <Tab.Screen name={ScreenNames.ALL_TASKS_PAGE} component={AllTasks} />
      <Tab.Screen name={ScreenNames.MARKED_TASKS_PAGE} component={MarkedTasks} />

      {/* Приховані кнопки */}
      <Tab.Screen
        name={ScreenNames.ADD_TASK_PAGE}
        component={AddTask}
        options={{
          tabBarButton: () => null,
          headerShown: true,
          header: () => <ScreenHeader backPath="ALL_TASKS_PAGE"/>
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
          headerShown: true,
          header: () => <ScreenHeader backPath="ALL_TASKS_PAGE"/>
         }}
      />
    </Tab.Navigator>
  );
}
