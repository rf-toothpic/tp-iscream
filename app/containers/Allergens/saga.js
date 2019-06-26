import { fetchAllergensFailure, fetchAllergensSuccess } from 'containers/Allergens/actions'
import { FETCH_ALLERGENS } from 'containers/Allergens/constants'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { listAllergens } from 'services/API'

function * fetchAllergens () {
  try {
    const data = yield listAllergens()
    yield put(fetchAllergensSuccess(data))
  } catch (e) {
    yield put(fetchAllergensFailure(e))
  }
}
// Individual exports for testing
export default function * allergensSaga () {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_ALLERGENS, fetchAllergens)
}
