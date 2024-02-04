import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const setupLanguage = (dictionary) => {
  i18n
    .use(initReactI18next)
    .init({
      resources: dictionary,
      lng: "en",
      fallbackLng: "en",
    });
};

export default setupLanguage;