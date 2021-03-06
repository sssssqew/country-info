import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { countryWatcher, countrySaga } from './countrySaga';
import { searchSaga } from './searchSaga';
import { sortSaga } from './sortSaga';

export default function* rootSaga() {
  yield all([
    countryWatcher(),
    countrySaga(),
    searchSaga(),
    sortSaga(),
  ]);
}