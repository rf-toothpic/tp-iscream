import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the vote state domain
 */

const selectVoteDomain = state => state.vote || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Vote
 */

const makeSelectVote = () =>
  createSelector(
    selectVoteDomain,
    substate => substate
  );

export default makeSelectVote;
export { selectVoteDomain };
