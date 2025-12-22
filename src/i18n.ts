import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import zhcnJSON from "./locale/zh-CN.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enJSON },
        "zh-CN": { translation: zhcnJSON }
    },
    lng: "en", // Initial Language
    fallbackLng: "en",
    interpolation: {
        escapeValue: false // React already escapes values
    }
});

export default i18n;