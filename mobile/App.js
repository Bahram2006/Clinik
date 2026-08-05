// App.js

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import AppContextProvider from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import './src/localization/i18n'; // i18n ýüklemek üçin

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <AppNavigator />
        <Toast />
      </AppContextProvider>
    </SafeAreaProvider>
  );
}