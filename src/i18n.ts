import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector, {CustomDetector} from "i18next-browser-languagedetector";

const alkwpDetector: CustomDetector = {
    name: 'alkwpDetector',
    lookup() {
        return window?.alkwp?.lang;
    }
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}.json`
        },
        fallbackLng: "en",
        supportedLngs: ["en", "it"],
        detection: {
            order: ['alkwpDetector', 'querystring', 'navigator', 'htmlTag'],
            lookupQuerystring: 'lang'
        },
        react: {
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        }
    });

i18n.services.languageDetector.addDetector(alkwpDetector);

export default i18n;
