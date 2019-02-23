import * as types from './actionTypes';

export function getCountry() {
  return { type: types.GET_COUNTRY };
}

export function createCountry(country) {
  return { type: types.CREATE_COUNTRY, country };
}

export function updateCountry(subscriber, msisdn) {
  return { type: types.UPDATE_COUNTRY, subscriber, msisdn };
}

export function deleteCountry(id) {
  return { type: types.DELETE_COUNTRY, id };
}

export function disableDeleteState(){
	return { type: types.DELETE_COUNTRY_FAILED }
}