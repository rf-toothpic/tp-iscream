/*
 *
 * Vote actions
 *
 */

import { DEFAULT_ACTION, CREATE_VOTE, CREATE_VOTE_SUCCESS, CREATE_VOTE_FAILURE } from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}

export function createVote (payload) {
  return {
    type: CREATE_VOTE,
    payload
  }
}

export function createVoteSuccess () {
  return {
    type: CREATE_VOTE_SUCCESS
  }
}
export function createVoteFailure () {
  return {
    type: CREATE_VOTE_FAILURE
  }
}
