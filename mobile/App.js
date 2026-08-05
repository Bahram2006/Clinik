// App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AppContextProvider } from './src/context/AppContext';
import './src/localization/i18n';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </AppContextProvider>
    </SafeAreaProvider>
  );
}