//App.JS is the main file where the navigator will be. The screens will all connect here. No need to edit this

// To see your specific screen that you are working on just change the initialRouteName to your screens name

import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpeningScreen from './OpeningScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import BumpScreen from './BumpScreen';
import MainHub from './MainHub';
import {auth, user} from "./firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();



const App = () => {
  
  const [loggedIn, setLoggedInStatus] = useState(null);

  const checkUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        // The user is already signed in, navigate to HomeScreen
        setLoggedInStatus(true);
  
       
      } else {
        // The user is not signed in, navigate to SignInScreen
        setLoggedInStatus(false);
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkUser();
  }, []);
  //console.log(loggedIn)
  if (loggedIn === null) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = {loggedIn ? "MainHub" : "OpeningScreen"} screenOptions={{headerShown:false}}>

        <Stack.Screen
          name="OpeningScreen"
          component={OpeningScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
        />
        <Stack.Screen
          name="MainHub"
          component={MainHub}
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