/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import { FETCH_USER } from 'containers/Auth/constants'
import produce from 'immer'
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from './constants'

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false
  }
}

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USER:
        draft.loading = true
        draft.error = null
        break

      case FETCH_USER_SUCCESS:
        draft.loading = false
        draft.user = action.payload
        break

      case FETCH_USER_FAILURE:
        draft.error = action.error
        draft.loading = false
        break
    }
  })

export default appReducer
