/*
 *
 * Auth actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_FAILURE,
  UPDATE_USER_REQUEST_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAILURE,
  SIGNUP_REQUEST_SUCCESS,
  CLEAR_SESSION_DATA,
  FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
  FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE
} from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}

export function clearSession () {
  return {
    type: CLEAR_SESSION_DATA
  }
}

export function userLoginRequest (payload) {
  return {
    type: LOGIN_REQUEST,
    payload
  }
}

export function userLoginRequestSuccess (response) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload: response
  }
}

export function userLoginRequestFailure (error) {
  return {
    type: LOGIN_REQUEST_FAILURE,
    payload: {
      error
    },
    error: new Error(error)
  }
}

export function userSignupRequest (payload) {
  return {
    type: SIGNUP_REQUEST,
    payload
  }
}

export function userSignupRequestSuccess (response) {
  return {
    type: SIGNUP_REQUEST_SUCCESS,
    payload: response
  }
}

export function userSignupRequestFailure (error) {
  return {
    type: SIGNUP_REQUEST_FAILURE,
    payload: {
      error
    },
    error: new Error(error)
  }
}

export function userUpdateUserRequest (payload) {
  return {
    type: UPDATE_USER_REQUEST,
    payload
  }
}

export function userUpdateUserRequestSuccess (response) {
  return {
    type: UPDATE_USER_REQUEST_SUCCESS,
    payload: response
  }
}

export function userUpdateUserRequestFailure (error) {
  return {
    type: UPDATE_USER_REQUEST_FAILURE,
    payload: {
      error
    },
    error: new Error(error)
  }
}

export function fetchUser () {
  return {
    type: FETCH_USER
  }
}

export function fetchUserSuccess (payload) {
  return {
    type: FETCH_USER_SUCCESS,
    payload
  }
}

export function fetchUserFailure (error) {
  return {
    type: FETCH_USER_FAILURE,
    error
  }
}

export function fetchUsers () {
  return {
    type: FETCH_USERS
  }
}

export function fetchUsersSuccess (payload) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  }
}

export function fetchUsersFailure (error) {
  return {
    type: FETCH_USERS_FAILURE,
    error
  }
}
