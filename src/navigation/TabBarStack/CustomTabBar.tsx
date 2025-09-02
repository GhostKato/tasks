import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { fonts } from '../../constants/fonts';
import { HeartIcon, HomeIcon, TasksIcon } from '../../assets/icons';
import { ScreenNames } from '../../constants/screenNames';

export default function CustomTabBar({ state, descriptors, navigation, theme }: BottomTabBarProps & { theme: any }) {
  return (
    <View style={{ flexDirection: 'row', height: 60, backgroundColor: theme.backgroundSecondary, alignItems: 'center', justifyContent: 'space-around' }}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => navigation.navigate(route.name);

        let icon = null;
        let label = '';
        switch (route.name) {
          case ScreenNames.HOME_PAGE:
            icon = <HomeIcon isFocused={focused} color={theme.accentPrimary} />;
            label = 'Home';
                break;
            case ScreenNames.TASKS_PAGE:
            icon = <TasksIcon isFocused={focused} color={theme.accentPrimary} />;
            label = 'Tasks';
            break;
          case ScreenNames.FAVORITE_PAGE:
            icon = <HeartIcon isFocused={focused} color={theme.accentPrimary} />;
            label = 'Favourite';
            break;
        }

        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              {icon}
              <Text style={{ fontFamily: fonts.MontserratRegular, color: focused ? theme.textTertiary : theme.textSecondary, fontSize: 12 }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
