import { initialState } from 'containers/Leaderboard/reducer'
import { createSelector } from 'reselect'

/**
 * Direct selector to the auth state domain
 */
const selectAuthDomain = state => state.auth || initialState

/**
 * Generic item selector - use if no data mutations/calculations occur
 */
export const selectItem = item =>
  createSelector(selectAuthDomain, state => state && state[item])

export const selectUsers = () =>
  createSelector(selectAuthDomain, state => {
    return state.users
  })
/**
 * Other specific selectors
 */

/**
 * Default selector used by Auth
 */
const makeSelectAuth = () => createSelector(selectAuthDomain, substate => substate)

export default makeSelectAuth
