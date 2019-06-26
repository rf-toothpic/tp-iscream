// import { take, call, put, select } from 'redux-saga/effects';
import entries from 'containers/Entry/saga'
// Individual exports for testing
export default function * leaderboardSaga () {
  // See example in containers/HomePage/saga.js
  yield entries()
}
