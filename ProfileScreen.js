//Jacob
import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



// Profile Screen
const ProfileScreen = ({ navigation }) => {
  const [currentGroup, setCurrentGroup] = useState(1);

  return (
  <LinearGradient colors={['#C44EEE','#562574']} style={{flex:1}}>
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>

      
  
        {currentGroup === 1 && (
          <View style={styles.inputContainer}>
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
          <View style={styles.inputContainer}>
            <Text style = {styles.Text}>Choose a photo</Text>

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
              <View style={styles.inputContainer}>
            
                  <Text style = {styles.Text}>Introduce Yourself</Text>
              
                  <TextInput
                    style={styles.input}
                    placeholder="Type Here"
                    placeholderTextColor="#ffff"
                    
                    //Needs proper data imput code
                    />
              </View>
        )}
      
      {/* Currently set as an infinite loop */}
          <TouchableOpacity 
           style={styles.buttonStyle}
            onPress={() => setCurrentGroup(currentGroup === 3 ? 1 : currentGroup + 1)}>
            <Text style={styles.buttonText}>{'Continue'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
           style={styles.buttonStyle}
            onPress={() => setCurrentGroup(currentGroup === 1 ? 3 : currentGroup - 1)}>
            <Text style={styles.buttonText}>{'Return'}</Text>
          </TouchableOpacity>

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
  inputContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    marginTop: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#F8EEFE',
    padding: 25,
    paddingHorizontal: 50,
    alignContent:'left',
    fontSize: 26,
    color: '#fff',
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