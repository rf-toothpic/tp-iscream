/*
 *
 * Leaderboard reducer
 *
 */
import produce from 'immer'
import { combineReducers } from 'redux'
import { DEFAULT_ACTION } from './constants'
import entriesReducer from 'containers/Entry/reducer'

export const initialState = {
  entries: []
}

/* eslint-disable default-case, no-param-reassign */
const leaderboardReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break
    }
  })

export default combineReducers({
  leaderboard: leaderboardReducer,
  entries: entriesReducer
})
