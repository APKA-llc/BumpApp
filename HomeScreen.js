//mingkuan
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



// Home Screen
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
  <LinearGradient colors={['#2e3262','#2e3262']} style={{flex:1}}>
    <SafeAreaView style={styles.container}>

      <View style={styles.firstnamecontainer}>
        <Text style={styles.firstname}>Krish</Text>
      </View>

      <Image style={styles.profilepic} source={require('./assets/matchprofilepic.jpg')}/>

      <View style={styles.bio}>

        <Text style={styles.subtitle}>Who is Krish?</Text>

        <Text style={styles.intro}>Sophmore Currently Studying Med</Text>

        <Text style={styles.hobbies}>I like art, pizza , and animals . Im looking forward to making friends I can nerd out and relax with.</Text>

      </View>

      <View style={styles.swipebuttons}>
        <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
          <Image style={styles.reject} source={require('./assets/xmark.webp')}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
          <Image style={styles.accept} source={require('./assets/checkmark.webp')}/>
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
    alignItems: 'center',
    padding: 20,
  },
  firstnamecontainer: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-end',
  },
  firstname: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    fontSize: 36,
    textAlign: 'left'
  },
  profilepic: {
    marginTop: 12,
    flex: 5,
    width: '80%',
  },

  bio: {
    marginTop: 36,
    flex: 3,
    width: '80%',
  },
  subtitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  intro: {
    marginLeft: 14,
    marginTop: 10,
    color: 'white',
    fontSize: 22,
  },
  hobbies: {
    marginLeft: 14,
    marginTop: 14,
    color: 'white',
    fontSize: 22,
  },

  swipebuttons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    alignItems: 'center',
  },
  reject: {
    width: 86,
    height: 86
  },
  accept: {
    width: 86,
    height: 86
  },
});

export default HomeScreen;