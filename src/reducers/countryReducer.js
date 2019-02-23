import * as types from '~/actions/actionTypes';

const initialState = { isLoading: false, deleteState: false, sortState: false, showNums: 10 }

export default function countryReducer(
	state = initialState, action = null) {
	switch (action.type) {
		case types.GET_COUNTRY:
		  return { ...state, isLoading: true };
		case types.COUNTRY_RECEIVED:
		  return { ...state, isLoading: false, countries: action.data.countries_concated,  showNums: action.data.showNums };
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
		  return { ...state, isLoading: false, countries: action.data, deleteState: true };
		case types.DELETE_COUNTRY_FAILED:
		  return { ...state, isLoading: false, error: action.error,  deleteState: false };

	  case types.SEARCH_COUNTRY:
	  return { ...state, isLoading: true };
	case types.SEARCH_COUNTRY_SUCCESS:
	  return { ...state, isLoading: false, countries: action.data };
	case types.SEARCH_COUNTRY_FAILED:
	  return { ...state, isLoading: false, error: action.error };

	  case types.SORT_COUNTRY:
	  return { ...state, isLoading: true };
	case types.SORT_COUNTRY_SUCCESS:
	  return { ...state, isLoading: false, sortState: action.data.sortState, countries: action.data.countries_sorted };
	case types.SORT_COUNTRY_FAILED:
	  return { ...state, isLoading: false, error: action.error };

		default:
		  return state;
	}
}

