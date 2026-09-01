import { useLanguage } from "@/components/LanguageProvider";
import { dictionaries } from "./dictionaries";

export function useTranslation() {
  const { language } = useLanguage();
  return {
    t: dictionaries[language],
    lang: language
  };
}
