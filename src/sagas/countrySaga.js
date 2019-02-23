import { call, put, take, takeLatest, select, actionChannel, all } from 'redux-saga/effects';
import * as types from '~/actions/actionTypes';
import api from '~/lib/apiEndpoints';
import  create_country_model from '~/lib/helpers';
import * as selectors from './selectors';

function* deleteCountry(action) {
  try {
    const { id } = action;
    const countries = yield select(selectors.countries);

  const selectedIndex = countries.findIndex( country => country.id === id);
  const countries_deleted = [...countries.slice(0, selectedIndex), ...countries.slice(selectedIndex+1, countries.length)];
 
    yield put({ type: types.DELETE_COUNTRY_SUCCESS, data: countries_deleted });
  } catch (error) {
    yield put({ type: types.DELETE_COUNTRY_FAILED, error });
  }
}

function* fetchCountry(action) {
  try {
    const TIMEOUT = 60000;
  
    const [ codes, names, capitals, phones ] = yield all([
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.CODE}`, { timeout: TIMEOUT }).then(res => res.json()),
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.NAME}`, { timeout: TIMEOUT }).then(res => res.json()),
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.CAPITAL}`, { timeout: TIMEOUT }).then(res => res.json()),
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.PHONE}`, { timeout: TIMEOUT }).then(res => res.json()),
    ])

    const countries = create_country_model(codes, names, capitals, phones);
   console.log(countries);
    yield put({ type: types.COUNTRY_RECEIVED, data: countries });
  } catch (error) {
    yield put({ type: types.COUNTRY_REQUEST_FAILED, error });
  }
}

export function* countryWatcher() {
  const conturyChannel = yield actionChannel(types.GET_COUNTRY);
  while (true) {
    const action = yield take(conturyChannel);
    yield call(fetchCountry, action);
  }
}

export function* countrySaga() {
    yield all( [
        // takeLatest(types.CREATE_COUNTRY, createCountry),
        // takeLatest(types.UPDATE_COUNTRY, updateCountry),
        takeLatest(types.DELETE_COUNTRY, deleteCountry),
    ])
}