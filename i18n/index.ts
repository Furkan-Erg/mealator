import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import en from "./en.json";
import tr from "./tr.json";

i18n.use(initReactI18next).init({
  lng: Localization.locale.startsWith("tr") ? "tr" : "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
