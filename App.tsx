import React, {useEffect} from 'react';
import { DevSettings, NativeModules } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
      });
      DevSettings.addMenuItem('Stop Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(false);
      });
    }
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigation />
    </SafeAreaView>
  );
}

export default App;
