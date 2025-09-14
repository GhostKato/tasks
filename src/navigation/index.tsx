import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenNames } from '../constants/screenNames';
import { RootStackNavigation } from './types';
import LoggedInStack from './LogedInStack';
import LoggedOutStack from './LoggedOutStack';
import { View, ActivityIndicator } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { selectUser, selectLoading } from '../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { selectThemeColors } from '../redux/settings/selectors';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootNavigation() {
  const color = useSelector(selectThemeColors);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLoading);  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: color.primary,
        },
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name={ScreenNames.LOGGED_IN_STACK} component={LoggedInStack} />
        ) : (
          <Stack.Screen name={ScreenNames.LOGGED_OUT_STACK} component={LoggedOutStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
