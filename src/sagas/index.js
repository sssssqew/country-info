import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { countryWatcher, countrySaga } from './countrySaga';

export default function* rootSaga() {
  yield all([
    countryWatcher(),
    countrySaga(),
  ]);
}