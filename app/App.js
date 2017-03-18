import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './rootReducer';
import Header from 'app/header';
import Scenes from 'app/navigation/scenesCreator';

const store = createStore(
    rootReducer,
    undefined,
    compose(
        // applyMiddleware({}),
        autoRehydrate()
    )
);

persistStore(store, { storage: AsyncStorage });

export default () =>
    <Provider store={store}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <Header/>
            <Scenes/>
        </View>
    </Provider>