import {useEffect} from 'react'
import {useTranslation} from 'react-i18next'

export const useTitle = (title?: string) => {
  const {t} = useTranslation()
  useEffect(() => {
    document.title = (title ? title + ' • ' : '') + t('app.title')
  }, [title])
}
