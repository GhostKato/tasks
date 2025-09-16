import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { Provider, useDispatch } from 'react-redux';
import { store, AppDispatch } from './src/redux/store';
import { getAuth, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { setUser } from './src/redux/auth/slice';
import { serializeUser } from './src/utils/serializeUser';
import { fetchTasks } from './src/redux/tasks/operations';
import { loadWidget } from './src/redux/widgets/slice';
import { loadTheme } from './src/redux/theme/slice';
import { loadLanguage } from './src/redux/language/slice';
// import { addTasksToBase } from './src/utils/tasksSeeder';
 
function AppWrapper() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      const serialized = serializeUser(user);
      dispatch(setUser(serialized));      
    });    
    dispatch(fetchTasks());
    dispatch(loadWidget());
    dispatch(loadTheme());
    dispatch(loadLanguage());
    // addTasksToBase();

    return unsubscribe;
  }, [dispatch]);

  return <RootNavigation />;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>                  
            <AppWrapper />         
      </SafeAreaView>
    </Provider>
  );
}
