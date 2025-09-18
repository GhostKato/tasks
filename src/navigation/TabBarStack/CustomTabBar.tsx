import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
    ScreenNames.DETAILS_TASK_PAGE,
    ScreenNames.ADD_TASK_PAGE,
    ScreenNames.UPDATE_TASK_PAGE,
    ScreenNames.FILTERS_SETTINGS_PAGE
  ];

  const styles = StyleSheet.create({
    
    container: {
      flexDirection: 'row',
      height: 60,
      backgroundColor: color.tertiary,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    btn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
      },  
    btnContent: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      },  
  });

  return (
    <View style={styles.container}>
      {state.routes
        .filter(route => !hiddenScreens.includes(route.name as ScreenNames))
        .map((route, index) => {
          const focused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          let icon = null;
          let label: string = '';
          switch (route.name) {
            case ScreenNames.HOME_PAGE:
              icon = <HomeIcon isFocused={focused} inactiveColor={color.senary} activeColor={color.secondary} />;
              label = t.taskTabBar.home;
              break;
            case ScreenNames.ALL_TASKS_PAGE:
              icon = <TasksIcon isFocused={focused} inactiveColor={color.senary} activeColor={color.secondary} />;
              label = t.taskTabBar.allTasks;
              break;
            case ScreenNames.MARKED_TASKS_PAGE:
              icon = <HeartIcon isFocused={focused} inactiveColor={color.senary} activeColor={color.secondary} />;
              label = t.taskTabBar.markedTasks;
              break;            
          }

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.btn}>
              <View style={styles.btnContent}>
                {icon}
                <Text style={{ fontFamily: fonts.MontserratRegular, color: focused ? color.secondary : color.senary, fontSize: 12 }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}
