import { combineReducers } from 'redux';

const mockReducer = (state = {}, action) => action.type === "something" ? { mock: 'mock'} : state;

const rootReducer = combineReducers({ mockReducer });

export default rootReducer;