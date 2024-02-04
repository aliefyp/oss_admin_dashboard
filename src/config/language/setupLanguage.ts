import i18n from "i18next";
import dayjs from "dayjs";
import { initReactI18next } from "react-i18next";

const setupLanguage = (dictionary) => {
  i18n
    .use(initReactI18next)
    .init({
      resources: dictionary,
      lng: "en",
      fallbackLng: "en",
    });

  dayjs.locale(i18n.language);
};

export default setupLanguage;