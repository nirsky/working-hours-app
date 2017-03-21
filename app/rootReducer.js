import { combineReducers } from 'redux';
import database from 'infra/database/databaseReducer'
import header from 'app/header/state/headerReducer';
import settings from 'app/settings/settingsReducer';
import { navReducer } from 'app/navigation/scenesCreator';

const rootReducer = combineReducers({ database, header, nav: navReducer, settings });

export default rootReducer;