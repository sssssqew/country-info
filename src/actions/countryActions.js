import * as types from './actionTypes';

export function getCountry() {
  return { type: types.GET_COUNTRY };
}

export function createCountry() {
  return { type: types.CREATE_COUNTRY };
}

export function updateCountry(subscriber, msisdn) {
  return { type: types.UPDATE_COUNTRY, subscriber, msisdn };
}

export function deleteCountry(id) {
  return { type: types.DELETE_COUNTRY, id };
}