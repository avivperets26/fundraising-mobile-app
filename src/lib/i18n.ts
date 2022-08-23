import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import en from 'translations/en.yml'

export enum Language {
  en = 'en',
  de = 'de',
  fr = 'fr',
  it = 'it',
}

export const loadTranslations = () =>
  i18n
    .use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      detection: {
        caches: [],
      },
      resources: {
        en: {translation: en},
      },
      fallbackLng: 'en',
      supportedLngs: Object.values(Language),
      load: 'languageOnly',
    })
