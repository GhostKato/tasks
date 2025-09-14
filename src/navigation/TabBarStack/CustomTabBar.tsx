import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fonts } from '../../constants/fonts';
import { HeartIcon, HomeIcon, TasksIcon } from '../../assets/icons';
import { ScreenNames } from '../../constants/screenNames';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../../redux/theme/selectors';
import { selectTranslations } from '../../redux/language/selector';

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {

 const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);
  
  const hiddenScreens = [
    ScreenNames.ADD_TASK_PAGE,
    ScreenNames.UPDATE_TASK_PAGE,
    ScreenNames.FILTERS_SETTINGS_PAGE
  ];

  return (
    <View style={{ flexDirection: 'row', height: 60, backgroundColor: color.tertiary, alignItems: 'center', justifyContent: 'space-around' }}>
      {state.routes
        .filter(route => !hiddenScreens.includes(route.name as ScreenNames))
        .map((route, index) => {
          const focused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          let icon = null;
          let label: string = '';
          switch (route.name) {
            case ScreenNames.TODAY_TASKS_PAGE:
              icon = <HomeIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary} />;
              label = t.taskTabBar.todayTasks;
              break;
            case ScreenNames.ALL_TASKS_PAGE:
              icon = <TasksIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary} />;
              label = t.taskTabBar.allTasks;
              break;
            case ScreenNames.MARKED_TASKS_PAGE:
              icon = <HeartIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary} />;
              label = t.taskTabBar.markedTasks;
              break;            
          }

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                {icon}
                <Text style={{ fontFamily: fonts.MontserratRegular, color: focused ? color.quinary : color.octonary, fontSize: 12 }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}
