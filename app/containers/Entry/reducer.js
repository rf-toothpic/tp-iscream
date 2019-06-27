/*
 *
 * Entry reducer
 *
 */
import produce from 'immer'
import { DEFAULT_ACTION, FETCH_ENTRIES, FETCH_ENTRIES_FAILURE, FETCH_ENTRIES_SUCCESS, CREATE_ENTRY, CREATE_ENTRY_FAILURE, CREATE_ENTRY_SUCCESS, UPDATE_ENTRY, UPDATE_ENTRY_FAILURE, UPDATE_ENTRY_SUCCESS, GET_ENTRY, GET_ENTRY_FAILURE, GET_ENTRY_SUCCESS } from './constants'

export const initialState = {
  entry: {},
  entries: [],
  loading: false,
  error: null
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
      case CREATE_ENTRY:
        draft.loading = true
        draft.error = null
        break
      case CREATE_ENTRY_SUCCESS:
        draft.loading = true
        draft.entry = action.payload
        break
      case CREATE_ENTRY_FAILURE:
        draft.loading = true
        draft.error = action.error
        break
      case UPDATE_ENTRY:
        draft.loading = true
        draft.error = null
        break
      case UPDATE_ENTRY_SUCCESS:
        draft.loading = true
        draft.entry = action.payload
        break
      case UPDATE_ENTRY_FAILURE:
        draft.loading = true
        draft.error = action.error
        break
      case GET_ENTRY:
        draft.loading = true
        draft.error = null
        break
      case GET_ENTRY_SUCCESS:
        draft.loading = false
        draft.entry = action.payload
        break
      case GET_ENTRY_FAILURE:
        draft.loading = false
        draft.error = action.error
        break
    }
  })

export default entryReducer
