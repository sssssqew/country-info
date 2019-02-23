import { call, put, take, takeLatest, select, actionChannel, all } from 'redux-saga/effects';
import * as types from '~/actions/actionTypes';
import api from '~/lib/apiEndpoints';
import  helpers from '~/lib/helpers';
import * as selectors from './selectors';

function* createCountry(action) {
  try {
    const { country } = action;
    const uuidv4 = require('uuid/v4');
    const countries = yield select(selectors.countries);

    const newCountry = {
      id: uuidv4(),
      ...country,
    }
    const countries_added = [...countries, newCountry];

    yield put({ type: types.CREATE_COUNTRY_SUCCESS, data: countries_added });
  } catch (error) {
    yield put({ type: types.CREATE_COUNTRY_FAILED, error });
  }
}

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
    const showNums = yield select(selectors.showNums);
    let countries_prev = yield select(selectors.countries);
    console.log(showNums);
  
    countries_prev = countries_prev || [];
      console.log(countries_prev);

    const [ codes, names, capitals, phones ] = yield all([
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.CODE}`, { timeout: TIMEOUT }).then(res => res.json()),
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.NAME}`, { timeout: TIMEOUT }).then(res => res.json()),
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.CAPITAL}`, { timeout: TIMEOUT }).then(res => res.json()),
      fetch(`${api.API_BASE_URL}/${api.ENDPOINTS.PHONE}`, { timeout: TIMEOUT }).then(res => res.json()),
    ])

    const countries = helpers.create_country_model(codes, names, capitals, phones);
    const countries_part = countries.slice(showNums-10, showNums);
    const countries_concated = countries_prev.concat(countries_part);
  
   // console.log(countries);
    yield put({ type: types.COUNTRY_RECEIVED, data: {countries_concated:countries_concated, showNums:showNums+10 }  });
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
        takeLatest(types.CREATE_COUNTRY, createCountry),
        // takeLatest(types.UPDATE_COUNTRY, updateCountry),
        takeLatest(types.DELETE_COUNTRY, deleteCountry),
    ])
}