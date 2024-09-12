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

import axios from 'axios'

axios.defaults.baseURL = 'https://postall-b3326-default-rtdb.firebaseio.com/';

const store = storeConfig();

const redux = () => (
    <Provider store={store}>
        <Navigator />
    </Provider>
)

AppRegistry.registerComponent(appName, () => (redux));
