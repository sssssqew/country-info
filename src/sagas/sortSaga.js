import { call, put, take, takeLatest, select, actionChannel, all } from 'redux-saga/effects';
import * as types from '~/actions/actionTypes';
import  helpers from '~/lib/helpers';
import * as selectors from './selectors';

function* sortCountry(action) {
  try {
    const { header } = action;
    console.log(header);
    const countries = yield select(selectors.countries);
    const sortState = yield select(selectors.sortState);

    Array.prototype.sortBy = helpers.sortByValue;
    const countries_sorted = countries.sortBy(header, sortState);
    console.log(countries_sorted);

    yield put({ type: types.SORT_COUNTRY_SUCCESS, data: {countries_sorted: countries_sorted, sortState:!sortState }});
  } catch (error) {
    yield put({ type: types.SORT_COUNTRY_FAILED, error });
  }
}

export function* sortSaga() {
    yield all( [
        takeLatest(types.SORT_COUNTRY, sortCountry),
    ])
}