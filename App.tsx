import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, AppDispatch, RootState } from './src/redux/store';
import { getAuth, FirebaseAuthTypes, onAuthStateChanged } from '@react-native-firebase/auth';
import { setUser } from './src/redux/auth/slice';
import { serializeUser } from './src/utils/serializeUser';
import { fetchTasks } from './src/redux/tasks/operations';
import { loadWidget } from './src/redux/widgets/slice';
import { loadTheme } from './src/redux/theme/slice';
import { loadLanguage } from './src/redux/language/slice';
import { selectMarkedTasks } from './src/redux/tasks/selectors';
// import { addTasksToBase } from './src/utils/tasksSeeder';

function AppWrapper() {
  const dispatch = useDispatch<AppDispatch>();
  const markedTasks = useSelector((state: RootState) => selectMarkedTasks(state));

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseAuthTypes.User | null) => {
      const serialized = serializeUser(user);
      dispatch(setUser(serialized));
    });

    dispatch(fetchTasks());
    dispatch(loadWidget());
    dispatch(loadTheme());
    dispatch(loadLanguage());   
    console.log('Marked tasks:', markedTasks);
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
