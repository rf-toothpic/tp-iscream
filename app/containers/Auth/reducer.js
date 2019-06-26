/* eslint-disable camelcase */
/*
 *
 * Auth reducer
 *
 */

import produce from 'immer'
import {
  CLEAR_SESSION_DATA,
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
} from './constants'

export const initialState = {
  loading: false,
  error: null,
  authenticationComplete: false,
  user: {},
  users: []
}

// this reducer should be split up and actions renamed
// current conention is confusing between requests for a
// pw reset and actually resetting the user pw

// also split these into multiple reducers
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        loginRequest(draft, action)
        break
      case LOGIN_REQUEST_SUCCESS:
        loginRequestSuccess(draft, action)
        break
      case LOGIN_REQUEST_FAILURE:
        loginRequestFailure(draft, action)
        break
      case CLEAR_SESSION_DATA:
        clearSessionData(draft, action)
        break
      case FETCH_USERS:
        draft.loading = true
        draft.error = null
        break
      case FETCH_USERS_SUCCESS:
        draft.loading = false
        draft.users = action.payload
        break
      case FETCH_USERS_FAILURE:
        draft.loading = false
        draft.error = action.error
        break
      case FETCH_USER:
        draft.loading = true
        draft.error = null
        break
      case FETCH_USER_SUCCESS:
        draft.loading = false
        draft.user = action.payload
        break
      case FETCH_USER_FAILURE:
        draft.loading = false
        draft.error = action.error
        break
    }
  })

/*
 * Login
 */
function loginRequest (state) {
  state.loading = true
  state.authenticationComplete = false
  state.error = null
}

function loginRequestSuccess (state, { payload }) {
  state.loading = false
  state.authenticationComplete = true
  state.user = payload
}

function loginRequestFailure (state, { error }) {
  state.loading = false
  state.error = error
}

/*
 * signup
 */
function signupRequest (state) {
  state.loading = true
  state.authenticationComplete = false
  state.error = null
}

function signupRequestSuccess (state, { payload }) {
  state.loading = false
  state.authenticationComplete = false
  state.user = payload
}

function signupRequestFailure (state, { error }) {
  state.loading = false
  state.error = error
}

function clearSessionData () {
  return initialState
}

export default authReducer
