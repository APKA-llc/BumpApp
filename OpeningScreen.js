import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import { firestore} from './firebaseConfig';
import {getDatabase, ref, set} from "firebase/database";


//Style Standardization
const purpleStandard = '#7851A9'; //orange: #f2af58, brown: #70452a, turquoise: #008d8c, magenta: #962c4f, blue: #2a2ab0
const darkGrayStandard = '#9e9e9e';
const lightGrayStandard = '#d3d3d3';

const fontLight = 'Montserrat-Light';
const fontRegular = 'Montserrat-Regular';
const fontMedium = 'Montserrat-Medium';
const fontSemiBold = 'Montserrat-SemiBold';
const fontBold = 'Montserrat-Bold';


// Opening Screen
const OpeningScreen = () => {
  const navigation = useNavigation();
  


  return (
    <SafeAreaView style={styles.container}>
      
  
        <View style={styles.container}>
          
          <Text style={styles.title}>Bump</Text>

          <Text style={styles.subtitle}>Real connections start with a bump.</Text>

          <Image style={styles.logoStyle} source={require('./assets/bumplogo.png')}/>
          
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{'Sign In'}</Text>
            
          </TouchableOpacity>
        
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{'Create Account'}</Text>
          </TouchableOpacity>
  
        
        </View>
      
        <Text style={styles.tinyText}>APKA LLC</Text>
        
    </SafeAreaView>
  );
};


//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  container: {
    backgroundColor: purpleStandard,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    top: 45,
    bottom: 0,
    flex: 0.7,
    fontSize: '85',
    color: "#ffffff",
    fontFamily: fontLight,
  },
  subtitle: {
    textAlign:'center',
    justifyContent: 'center',
    fontSize: 25, 
    color: '#ffffff',
    flex: 0.2,
    bottom: 110,
    fontFamily: fontBold,
  },
  tinyText:{
    color: "#ffff",
    fontSize: 15,
    textAlign: 'center',
    fontFamily: fontLight,
  },
  logoStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    height: 400,
    width: 400,
    flex: 0.8,
    bottom: 40,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  buttonStyle:{
    backgroundColor: "#F8EEFE",
    borderRadius: 25,
    marginTop: 10,
    borderWidth: 0,
    borderColor: "#2F024B",
    padding: 10,
    alignItems: "center",
    bottom: 30
  },
  buttonText:{
    color: purpleStandard,
    fontSize: 20,
    fontFamily: fontSemiBold,
  },
  
});

export default OpeningScreen;