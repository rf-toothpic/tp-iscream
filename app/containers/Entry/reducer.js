/*
 *
 * Entry reducer
 *
 */
import produce from 'immer'
import { DEFAULT_ACTION, FETCH_ENTRIES, FETCH_ENTRIES_FAILURE, FETCH_ENTRIES_SUCCESS } from './constants'

export const initialState = {
  entry: {},
  entries: []
}

/* eslint-disable default-case, no-param-reassign */
const entryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break
      case FETCH_ENTRIES:
        draft.loading = true
        draft.error = null
        break
      case FETCH_ENTRIES_SUCCESS:
        draft.loading = true
        draft.entries = action.payload
        break
      case FETCH_ENTRIES_FAILURE:
        draft.loading = true
        draft.error = action.error
        break
    }
  })

export default entryReducer
