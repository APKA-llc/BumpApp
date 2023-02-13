//ayush
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


// Sign in Screen
const SignInScreen =  () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    // Perform login logic here, such as sending a request to a server
    //console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleDismiss = () => Keyboard.dismiss();

  return (
  <LinearGradient colors={['#C44EEE','#562574']} style={{flex:1}}>
    <SafeAreaView style={styles.container}>
      
        <TouchableWithoutFeedback onPress={handleDismiss}>
            <View style={styles.container}>
            
            <Text style={styles.title}>Sign In</Text>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    onChangeText={text => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('OpeningScreen')}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        
            </View>
        </TouchableWithoutFeedback>
        
      
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
    marginTop:55,
    flex:0.7,
    fontSize:80,
    color:"#ffffff",
    
  },
  input: {
    flex: 0.2,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius:20,
    marginVertical: 10,
    paddingHorizontal: 10,
    bottom:100,
    color:'white',
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

export default SignInScreen;