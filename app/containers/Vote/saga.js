import { createVoteFailure, createVoteSuccess } from 'containers/Vote/actions'
import { CREATE_VOTE } from 'containers/Vote/constants'
import { takeLatest, put } from 'redux-saga/effects'
import { createVote } from 'services/API'
import EntrySaga from '../Entry/saga'

function * castVote ({ payload }) {
  console.log(payload)
  try {
    const data = yield createVote(payload)
    yield put(createVoteSuccess(data))
  } catch (e) {
    yield put(createVoteFailure(e))
  }
}
// Individual exports for testing
export default function * voteSaga () {
  yield takeLatest(CREATE_VOTE, castVote)
  // See example in containers/HomePage/saga.js
  yield EntrySaga()
}
