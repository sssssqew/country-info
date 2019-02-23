import * as types from './actionTypes';

export function searchCountry(keyword) {
  return { type: types.SEARCH_COUNTRY, keyword };
}