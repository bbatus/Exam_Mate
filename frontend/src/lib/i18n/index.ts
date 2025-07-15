import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import trTranslation from './locales/tr.json';

i18n
  // Dil algılama özelliği
  .use(LanguageDetector)
  // React ile entegrasyon
  .use(initReactI18next)
  // i18next başlatma
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      tr: {
        translation: trTranslation
      }
    },
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React zaten XSS'e karşı güvenlidir
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n; 