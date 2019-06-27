/**
 *
 * Auth
 *
 */

import SignupView from 'containers/Auth/SignupView'
import SignupView2 from 'containers/Auth/SignupView2'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
import { isAuthenticated } from 'utils/localstorage'

import {
  clearSession,
  userLoginRequest,
  userSignupRequest,
  userUpdateUserRequest
} from './actions'

import AuthView from './AuthView'
import reducer from './reducer'

export class Auth extends React.Component {
  constructor (props) {
    super(props)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.enterEmail = this.enterEmail.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = { email: '', password: '', dietary_requirements: [], nickname: '' }
  }

  componentWillMount () {
    const { location } = this.props
    // clearSession1()
    this.setState(location.state)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  isLoggedIn () {
    console.log(isAuthenticated())
    return !!isAuthenticated()
  }

  enterEmail () {
    this.setState({ showAccount: true })
  }

  needsDetails () {
    const { user: { name } } = this.props
    return !!name
  }

  render () {
    const {
      error,
      userLoginRequest,
      signupRequest,
      user: { loading, ...user },
      location,
      authenticationComplete
    } = this.props

    const { email, password, dietary_requirements, nickname, showAccount } = this.state

    if (showAccount && location.pathname !== '/account') {
      return <Redirect to='/account' />
    }

    if (this.isLoggedIn()) {
      console.log('in', authenticationComplete)
      return (
        <Redirect
          to={{
            pathname: authenticationComplete ? '/leaderboard' : '/account',
            state: this.state
          }}
        />
      )
    }

    switch (location.pathname) {
      case '/login': return (
        <AuthView
          password={password}
          email={email}
          loading={loading}
          error={error}
          onChange={this.onChange}
          userLogin={userLoginRequest}
        />
      )
      case '/signup': return (
        <SignupView
          password={password}
          email={email}
          loading={loading}
          error={error}
          onChange={this.onChange}
          signupUser={this.enterEmail}
          user={user}
        />
      )
      case '/account': return (
        <SignupView2
          password={password}
          email={email}
          dietary_requirements={dietary_requirements}
          nickname={nickname}
          loading={loading}
          error={error}
          onChange={this.onChange}
          createUser={signupRequest}
          user={user}
        />
      )
      default: return <Redirect to='/login' />
    }
  }
}

Auth.propTypes = {
  clearSession: PropTypes.func,
  userLoginRequest: PropTypes.func,
  location: PropTypes.object,
  password: PropTypes.string,
  email: PropTypes.string,
  error: PropTypes.object,
  loading: PropTypes.bool
}

const mapStateToProps = state => {
  console.log(state)
  return { user: state.auth, authenticationComplete: state.auth.authenticationComplete, error:state.auth.error }
}

const mapDispatchToProps = dispatch => ({
  userLoginRequest: (data) => {
    dispatch(userLoginRequest(data))
  },
  signupRequest: (data) => {
    dispatch(userSignupRequest(data))
  },
  updateUser: (data) => {
    dispatch(userUpdateUserRequest(data))
  },
  clearSession: () => {
    dispatch(clearSession())
  }
})

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const withReducer = injectReducer({
  key: 'auth',
  reducer
})

export default compose(
  withReducer,
  withConnect
)(Auth)
