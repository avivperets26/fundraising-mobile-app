import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import config from 'config'
import {useTitle} from 'lib/useTitle'
import TopBar from 'components/TopBar'
import {useAppSelector} from 'app/hooks'
import Organisation from 'models/organisation'

const Overview: FC = () => {
  const {t, i18n} = useTranslation()
  const language = i18n.resolvedLanguage
  const organisation = useAppSelector((state) => state.organisation)
  useTitle(t(`overview.title`))

  const c: Organisation = null
  if (!organisation) return null

  return (
    <div className="page topic">
      <TopBar hideBackLink={true} />

      <div className="card-container">
        {organisation.organisations?.map((o) => {
          //const org = o.localised(language)
          return (
            <Link key={o.id} to={'/org/' + o.id} className="card">
              {
                <img
                  className="card__logo w-full h-full object-contain"
                  src={config.logoImagesDir + o.logo}
                  alt={o.title}
                />
              }
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Overview
