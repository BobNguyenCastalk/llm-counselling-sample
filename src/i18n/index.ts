import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ja from './locales/ja.json';
import en from './locales/en.json';

// Language controlled by VITE_LANG env variable (default: 'ja')
const lang = import.meta.env.VITE_LANG || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: { ja: { translation: ja }, en: { translation: en } },
    lng: lang,
    fallbackLng: 'ja',
    interpolation: { escapeValue: false }
  });

export default i18n;
