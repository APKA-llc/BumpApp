//ayush
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {signInWithEmailAndPassword, user, getIdToken} from "firebase/auth";
import {auth} from "./firebaseConfig";
import MainHub from './MainHub';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';


//Style Standardization
let purpleStandard = '#7851A9'

// Sign in Screen
const SignInScreen =  () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const saveUser = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  const handleSignIn = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        saveUser(user);
        console.log('signed in');
        
        navigation.navigate(MainHub);
        // ...
      })
      .catch((error) => {
        const { code, message } = error;
        var errorMessage;

        switch (code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "Email address not found.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          default:
            errorMessage = code;
            break;
        }
        
        Alert.alert('Error', errorMessage, [{ text: 'Try Again' }]);
        //setShowErrorDialog(true);

        console.log(errorMessage);
      });
  };

  const handleDismiss = () => Keyboard.dismiss();

  return (

    <SafeAreaView style={styles.container}>
      
        <TouchableWithoutFeedback onPress={handleDismiss}>
            <View style={styles.container}>
            
            <Text style={styles.title}>Sign In</Text>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor= {purpleStandard}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor= {purpleStandard}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />

                 </KeyboardAvoidingView>
                 
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>


           
            
        
            </View>
        </TouchableWithoutFeedback>

        <Dialog
          visible={showErrorDialog}
          onTouchOutside={() => setShowErrorDialog(false)}>
          <DialogContent>
            <Text>Invalid email or password.</Text>
          </DialogContent>
        </Dialog>

        
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
    marginTop:55,
    flex:0.7,
    fontSize:80,
    color: purpleStandard,
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
    borderColor: "#2F024B",
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

export default SignInScreen;