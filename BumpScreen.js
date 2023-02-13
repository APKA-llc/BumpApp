//Krish
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



// Bump Screen
const BumpScreen = ({ navigation }) => {

  return (
  <LinearGradient colors={['#C44EEE','#562574']} style={{flex:1}}>
    <SafeAreaView style={styles.container}>

      <View style={styles.profilepiccontainer}>

        <Image style={styles.profilepic} source={require('./assets/alex.jpg')}/>

        <View style={styles.titlecontainer}>
          <Text style={styles.title}>You've Bumped!</Text>
        </View>

        <View style={styles.namecontainer}>
          <Text style={styles.name}>Alex</Text>
        </View>

      </View>

      <View style={styles.biocontainer}>

        <Text style={styles.bio}>Enjoyer of photography, punk rock (playboy carti), and rowing. My question to you: do you got that boom boom pow?</Text>

        <Text style={styles.bioprompt}>I geek out on</Text>

        <Text style={styles.bioresponse}>Cookout lore.</Text>

        <Text style={styles.bioprompt}>My most irrational fear</Text>

        <Text style={styles.bioresponse}>The inevitable heat death of the universe</Text>

      </View>
      
    </SafeAreaView>
  </LinearGradient>
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    padding: 20,
  },
  profilepiccontainer: {
    width: '100%',
    flex: 5,
    alignItems: 'center',
  },
  profilepic: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  titlecontainer: {
    position: 'absolute',
    width: '80%',
    marginTop: '3%',
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fd4d4d',
    textAlign: 'center',
  },
  namecontainer: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  name: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  biocontainer: {
    flex: 2,
    padding: '3%',
  },

  bio: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 20,
  },
  bioresponse: {
    marginTop: '1%',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 16,
  },
  bioprompt: {
    marginTop: '5%',
    color: 'white',
    fontSize: 18,
  }
});

export default BumpScreen;