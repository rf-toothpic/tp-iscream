
// import { fetchAssessor } from 'containers/Dashboard/saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { loginUser, signUpUser, fetchUser, fetchUsers } from 'services/API'
import { setToken, setUserId } from 'utils/localstorage'
import {
  userLoginRequestFailure,
  userLoginRequestSuccess,
  userUpdateUserRequestFailure,
  userUpdateUserRequestSuccess,
  fetchUserSuccess,
  fetchUserFailure, userSignupRequestSuccess, fetchUsersSuccess, fetchUsersFailure
} from './actions'

import {
  LOGIN_REQUEST,
  UPDATE_USER_REQUEST,
  SIGNUP_REQUEST,
  FETCH_USERS
} from './constants'

export function * loginRequest ({ payload: { email, password } = {} }) {
  try {
    const loginData = yield loginUser(email, password)
    setToken(loginData.auth_token)
    setUserId(loginData.id)
    yield put(userLoginRequestSuccess(loginData))
  } catch (e) {
    yield put(userLoginRequestFailure(e))
  }
}

export function * signupRequest ({ payload: user }) {
  try {
    const data = yield signUpUser(user)
    setToken(data.auth_token)
    setUserId(data.id)
    yield put(userSignupRequestSuccess(data))
    // yield put(userLoginRequest({ email: user.email, password: user.password }))
  } catch (e) {
    yield put(userLoginRequestFailure(e))
  }
}

export function * getUser () {
  try {
    const data = yield call(fetchUser)
    yield put(fetchUserSuccess(data))
  } catch (e) {
    yield put(fetchUserFailure(e))
  }
}

export function * getUsers () {
  try {
    const data = yield call(fetchUsers)
    yield put(fetchUsersSuccess(data))
  } catch (e) {
    yield put(fetchUsersFailure(e))
  }
}

export function * updateUser (user) {
  try {
    const loginData = yield call(updateUser, user)
    yield put(userUpdateUserRequestSuccess(loginData))
  } catch (e) {
    yield put(userUpdateUserRequestFailure(e))
  }
}

export default function * auth () {
  yield takeLatest(LOGIN_REQUEST, loginRequest)
  yield takeLatest(UPDATE_USER_REQUEST, updateUser)
  yield takeLatest(SIGNUP_REQUEST, signupRequest)
  // yield takeLatest(FETCH_USER, getUser)
  yield takeLatest(FETCH_USERS, getUsers)
}
