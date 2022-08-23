import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import TopBar from 'components/TopBar'
import {useTitle} from 'lib/useTitle'
import Organisation from 'models/organisation'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import backgroungDir from '../config'

import WebsiteIcon from '../assets/icons/interaction/website.svg'
type OrganisationPageProps = {
  id: string
  backLink?: string
}

const OrganisationPage: FC<OrganisationPageProps> = (props) => {
  const {id} = props
  const {i18n} = useTranslation()
  const language = i18n.resolvedLanguage
  const orgSelect = useAppSelector((state) => state.organisation)
  const organisationFind = orgSelect.organisations.find(
    (o: Organisation) => o.id === id
  )
  const backgroundImg = `${backgroungDir.backgroundDir}${organisationFind?.background}`
  const logo = `${backgroungDir.logoImagesDir}${organisationFind?.logo}`

  const BackgroundImgStyle = {
    height: '300px',
    backgroundPosition: 'bottom',
    marginTop: '-45px',
    backgroundSize: 'cover',
    color: 'white',
    backgroundImage: `linear-gradient( rgba(49, 49, 49, 0.5), rgba(24, 24, 24, 0.612)), url("${backgroundImg}")`,
  }
  function stripHtml(html: string) {
    let tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }
  //const org = organisationFind?.localised(language)

  useTitle(organisationFind?.title)

  if (!organisationFind) return null

  return (
    <div className="page orgPage">
      <TopBar transparent />
      <div style={BackgroundImgStyle} />
      <div className="header-details">
        <h1 className="h1-background">
          {organisationFind?.id.split('_').join(' ')}
        </h1>
        <a href={organisationFind?.website} className="websiteIcon">
          <div className="icon">
            <WebsiteIcon />
          </div>
          <span className="websiteLink">
            {organisationFind?.website.replace(/https?:\/\//i, '')}
          </span>
        </a>
      </div>
      <div className="org-section">
        <div className="org-section-header">
          <h1 className="org-section-header-h1">
            {organisationFind?.en.headline}
          </h1>
          <img
            className="org-section-logo"
            src={logo}
            alt={organisationFind?.title}
          />
        </div>
        <div>
          <p className="org-section-content">
            {organisationFind?.en.body.replace(/<[^>]*>?/gm, '')}
          </p>
        </div>
        <div className="org-section-button">
          <a
            className="org-button"
            href={`https://donate.raisenow.io/${organisationFind?.shortId.production}`}
          >
            Donate Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default OrganisationPage
