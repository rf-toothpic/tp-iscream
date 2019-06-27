import { fetchDRFailure, fetchDRSuccess } from 'containers/DR/actions'
import { FETCH_DRS } from 'containers/DR/constants'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { fetchDietaryRequirements } from 'services/API'

function * fetchAllergens () {
  try {
    const data = yield fetchDietaryRequirements()
    yield put(fetchDRSuccess(data))
  } catch (e) {
    yield put(fetchDRFailure(e))
  }
}
// Individual exports for testing
export default function * allergensSaga () {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_DRS, fetchAllergens)
}
