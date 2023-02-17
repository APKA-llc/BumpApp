//Krish
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



// Bump Screen
const BumpScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.titlecontainer}>
        <Text style={styles.title}>You've Bumped!</Text>
      </View>

      <View style={styles.profilepiccontainer}>

        <Image style={styles.profilepic} source={require('./assets/alex.jpg')}/>

        <View style={styles.namecontainer}>
          <Text style={styles.name}>Alex</Text>
        </View>

      </View>

      <View style={styles.biocontainer}>

        <Text style={styles.bio}>Enjoyer of photography, punk rock (playboi carti), and rowing. My question to you: do you got that boom boom pow?</Text>

        <Text style={styles.bioprompt}>I geek out on</Text>

        <Text style={styles.bioresponse}>Cookout lore.</Text>

        <Text style={styles.bioprompt}>My most irrational fear</Text>

        <Text style={styles.bioresponse}>The inevitable heat death of the universe</Text>

      </View>
      
    </SafeAreaView>
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    flex: 1,
  },
  titlecontainer: {
    width: '100%',
    flex: 2,
    backgroundColor: 'purple',
    justifyContent: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Baskerville',
  },

  profilepiccontainer: {
    width: '100%',
    flex: 11,
    alignItems: 'center',
  },
  profilepic: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  namecontainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingRight: 26,
    paddingLeft: 12,
    paddingVertical: 8,
    backgroundColor: 'purple',
    borderTopRightRadius: '100%',
  },
  name: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Baskerville',
  },

  biocontainer: {
    flex: 5,
    padding: '3%',
    backgroundColor: 'white',
    borderColor: 'purple',
    borderWidth: 3,
  },
  bio: {
    fontSize: 22,
    fontFamily: 'Baskerville',
  },
  bioresponse: {
    marginTop: '1%',
    fontSize: 18,
    fontFamily: 'Baskerville',
  },
  bioprompt: {
    fontWeight: 'bold',
    marginTop: '5%',
    fontSize: 20,
    fontFamily: 'Baskerville',
  }
});

export default BumpScreen;