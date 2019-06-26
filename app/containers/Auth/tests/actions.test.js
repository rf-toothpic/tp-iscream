import {
  defaultAction,
  assessorLoginRequest,
  assessorLoginRequestSuccess,
  assessorLoginRequestFailure,
  clearSession
} from '../actions'
import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  CLEAR_SESSION_DATA
} from '../constants'

describe('Auth actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION
      }
      expect(defaultAction()).toEqual(expected)
    })
  })

  describe('login request action', () => {
    it('has a type of LOGIN_REQUEST', () => {
      const expected = {
        type: LOGIN_REQUEST
      }
      expect(assessorLoginRequest()).toEqual(expected)
    })
  })

  describe('login request failure action', () => {
    it('has a type of LOGIN_REQUEST_FAILURE', () => {
      const expected = {
        payload: {
          error: 'error'
        },
        type: LOGIN_REQUEST_FAILURE
      }
      expect(assessorLoginRequestFailure('error')).toEqual(expected)
    })
  })

  describe('login request success action', () => {
    it('has a type of LOGIN_REQUEST_SUCCESS', () => {
      const expected = { type: LOGIN_REQUEST_SUCCESS, payload: { response: 'iamdata' } }
      expect(assessorLoginRequestSuccess('iamdata')).toEqual(expected)
    })
  })

  describe('clear session data action', () => {
    it('has a type of CLEAR_SESSION_DATA', () => {
      const expected = {
        type: CLEAR_SESSION_DATA
      }
      expect(clearSession()).toEqual(expected)
    })
  })
})
