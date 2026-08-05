// src/localization/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en/translation.json';
import tk from './locales/tk/translation.json';
import ru from './locales/ru/translation.json';

const LANGUAGE_KEY = 'user_language';

// Dili üýtgetmek we ýatda saklamak üçin helper
export const changeLanguage = async (lng) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    await i18n.changeLanguage(lng);
  } catch (e) {
    console.error("Dil üýtgetmekde ýalňyşlyk:", e);
  }
};

const initI18n = async () => {
  let savedLanguage = 'tk';
  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (storedLang) {
      savedLanguage = storedLang;
    }
  } catch (e) {
    console.error("Saklanan dili okamakda ýalňyşlyk:", e);
  }

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      tk: { translation: tk },
      ru: { translation: ru },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
};

initI18n();

export default i18n;