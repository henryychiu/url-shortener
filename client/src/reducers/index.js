import { combineReducers } from 'redux';
import urlsReducer from './urlsReducer';
import copiedIdReducer from './copiedIdReducer'

export default combineReducers({
  urls: urlsReducer,
  copiedId: copiedIdReducer
});