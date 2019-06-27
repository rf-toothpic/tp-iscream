/*
 *
 * Vote reducer
 *
 */
import { GET_ENTRY, GET_ENTRY_FAILURE, GET_ENTRY_SUCCESS } from 'containers/Entry/constants'
import produce from 'immer'
import { CREATE_VOTE, CREATE_VOTE_FAILURE, CREATE_VOTE_SUCCESS, DEFAULT_ACTION } from './constants'

export const initialState = {
  submitted: false,
  entry:null,
  error:null,

}

/* eslint-disable default-case, no-param-reassign */
const voteReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break
      case GET_ENTRY:
        draft.loading = true
        break
      case GET_ENTRY_SUCCESS:
        draft.loading = false
        draft.entry = action.payload
        break
      case GET_ENTRY_FAILURE:
        draft.loading = false
        draft.error = action.error
        break
      case CREATE_VOTE:
        draft.loading = true
        break
      case CREATE_VOTE_SUCCESS:
        draft.loading = false
        draft.submitted = true
        break
      case CREATE_VOTE_FAILURE:
        draft.loading = false
        draft.error = action.error
        break
    }
  })

export default voteReducer
