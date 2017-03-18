import { combineReducers } from 'redux';
import database from 'infra/database/databaseReducer'
import header from 'app/header/state/headerReducer';
import { navReducer } from 'app/navigation/scenesCreator';

const rootReducer = combineReducers({ database, header, nav: navReducer });

export default rootReducer;