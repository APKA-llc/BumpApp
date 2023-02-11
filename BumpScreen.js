//Krish
import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



// Bump Screen
const BumpScreen = ({ navigation }) => {

  return (
  <LinearGradient colors={['#C44EEE','#562574']} style={{flex:1}}>
    <SafeAreaView style={styles.container}>
  
        <View style={styles.container}>

          <Text>Code Goes Here</Text>
          <Image style={styles.logoStyle} source={require('./assets/bumplogo.png')}/>
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
});

export default BumpScreen;