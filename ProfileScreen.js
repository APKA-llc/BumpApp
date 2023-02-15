import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import {ImagePicker, Permissions} from 'expo';
import { useNavigation } from '@react-navigation/native';

// Profile Screen
const ProfileScreen = () => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const navigation = useNavigation();

  let messageTop;
  let messageBottom;

  if (currentGroup === 3) {
    messageTop = 'Finish';
  } else {
    messageTop = 'Continue';
  }

  if (currentGroup === 1) {
    messageBottom = 'Exit';
  } else {
    messageBottom = 'Return';
  }

  const formComplete = () => {
    if (currentGroup === 3) {
      navigation.navigate('HomeScreen');
    } else {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const formEscape = () => {
    if (currentGroup === 1) {
      navigation.navigate('OpeningScreen');
    } else {
      setCurrentGroup(currentGroup - 1);
    }
  };


  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>

          {currentGroup === 1 && (
            <View style = {styles.vanish}>
              <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Enter Your Name</Text>
              </View>

              <View style={styles.inputContainer}>
                
                <TextInput
                  style={styles.input}
                  placeholder="First Name Only"
                  placeholderTextColor="purple"
                  // TODO: Add proper data input code
                />
              </View>
            </View>
          )}
          {currentGroup === 2 && (
           <View style = {styles.vanish}>
            <View style={styles.TitleContainer}>
              <Text style={styles.Title}>Choose a photo</Text>
            </View>

            <View style={styles.inputContainer}>
              
                <TextInput
                  style={styles.input}
                  placeholder="Select Photo"
                  placeholderTextColor="purple"
                  // TODO: Add proper data input code
                />
              </View>
            </View>
          )}
          {currentGroup === 3 && (
           <View style = {styles.vanish}>
              <View style={styles.TitleContainer}>
              <Text style={styles.Title}>Introduce Yourself</Text>
              </View>

            <View style={styles.inputContainer}>
                
                <TextInput
                  style={styles.input}
                  placeholder="Type Here"
                  placeholderTextColor="purple"
                  // TODO: Add proper data input code
                />
            </View>
          </View>
          )}

            <View style = {styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyle} onPress={formComplete}>
                <Text style={styles.buttonText}>{messageTop}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={formEscape}>
                <Text style={styles.buttonText}>{messageBottom}</Text>
              </TouchableOpacity>
            </View>
        </View>
      </SafeAreaView>
 
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
  vanish:{
    //backgroundColor:'green',
    flex:2
    
  },
  TitleContainer:{
    //backgroundColor:"blue",
    flex:1,
    justifyContent:"flex-end",
    alignItems:'center',
    
  },
  Title: {
    fontSize: '40%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'purple',
  },
  inputContainer: {
    //backgroundColor: 'yellow',
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:'5%'
  },
  input: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'purple',
    alignContent:'center',
    fontSize: "20%",
    padding:'5%',
    paddingHorizontal:'8%',
    color: '#fff',
  },
  buttonContainer:{
    //backgroundColor:'red',
    flex:1,
    justifyContent:"flex-end"

  },
  buttonStyle:{
    backgroundColor: "purple",
    borderRadius: 25,
    padding: 10,
    marginVertical:"1%"
   
  },
  buttonText:{
    color: "white",
    fontWeight:'bold', 
    fontSize:20,
    textAlign:'center'
  },
});

export default ProfileScreen;