import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { dictionary } from './dictionary'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        translation: dictionary.vi
      },
      en: {
        translation: dictionary.en
      }
    },
    fallbackLng: 'vi',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'vite-ui-language',
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false // react already safeguards from XSS
    }
  })

export default i18n
