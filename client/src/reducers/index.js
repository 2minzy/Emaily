// 이곳의 index.js는 import를 쉽게 하기 위한 react redux 프로젝트의 convention 이다.
import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer
});