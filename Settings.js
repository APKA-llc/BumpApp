import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
        <SafeAreaView style={styles.parentcontainer}>

            <View style={styles.container}>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'log-out-outline'} size={40} color={'purple'} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>Log Out</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'mail-outline'} size={40} color={'purple'} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>Contact Us</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'reader-outline'} size={40} color={'purple'} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>Give Feedback</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'help-circle-outline'} size={40} color={'purple'} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>How to Use Bump</Text>
                </TouchableOpacity>
              </View>

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
  parentcontainer: {
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  settingsButtonContainer: {
    padding: 26,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingsButton: {
    fontSize: 32,
    color: 'purple',
    marginLeft: 20,
  },
});

export default SettingsScreen;