import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/index';
import StackNav from './src/navigation/StackNav';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StackNav />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
