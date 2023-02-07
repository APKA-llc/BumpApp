//Jacob
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



// Profile Screen
const ProfileScreen = ({ navigation }) => {
  const [currentGroup, setCurrentGroup] = useState(1);

  return (
  <LinearGradient colors={['#C44EEE','#562574']} style={{flex:1}}>
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>

      <TouchableOpacity 
           style={styles.buttonStyle}
            onPress={() => setCurrentGroup(currentGroup === 3 ? 1 : currentGroup + 1)}>
            <Text style={styles.buttonText}>{'Continue'}</Text>
          </TouchableOpacity>
      

        {currentGroup === 1 && (
          <View style={styles.container}>
            <Text style = {styles.Text}>Enter Your Name</Text>

            <TextInput
              style={styles.input}
              placeholder="First Name Only"
              placeholderTextColor="#ffff"
              //Needs proper data imput code
              />

          </View>
        )}

        {currentGroup === 2 && (
          <View style={styles.container}>
            <Text style = {styles.Text}>Enter your favorite picture</Text>

            <TextInput
              style={styles.input}
              placeholder="Select Photo"
              placeholderTextColor="#ffff"
              //How the hell do you select and crop and save a profile pic
              //Needs proper data imput code
              />

          </View>
        )}

        {currentGroup === 3 && (
          <View style={styles.container}>
            <Text style = {styles.Text}>Tell Us About Yourself</Text>

            <TextInput
              style={styles.input}
              placeholder="Need Large text box for bio"
              placeholderTextColor="#ffff"
              //Scroll View Large Text Box
              //Needs proper data imput code
              />

          </View>
        )}

      </View>
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
  Text: {
    flex: 1,
    fontSize: 40,
    marginTop: 225,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#fff'
  },
  input: {
    flex: 0.2,
  borderWidth: 2,
  borderRadius: 25,
  borderColor: '#F8EEFE',
  marginVertical: 15,
  paddingHorizontal: 20,
  bottom:275,
  fontSize:26 ,
  color:'#fff',
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

export default ProfileScreen;