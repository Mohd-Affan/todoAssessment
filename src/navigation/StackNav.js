import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import NoteScreen from '../screens/NoteScreen';
import AddNotes from '../screens/AddNotes';
import FinalScreen from '../screens/FinalScreen';

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="FinalScreen" component={FinalScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Notes" component={NoteScreen} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
