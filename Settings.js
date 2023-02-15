import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {signOut} from "firebase/auth";
import {auth} from "./firebaseConfig";
import OpeningScreen from './OpeningScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Settings Screen
const SettingsScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Signed Out!")
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
    //Remove User From Storage
    try {
      AsyncStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    }
    navigation.navigate(OpeningScreen);

  };

  return (
    <LinearGradient colors={['#C44EEE','#562574']} style={{flex:1}}>
        <SafeAreaView style={styles.container}>

            <View style={styles.container}>

            <Text>Settings Screen</Text>

            </View>

            <TouchableOpacity style={styles.buttonStyle} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

        </SafeAreaView>
    </LinearGradient>
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  container: {
    backgroundColor:'transparent',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle:{
    backgroundColor: "#F8EEFE",
    borderRadius: 25,
    marginTop: 70,
    borderWidth: 0,
    borderColor: "#2F024B",
    padding: 10,
    alignItems: "center",
    bottom: 30
  },
});

export default SettingsScreen;