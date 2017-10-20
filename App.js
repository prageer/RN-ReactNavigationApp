/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';

import MainApp from './src';

const store = configureStore();

export default class App extends Component<{}> {

  render() {
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}
