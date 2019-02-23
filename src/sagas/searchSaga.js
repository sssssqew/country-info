import { call, put, take, takeLatest, select, actionChannel, all } from 'redux-saga/effects';
import * as types from '~/actions/actionTypes';
import  helpers from '~/lib/helpers';
import * as selectors from './selectors';

function* searchCountry(action) {
  try {
    const { keyword } = action;
    const countries = yield select(selectors.countries);

    const countries_searched = helpers.filterByValue(countries, keyword.keyword)
    yield put({ type: types.SEARCH_COUNTRY_SUCCESS, data: countries_searched });
  } catch (error) {
    yield put({ type: types.SEARCH_COUNTRY_FAILED, error });
  }
}

export function* searchSaga() {
    yield all( [
        takeLatest(types.SEARCH_COUNTRY, searchCountry),
    ])
}