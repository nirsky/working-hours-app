import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './rootReducer';
import MonthlyView from './monthlyView/MonthlyViewContainer';

const store = createStore(
    rootReducer,
    undefined,
    compose(
        // applyMiddleware({}),
        autoRehydrate()
    )
);

persistStore(store);

export default () =>
    <Provider store={store}>
        <View style={{flex: 1, backgroundColor: 'white', marginTop: 20}}>
            <MonthlyView/>
        </View>
    </Provider>