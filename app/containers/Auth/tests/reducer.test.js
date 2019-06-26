import authReducer, { initialState } from '../reducer'
import {
  updateField,
  assessorLoginRequest,
  assessorLoginRequestSuccess,
  assessorLoginRequestFailure,
  clearSession,
  defaultAction
} from '../actions'

describe('authReducer', () => {
  it('responds to default action', () => {
    expect(authReducer(undefined, defaultAction())).toMatchSnapshot()
  })
  it('returns the initial state', () => {
    expect(authReducer(undefined, {})).toMatchSnapshot()
  })

  it('handles the update field action', () => {
    expect(authReducer(undefined, updateField('email', 'test@test.com'))).toMatchSnapshot()
  })

  const initialStateLogin = initialState
  const afterLogin = { ...initialState, loading: true, error: null, emailError: null }
  it('handles login request', () => {
    expect(authReducer(initialStateLogin, assessorLoginRequest())).toEqual(afterLogin)
  })

  const data = { auth_token: '123123213' }
  it('handles login request success', () => {
    expect(
      authReducer(afterLogin, assessorLoginRequestSuccess({ authResponse: data }))
    ).toMatchSnapshot()
  })

  it('handles login request failure', () => {
    expect(
      authReducer(afterLogin, assessorLoginRequestFailure(new Error('badtime')))
    ).toMatchSnapshot()
  })

  it('clears data from the reducer on reload ', () => {
    expect(authReducer(afterLogin, clearSession())).toMatchSnapshot()
  })
})
