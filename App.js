import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import App from './src/app';

import { Provider } from "react-redux";
import configureStore from "./src/configureStore";


const store = configureStore();


const Main = () => (



<Provider store={store}>
  <App />
</Provider>
)

export default Main;
/*
export default class Main extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    SplashScreen.preventAutoHideAsync();
  }

  render() {
    if (!this.state.isReady) {
      return (

        <View style={styles.splashScreen}>
          <Image
            style={styles.splashScreenlogo}
            source={require('./assets/brand_logo.png')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>

    );
  }



  _cacheResourcesAsync = async () => {
    SplashScreen.hideAsync();
    this.setState({ isReady: true });
  };
}*/

const styles = StyleSheet.create({
  splashScreen: {
    opacity: 1,
    position: 'relative',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  splashScreenlogo: {
    opacity: 1,
    position: 'absolute',
    width: 340,
    height: 99,
  }
});