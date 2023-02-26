//App.JS is the main file where the navigator will be. The screens will all connect here. No need to edit this

// To see your specific screen that you are working on just change the initialRouteName to your screens name

import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpeningScreen from './OpeningScreen';
import SignInScreen from './SignInScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import BumpScreen from './BumpScreen';
import MainHub from './MainHub';
import {auth, user} from "./firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';


const Stack = createStackNavigator();



const App = () => {

  // import font
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-BlackItalic': require('./assets/fonts/Montserrat-BlackItalic.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-BoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
        'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-ExtraBoldItalic': require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
        'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat-ExtraLightItalic': require('./assets/fonts/Montserrat-ExtraLightItalic.ttf'),
        'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
        'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-LightItalic': require('./assets/fonts/Montserrat-LightItalic.ttf'),
        'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-MediumItalic': require('./assets/fonts/Montserrat-MediumItalic.ttf'),
        'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-SemiBoldItalic': require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
        'Montserrat-ThinItalic': require('./assets/fonts/Montserrat-ThinItalic.ttf'),
      });

      setIsReady(true);
    };

    loadFonts();
  }, []);
  
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
  
  if (loggedIn === null || !isReady) {
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