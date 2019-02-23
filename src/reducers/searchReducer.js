import * as types from '~/actions/actionTypes';

const initialState = { isLoading: false }

export default function searchReducer(
	state = initialState, action = null) {
	switch (action.type) {
		case types.SEARCH_COUNTRY:
		  return { ...state, isLoading: true };
		case types.SEARCH_COUNTRY_SUCCESS:
		  return { ...state, isLoading: false, countries: action.data };
		case types.SEARCH_COUNTRY_FAILED:
		  return { ...state, isLoading: false, error: action.error };
		
		default:
		  return state;
	}
}