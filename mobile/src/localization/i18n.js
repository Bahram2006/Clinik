// src/localization/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Akylly path (şol bir papkadaky locales):
import en from './locales/en/translation.json';
import tk from './locales/tk/translation.json';
import ru from './locales/ru/translation.json';

const LANGUAGE_KEY = 'user_language';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        return callback(savedLanguage);
      }
    } catch (error) {
      console.log('Error reading language from storage', error);
    }
    callback('tk'); // Başlangyç dil
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.log('Error saving language to storage', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      tk: { translation: tk },
      ru: { translation: ru },
    },
    fallbackLng: 'tk',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;