import React, {FC, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useTitle} from 'lib/useTitle'
import TopBar from 'components/TopBar'
import {Language} from 'lib/i18n'
import faqTexts from '_data/faq.json'

const FaqPage: FC = () => {
  const {t, i18n} = useTranslation()
  const language = i18n.resolvedLanguage as Language

  useTitle(t('faq.headline'))

  const faq = faqTexts[language]

  // Accordion controls
  const initialOpenState = {
    element: null as HTMLElement,
    index: null as number,
  }
  const [currentlyOpen, setCurrentlyOpen] = useState(initialOpenState)
  const toggle = (element: HTMLElement, index: number) => {
    if (currentlyOpen.element) setContentHeight(currentlyOpen.element, 0)
    if (index === currentlyOpen.index) {
      setCurrentlyOpen(initialOpenState)
      return
    }
    setCurrentlyOpen({element, index})
    setContentHeight(element)
    setImmediate(() =>
      element.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    )
  }

  return (
    <div className="faq page">
      <TopBar hideFaqLink />

      <div className="wrapper">
        <h1 className="headline no-kerning">{t('faq.headline')}</h1>
        <p className="intro">{t('faq.intro')}</p>
      </div>

      <div>
        {faq.map((faq, index) => {
          const isOpen = index === currentlyOpen.index
          return (
            <div
              key={index}
              className={`collapsible ${isOpen ? openClass : ''}`}
            >
              <button
                id={`${controlClass}-${index}`}
                className={`${controlClass}`}
                onClick={(event) =>
                  toggle(event.currentTarget.parentElement, index)
                }
                aria-expanded={isOpen}
                aria-controls={`${contentClass}-${index}`}
              >
                <h2>{faq.question}</h2>
              </button>
              <div
                id={`${contentClass}-${index}`}
                className={`${contentClass}`}
                aria-labelledby={`${controlClass}-${index}`}
                aria-hidden={!isOpen}
                style={{height: 0}}
              >
                <p
                  className="my-2"
                  dangerouslySetInnerHTML={{__html: faq.answer}}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="wrapper">
        <h1 className="headline">{t('impressum.headline')}</h1>
        <div className="contentHTML">
          <div dangerouslySetInnerHTML={{__html: t('impressum.html')}} />
        </div>
      </div>
    </div>
  )
}

export default FaqPage

const controlClass = 'collapsible-controls'
const contentClass = 'collapsible-content'
const openClass = 'open'

const setContentHeight = (collapsible: HTMLElement, pixels?: number) => {
  for (const element of collapsible.getElementsByClassName(contentClass))
    (element as HTMLElement).style.height =
      (pixels !== undefined ? pixels : element.scrollHeight) + 'px'
}
