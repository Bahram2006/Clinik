// src/navigation/AppNavigator.js

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import MyAppointmentsScreen from '../screens/MyAppointmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import { AppContext } from '../context/AppContext';
import { COLORS } from '../utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Aşakdaky Esasy Menýu (Bottom Tab)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: { paddingBottom: 6, height: 60, backgroundColor: COLORS.white },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = 'home-outline';
          else if (route.name === 'DoctorsTab') iconName = 'medkit-outline';
          else if (route.name === 'MyAppointmentsTab') iconName = 'calendar-outline';
          else if (route.name === 'ProfileTab') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Baş Sahypa' }} />
      <Tab.Screen name="DoctorsTab" component={DoctorsScreen} options={{ tabBarLabel: 'Lukmanlar' }} />
      <Tab.Screen name="MyAppointmentsTab" component={MyAppointmentsScreen} options={{ tabBarLabel: 'Bronlarym' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profilim' }} />
    </Tab.Navigator>
  );
}

// Ähli Sahypalary Birleşdirýän Esasy Stack Navigasiýa
export default function AppNavigator() {
  const { token } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}