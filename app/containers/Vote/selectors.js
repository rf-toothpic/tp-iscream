import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the vote state domain
 */

const selectVoteDomain = state => state.vote || initialState

/**
 * Other specific selectors
 */
export const selectEntry = () => createSelector(
  selectVoteDomain,
  substate => substate.entry
)
export const selectSubmitted = () => createSelector(
  selectVoteDomain,
  substate => substate.submitted
)

/**
 * Default selector used by Vote
 */

const makeSelectVote = () =>
  createSelector(
    selectVoteDomain,
    substate => substate
  )

export default makeSelectVote
export { selectVoteDomain }
