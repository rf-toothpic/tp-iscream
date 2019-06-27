import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the entry state domain
 */

const selectEntryDomain = state => state.entry || initialState

/**
 * Other specific selectors
 */

const selectEntry = () =>
  createSelector(
    selectEntryDomain,
    substate => substate.entry
  )

const selectEntries = () =>
  createSelector(
    selectEntryDomain,
    substate => substate.entries
  )

export const selectLoading = () =>
  createSelector(
    selectEntryDomain,
    substate => substate.loading
  )

/**
 * Default selector used by Entry
 */

const makeSelectEntry = () =>
  createSelector(
    selectEntryDomain,
    substate => substate
  )

export default makeSelectEntry
export { selectEntryDomain, selectEntry, selectEntries }
