import { combineReducers } from 'redux';
import urlsReducer from './urlsReducer';
import copiedIdReducer from './copiedIdReducer';
import authReducer from './authReducer';

export default combineReducers({
  urls: urlsReducer,
  copiedId: copiedIdReducer,
  auth: authReducer
});