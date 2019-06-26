import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the allergens state domain
 */

const selectAllergensDomain = state => state.allergens || initialState

/**
 * Other specific selectors
 */
const selectAllergens = () =>
  createSelector(
    selectAllergensDomain,
    substate => substate.allergens
  )

/**
 * Default selector used by Allergens
 */

const makeSelectAllergens = () =>
  createSelector(
    selectAllergensDomain,
    substate => substate
  )

export default makeSelectAllergens
export { selectAllergensDomain, selectAllergens }
