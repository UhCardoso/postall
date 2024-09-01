/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider, provider } from 'react-redux';
import {AppRegistry} from 'react-native';
import Navigator from './src/Navigator'
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig';

const store = storeConfig();

const redux = () => (
    <Provider store={store}>
        <Navigator />
    </Provider>
)

AppRegistry.registerComponent(appName, () => (redux));
