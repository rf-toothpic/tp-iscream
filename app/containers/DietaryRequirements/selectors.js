import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the dietaryRequirements state domain
 */

const selectDietaryRequirementsDomain = state =>
  state.dietaryRequirements || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DietaryRequirements
 */

const makeSelectDietaryRequirements = () =>
  createSelector(
    selectDietaryRequirementsDomain,
    substate => substate
  );

export default makeSelectDietaryRequirements;
export { selectDietaryRequirementsDomain };
