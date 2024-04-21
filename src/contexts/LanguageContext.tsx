import dayjs from "dayjs";
import { createContext, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export type LanguageContextType = {
  language: string;
  handleChangeLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('tm');

  const { i18n } = useTranslation();

  const handleChangeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    dayjs.locale(language);
    setLanguage(language);
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{
      language,
      handleChangeLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageProvider, LanguageContext };

