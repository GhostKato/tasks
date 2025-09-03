import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fonts } from '../../constants/fonts';
import { HeartIcon, HomeIcon, TasksIcon,ThemeIcon, LanguageIcon, AboutIcon } from '../../assets/icons';
import { ScreenNames } from '../../constants/screenNames';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {

  const { color } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ flexDirection: 'row', height: 60, backgroundColor: color.tertiary, alignItems: 'center', justifyContent: 'space-around' }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => navigation.navigate(route.name);

        let icon = null;
        let label: string = '';
        switch (route.name) {
          case ScreenNames.HOME_PAGE:
            icon = <HomeIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary}/>;
            label = t.mainTabBar.home;
                break;
            case ScreenNames.TASKS_PAGE:
            icon = <TasksIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary}/>;
            label = t.mainTabBar.tasks;
            break;
          case ScreenNames.FAVORITE_PAGE:
            icon = <HeartIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary}/>;
            label = t.mainTabBar.favorite;
            break;
          case ScreenNames.THEME_PAGE:
            icon = <ThemeIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary}/>;
            label = t.settingsTabBar.theme;
                break;
            case ScreenNames.LANGUAGE_PAGE:
            icon = <LanguageIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary}/>;
            label = t.settingsTabBar.language;
            break;
          case ScreenNames.ABOUT_PAGE:
            icon = <AboutIcon isFocused={focused} inactiveColor={color.octonary} activeColor={color.quinary}/>;
            label = t.settingsTabBar.about;
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
