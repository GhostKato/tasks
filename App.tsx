import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { setUser } from './src/redux/auth/slice';

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return <RootNavigation />;
}

function App(): React.JSX.Element {
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

export default App;
