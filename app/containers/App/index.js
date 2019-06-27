/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import ToothpicTheme from '@toothpic/utils/es/theme'
import PrivateRoute from 'components/PrivateRoute'
import Auth from 'containers/Auth'
// import makeSelectAuth from 'containers/Auth/selectors'
// import Ballot from 'containers/Ballot'
import Entry from 'containers/Entry'
import Leaderboard from 'containers/Leaderboard'
import Logout from 'containers/Logout'
import Vote from 'containers/Vote'

import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
// import { connect } from 'react-redux'
// import { createStructuredSelector } from 'reselect'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Footer from 'components/Footer'
import { isAuthenticated } from 'utils/localstorage'

import { useInjectSaga } from 'utils/injectSaga'

import GlobalStyle from '../../global-styles'

import authSaga from 'containers/Auth/saga'

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`

export function App () {
  useInjectSaga({ key: 'auth', saga: authSaga })

  return (
    <ToothpicTheme>
      <AppWrapper>
        <Helmet
          titleTemplate='Toothpic Voting'
          defaultTitle='Toothpic Voting'
        >
          <meta name='description' content='Toothpic Voting' />
        </Helmet>
        <Switch>
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/login' component={Auth} />
          <Route exact path='/signup' component={Auth} />
          <Route exact path='/account' component={Auth} />
          <PrivateRoute exact path='/leaderboard' component={Leaderboard} isAuthenticated={isAuthenticated()} />
          {/* <PrivateRoute exact path='/ballot/:ballotId' component={Ballot} isAuthenticated={isAuthenticated()} /> */}
          <PrivateRoute exact path='/vote/:id' component={Vote} isAuthenticated={isAuthenticated()} />
          <PrivateRoute exact path='/entry/:id' component={Entry} isAuthenticated={isAuthenticated()} />
          <PrivateRoute exact path='/entry/:id/votes' component={Vote} isAuthenticated={isAuthenticated()} />
          <PrivateRoute exact path='/entry' component={Entry} isAuthenticated={isAuthenticated()} />
          <Route exact path='/' component={Auth} />
          <Route path='' component={NotFoundPage} />
        </Switch>
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    </ToothpicTheme>
  )
}
export default App
