/*
 *
 * DR actions
 *
 */

import { DEFAULT_ACTION, FETCH_DRS, FETCH_DRS_FAILURE, FETCH_DRS_SUCCESS } from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}
export function fetchDRs () {
  return { type: FETCH_DRS }
}

export function fetchDRSuccess (payload) {
  return { type: FETCH_DRS_SUCCESS, payload }
}

export function fetchDRFailure (error) {
  return { type: FETCH_DRS_FAILURE, error }
}
