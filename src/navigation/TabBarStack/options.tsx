import { Text, View } from 'react-native';
import { HeartIcon, PawIcon } from '../../assets/icons';
import { ScreenNames } from '../../constants/screenNames';
import { fonts } from '../../constants/fonts';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { TabBarStackType } from '../types'

export default function getTabOptions(
  route: RouteProp<TabBarStackType, keyof TabBarStackType>,
  theme: { accentPrimary: string; textSecondary: string; textTertiary: string; backgroundSecondary: string;  }
): BottomTabNavigationOptions {
  const getName = (name: string) => {
    switch (name) {
      case ScreenNames.FAVORITE_PAGE:
        return 'Favourite';
      case ScreenNames.HOME_PAGE:
        return 'Tasks';
      default:
        return '';
    }
  };

  const getIcon = (name: string, focused: boolean) => {
    switch (name) {
      case ScreenNames.FAVORITE_PAGE:
        return <HeartIcon isFocused={focused} color={theme.accentPrimary} />;
      case ScreenNames.HOME_PAGE:
        return <PawIcon isFocused={focused} color={theme.accentPrimary} />;
      default:
        return null;
    }
  };

  return {
    tabBarStyle: {
      height: 52,
      width: '100%',
      backgroundColor: theme.backgroundSecondary,
    },
    tabBarShowLabel: false,
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 5, width: 70 }}>
        {getIcon(route.name, focused)}
        <Text
          style={{
            fontFamily: fonts.MontserratRegular,
            color: focused ? theme.textTertiary : theme.textSecondary,
          }}
        >
          {getName(route.name)}
        </Text>
      </View>
    ),
  };
}
