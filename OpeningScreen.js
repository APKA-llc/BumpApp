import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

import { firestore} from './firebaseConfig';
import {getDatabase, ref, set} from "firebase/database";




// Opening Screen
const OpeningScreen = () => {
  const navigation = useNavigation();
  


  return (
  <LinearGradient colors={['#C44EEE','#562574']} style={{flex:1}}>
    <SafeAreaView style={styles.container}>
      
  
        <View style={styles.container}>
          
          <Text style={styles.title}>Bump</Text>

          <Text style={styles.subtitle}>Real connections start with a Bump.</Text>

          <Image style={styles.logoStyle} source={require('./assets/bumplogo.png')}/>
          
          <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{'Sign In'}</Text>
            
          </TouchableOpacity>
        
          <TouchableOpacity onPress={()=> navigation.navigate('ProfileScreen')} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>{'Create Account'}</Text>
          </TouchableOpacity>
  
        
        </View>
      
        <Text style={styles.tinyText}>APKA LLC</Text>
        
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
  title: {
    fontWeight: 'bold',
    textAlign:'center',
    top:45,
    bottom:0,
    flex:0.7,
    fontSize:'85',
    color:"#ffffff",
    
  },
  subtitle: {
    textAlign:'center',
    justifyContent: 'center',
    fontSize:25, 
    color: '#ffffff',
    flex:0.2,
    bottom:110,
  },
  tinyText:{
    color: "#ffff",
    fontSize:15,
    textAlign:'center'
  },
  logoStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    height:400,
    width:400,
    flex:0.8,
    bottom:40,
    alignSelf:'center',
    resizeMode:'contain'
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
    color: "#000000",
    fontWeight:'bold', 
    fontSize:20
  },
  
});

export default OpeningScreen;