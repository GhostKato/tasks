import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenNames } from '../constants/screenNames';
import { RootStackNavigation } from './types';
import LoggedInStack from './LogedInStack';
import LoggedOutStack from './LoggedOutStack';
import { useTheme } from '../context/ThemeContext';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootNavigation() {
  const { color } = useTheme();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return subscriber;
  }, []);

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
          <Stack.Screen
            name={ScreenNames.LOGGED_IN_STACK}
            component={LoggedInStack}
          />
        ) : (
          <Stack.Screen
            name={ScreenNames.LOGGED_OUT_STACK}
            component={LoggedOutStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
