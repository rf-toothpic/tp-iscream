import {
  createEntryFailure,
  createEntrySuccess,
  getEntriesFailure,
  getEntriesSuccess,
  getEntryFailure,
  getEntrySuccess,
} from 'containers/Entry/actions'
import { CREATE_ENTRY, FETCH_ENTRIES, GET_ENTRY, UPDATE_ENTRY } from 'containers/Entry/constants'
import { takeLatest, put } from 'redux-saga/effects'
import { getEntry, getEntries, createEntry } from 'services/API'

function * fetchEntry ({ payload: { id } }) {
  try {
    const entry = yield getEntry(id)
    yield put(getEntrySuccess(entry))
  } catch (e) {
    yield put(getEntryFailure(e))
  }
}

function * fetchEntries () {
  try {
    const entry = yield getEntries()
    yield put(getEntriesSuccess(entry))
  } catch (e) {
    yield put(getEntriesFailure(e))
  }
}

function * patchEntry ({ payload }) {

}

function * newEntry ({ payload }) {
  try {
    const entry = yield createEntry(payload)
    yield put(createEntrySuccess(entry))
  } catch (e) {
    yield put(createEntryFailure(e))
  }
}

// Individual exports for testing
export default function * entrySaga () {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ENTRY, fetchEntry)
  yield takeLatest(FETCH_ENTRIES, fetchEntries)
  yield takeLatest(UPDATE_ENTRY, patchEntry)
  yield takeLatest(CREATE_ENTRY, newEntry)
}
