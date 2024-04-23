import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// import en from './en/translation.json';
import { convertLanguageJsonToObject } from './translations';
import ko from './ko/translation.json';

export const translationsJson = {
  // en: {
  //   translation: en,
  // },
  ko: {
    translation: ko,
  },
};

convertLanguageJsonToObject(ko);

export const i18n = i18next.use(initReactI18next).init({
  resources: translationsJson,
  fallbackLng: 'ko',
  debug:
    process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
  interpolation: {
    escapeValue: false,
  },
});
