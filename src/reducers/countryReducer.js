import * as types from '~/actions/actionTypes';

const initialState = { isLoading: false, isDeleted: false }

export default function countryReducer(
	state = initialState, action = null) {
	switch (action.type) {
		case types.GET_COUNTRY:
		  return { ...state, isLoading: true };
		case types.COUNTRY_RECEIVED:
		  return { ...state, isLoading: false, countries: action.data };
		case types.COUNTRY_REQUEST_FAILED:
		  return { ...state, isLoading: false, error: action.error };
		
		case types.CREATE_COUNTRY:
		  return { ...state, isLoading: true };
		case types.CREATE_COUNTRY_SUCCESS:
		  return { ...state, isLoading: false, countries: action.data };
		case types.CREATE_COUNTRY_FAILED:
		  return { ...state, isLoading: false, error: action.error };
		
		case types.UPDATE_COUNTRY:
		  return { ...state, isLoading: true };
		case types.UPDATE_COUNTRY_SUCCESS:
		  return { ...state, isLoading: false, countries: action.data };
		case types.UPDATE_COUNTRY_FAILED:
		  return { ...state, isLoading: false, error: action.error };
		
		case types.DELETE_COUNTRY:
		  return { ...state, isLoading: true };
		case types.DELETE_COUNTRY_SUCCESS:
		  return { ...state, isLoading: false, countries: action.data, isDeleted: true };
		case types.DELETE_COUNTRY_FAILED:
		  return { ...state, isLoading: false, error: action.error,  isDeleted: false };
		default:
		  return state;
	}
}

