//App.JS is the main file where the navigator will be. The screens will all connect here. No need to edit this

// To see your specific screen that you are working on just change the initialRouteName to your screens name

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpeningScreen from './OpeningScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import BumpScreen from './BumpScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OpeningScreen" screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="OpeningScreen"
          component={OpeningScreen}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="BumpScreen"
          component={BumpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;