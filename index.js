/**
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux'; // Removido o `provider` incorreto
import { AppRegistry } from 'react-native';
import Navigator from './src/Navigator';
import { name as appName } from './app.json';
import firebase from '@react-native-firebase/app'; // Importando o Firebase
import storeConfig from './src/store/storeConfig';
import axios from 'axios';

axios.defaults.baseURL = 'https://postall-b3326-default-rtdb.firebaseio.com/';

// Firebase config (Opcional, se necessário inicializar manualmente)
const firebaseConfig = {
  apiKey: "AIzaSyADw7j_AdJK1O6P-icgi1GLjh0oH4OfhYs",
  authDomain: "https://postall-b3326-default-rtdb.firebaseio.com/",
  projectId: "postall-b3326",
  storageBucket: "postall-b3326.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "SEU_APP_ID",
};

// Função para inicializar o Firebase
const initializeFirebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); // Inicializando manualmente
    console.log('Firebase inicializado com sucesso');
  } else {
    console.log('Firebase já inicializado');
  }
};

// Criação da store
const store = storeConfig();

const ReduxApp = () => {
  // Use `useEffect` para inicializar o Firebase assim que o app carregar
  useEffect(() => {
    initializeFirebaseApp(); // Inicializa o Firebase uma vez quando o app carrega
  }, []);

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
