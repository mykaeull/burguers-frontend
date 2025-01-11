import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationsEn from "../locales/translations/en.json";
import translationsPt from "../locales/translations/pt.json";

i18n.use(LanguageDetector) // Detecta a linguagem do navegador/localStorage
    .use(initReactI18next) // Integração com React
    .init({
        resources: {
            en: { translation: translationsEn },
            pt: { translation: translationsPt },
        },
        fallbackLng: "pt", // Língua padrão
        debug: false, // Habilitar para testar, desative em produção
        interpolation: {
            escapeValue: false, // React já faz a sanitização
        },
    });

export default i18n;
