import { Language } from 'lib/i18n'

export default class Organisation {
  id: string
  title?: string
  logo?: string
  website: string
  en?: TranslatedInfo
  de?: TranslatedInfo
  fr?: TranslatedInfo
  it?: TranslatedInfo
  background: string
  headline: string
  production: string
  shortId: any


  constructor(o: Organisation, id?: string) {
    Object.assign(this, o)
    this.id = o.id || id
  }

  localised = (language: string) => ({ ...this, ...this[language as Language] })
}

export type TranslatedInfo = {
  headline: string
  body: string
}
