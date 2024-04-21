import { useContext } from "react"
import { LanguageContext } from "contexts/LanguageContext";

const useLanguage = () => {
  const language = useContext(LanguageContext);
  return language;
}

export default useLanguage;