/*
 *
 * Allergens actions
 *
 */

import { DEFAULT_ACTION, FETCH_ALLERGENS, FETCH_ALLERGENS_FAILURE, FETCH_ALLERGENS_SUCCESS } from './constants'

export function defaultAction () {
  return {
    type: DEFAULT_ACTION
  }
}
export function fetchAllergens () {
  return { type: FETCH_ALLERGENS }
}

export function fetchAllergensSuccess (payload) {
  return { type: FETCH_ALLERGENS_SUCCESS, payload }
}

export function fetchAllergensFailure (error) {
  return { type: FETCH_ALLERGENS_FAILURE, error }
}
