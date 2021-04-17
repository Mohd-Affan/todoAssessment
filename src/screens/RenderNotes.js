import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export default class RenderNotes extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.title}>
        <Text style={styles.titleText}>{this.props.item.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {backgroundColor: 'lavender', margin: 20},
  titleText: {fontSize: 20, margin: 40, marginLeft: 50},
});
