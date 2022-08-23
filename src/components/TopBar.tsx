import React, {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {Link, useHistory} from 'react-router-dom'
import BackIcon from 'assets/icons/interaction/back.svg'
import InfoIcon from 'assets/icons/interaction/info.svg'

type TopBarProps = {
  transparent?: boolean
  hideBackLink?: boolean
  hideFaqLink?: boolean
}

const TopBar: FC<TopBarProps> = (props) => {
  const {t} = useTranslation()
  const history = useHistory()

  return (
    <div className={`top-bar w-full ${props.transparent ? 'transparent' : ''}`}>
      <div>
        {(!props.hideBackLink && (
          <button
            onClick={() => history.goBack()}
            className="back-link text-sm p-2"
          >
            <div className="icon">
              <BackIcon />
            </div>
            <span className="text">{t('app.back_link')}</span>
          </button>
        )) || <div />}
        {!props.hideFaqLink && (
          <Link
            to={{
              pathname: '/faq',
            }}
            className="p-2"
          >
            <div className="icon">
              <InfoIcon />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default TopBar
