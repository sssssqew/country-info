import { combineReducers } from 'redux';
import country from './countryReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  country,
  form: formReducer
});