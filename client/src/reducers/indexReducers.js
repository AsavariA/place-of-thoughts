import { combineReducers } from "redux";
import blogReducers from './blogReducers';
import authReducers from './authReducers';

export default combineReducers({ blogReducers, authReducers });