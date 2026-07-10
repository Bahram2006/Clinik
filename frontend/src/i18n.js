import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import tk from "./locales/tk/translation.json";
import ru from "./locales/ru/translation.json";

const savedLanguage = localStorage.getItem("language") || "tk";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tk: { translation: tk },
    ru: { translation: ru },
  },
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;