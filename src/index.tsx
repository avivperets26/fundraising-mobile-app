import React, {useEffect, lazy, Suspense} from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from 'app/store'
import Organisation from 'models/organisation'
import {loadTranslations} from 'lib/i18n'
import {fetchOrganisations} from 'features/organisationSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'

loadTranslations()

const App = () => {
  const organisation = useAppSelector((state) => state.organisation)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrganisations())
    organisation.organisations.map(
      (o, i) => new Organisation(o as unknown as Organisation, i.toString())
    )
  }, [])

  const FaqPage = lazy(() => import('pages/FAQ'))
  const OrganisationPage = lazy(() => import('pages/Organisation'))
  const OverviewPage = lazy(() => import('pages/Overview'))

  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/faq" component={FaqPage} />
        <Route
          path={`/org/:id`}
          render={({match}) => {
            return <OrganisationPage id={match.params.id} />
          }}
        />
        <Route path="/" component={OverviewPage} />
      </Switch>
    </Suspense>
  )
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('container')
)
