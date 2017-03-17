import { combineReducers } from 'redux';
import database from 'infra/database/databaseReducer'
import header from 'app/header/state/headerReducer';

const rootReducer = combineReducers({ database, header });

export default rootReducer;