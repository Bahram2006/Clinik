import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ MÖHÜM: Emulýator ulanýanyňyz üçin IP adresi 10.0.2.2 ýa-da öz Wi-Fi IP-ňiz bolmaly!
// Node.js backend-iňiz 4000 portda işleýän bolsa:
const API_URL = 'http://10.0.2.2:4000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Soragnama gitmänkä Token-i awtomatiki goşmak üçin Interceptor
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.token = token; // Backend-de token diýip garaşylýar
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;