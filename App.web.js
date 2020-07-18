import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import App from './src/web';
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
const store = configureStore();
const Main = () => (
<Provider store={store}>
  <App />
</Provider>
)

export default Main;


