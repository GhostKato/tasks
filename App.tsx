import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';

function App(): React.JSX.Element {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LanguageProvider>
      <ThemeProvider>
        <RootNavigation />
        </ThemeProvider>
        </LanguageProvider>
    </SafeAreaView>
  );
}

export default App;
