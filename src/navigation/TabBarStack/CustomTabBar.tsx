import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fonts } from '../../constants/fonts';
import { HeartIcon, HomeIcon, TasksIcon,ThemeIcon, LanguageIcon, AboutIcon } from '../../assets/icons';
import { ScreenNames } from '../../constants/screenNames';

export default function CustomTabBar({ state, navigation, theme }: BottomTabBarProps & { theme: any }) {
  return (
    <View style={{ flexDirection: 'row', height: 60, backgroundColor: theme.secondary, alignItems: 'center', justifyContent: 'space-around' }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => navigation.navigate(route.name);

        let icon = null;
        let label = '';
        switch (route.name) {
          case ScreenNames.HOME_PAGE:
            icon = <HomeIcon isFocused={focused} inactiveColor={theme.septenary} activeColor={theme.quaternary}/>;
            label = 'Home';
                break;
            case ScreenNames.TASKS_PAGE:
            icon = <TasksIcon isFocused={focused} inactiveColor={theme.septenary} activeColor={theme.quaternary}/>;
            label = 'Tasks';
            break;
          case ScreenNames.FAVORITE_PAGE:
            icon = <HeartIcon isFocused={focused} inactiveColor={theme.septenary} activeColor={theme.quaternary}/>;
            label = 'Favourite';
            break;
          case ScreenNames.THEME_PAGE:
            icon = <ThemeIcon isFocused={focused} inactiveColor={theme.septenary} activeColor={theme.quaternary}/>;
            label = 'Theme';
                break;
            case ScreenNames.LANGUAGE_PAGE:
            icon = <LanguageIcon isFocused={focused} inactiveColor={theme.septenary} activeColor={theme.quaternary}/>;
            label = 'Language';
            break;
          case ScreenNames.ABOUT_PAGE:
            icon = <AboutIcon isFocused={focused} inactiveColor={theme.septenary} activeColor={theme.quaternary}/>;
            label = 'About';
            break;
        }

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              {icon}
              <Text style={{ fontFamily: fonts.MontserratRegular, color: focused ? theme.quaternary : theme.septenary, fontSize: 12 }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
