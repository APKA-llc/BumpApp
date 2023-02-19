//ayush
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebaseConfig";

//Style Standardization
let purpleStandard = '#7851A9'

// Sign up Screen
const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Perform login logic here, such as sending a request to a server
    //console.log(`Username: ${username}, Password: ${password}`);
    createUserWithEmailAndPassword(auth, email, password);
  };

  const handleDismiss = () => Keyboard.dismiss();


  return (
      <SafeAreaView style={styles.container}>
        
          <TouchableWithoutFeedback onPress={handleDismiss}>
              <View style={styles.container}>
              
              <Text style={styles.title}>Create Account</Text>
              
              <KeyboardAvoidingView behavior="padding" style={styles.container}>
                  <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor={purpleStandard}
                      onChangeText={text => setEmail(text)}
                      value={email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={purpleStandard}
                      onChangeText={text => setPassword(text)}
                      value={password}
                      secureTextEntry={true}
                  />
                  <TouchableOpacity style={styles.buttonStyle} onPress={handleSignUp}>
                      <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
              </KeyboardAvoidingView>
          
              </View>
          </TouchableWithoutFeedback>
          
          <Text style={styles.tinyText}>APKA LLC</Text>

      </SafeAreaView>
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:45,
    flex:0.7,
    fontSize:80,
    color:purpleStandard,
  },
  tinyText:{
    color: purpleStandard,
    fontSize:15,
    textAlign:'center'
  },
  input: {
    flex: 0.2,
    borderWidth: 1,
    borderColor: purpleStandard,
    borderRadius:20,
    marginVertical: 10,
    paddingHorizontal: 10,
    bottom:100,
    color: purpleStandard,
  },
  buttonStyle:{
    backgroundColor: purpleStandard,
    borderRadius: 25,
    marginTop: 70,
    borderWidth: 0,
    borderColor: purpleStandard,
    padding: 10,
    alignItems: "center",
    bottom: 30
  },

  buttonText:{
    color: "white",
    fontWeight:'bold', 
    fontSize:20
  },
});

export default SignUpScreen;