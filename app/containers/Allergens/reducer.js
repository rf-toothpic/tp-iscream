/*
 *
 * Allergens reducer
 *
 */
import produce from 'immer'
import { DEFAULT_ACTION, FETCH_ALLERGENS, FETCH_ALLERGENS_FAILURE, FETCH_ALLERGENS_SUCCESS } from './constants'

export const initialState = {
  allergens: [],
  loading: false
}

/* eslint-disable default-case, no-param-reassign */
const allergensReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break
      case FETCH_ALLERGENS:
        draft.loading = true
        break
      case FETCH_ALLERGENS_SUCCESS:
        draft.loading = false
        draft.allergens = action.payload
        break
      case FETCH_ALLERGENS_FAILURE:
        draft.loading = false
        draft.error = action.error
        break
    }
  })

export default allergensReducer
