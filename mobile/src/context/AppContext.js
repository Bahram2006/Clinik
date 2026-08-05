// src/context/AppContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '../utils/constants';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currencySymbol = '$';
  const backendUrl = BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(false);

  // Lukmanlaryň sanawyny backend-den çekmek
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.log('Doctors Error:', error.message);
    }
  };

  // Ulanyjy profil maglumatlaryny çekmek
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      console.log('Profile Error:', error.message);
    }
  };

  // App açylanda AsyncStorage-den tokeni okamak
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (e) {
        console.log('Token okanmakda ýalňyşlyk:', e);
      }
    };
    loadToken();
    getDoctorsData();
  }, []);

  // Token üýtgedende profil maglumatlaryny täzelemek ýa-da arassalamak
  useEffect(() => {
    if (token) {
      loadUserProfileData();
      AsyncStorage.setItem('token', token);
    } else {
      setUserData(false);
      AsyncStorage.removeItem('token');
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;