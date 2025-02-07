import i18n from "i18next";
import en from "../public/locales/ar.json";
import ar from "../public/locales/en.json";

i18n.init({
  lng: "ar",
  fallbackLng: "ar",
  resources: {
    ar: {
        translation: en,
    },
    en: {
        translation: ar,
    },
  },
});

export default i18n;
