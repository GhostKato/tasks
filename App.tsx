import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { setUser } from './src/redux/auth/slice';
import { serializeUser } from './src/utils/serializeUser';

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      const serialized = serializeUser(user);      
      dispatch(setUser(serialized));
    });

    return unsubscribe;
  }, [dispatch]);

  return <RootNavigation />;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <LanguageProvider>
          <ThemeProvider>
            <AppWrapper />
          </ThemeProvider>
        </LanguageProvider>
      </SafeAreaView>
    </Provider>
  );
}
