import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the ballot state domain
 */

const selectBallotDomain = state => state.ballot || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ballot
 */

const makeSelectBallot = () =>
  createSelector(
    selectBallotDomain,
    substate => substate
  );

export default makeSelectBallot;
export { selectBallotDomain };
