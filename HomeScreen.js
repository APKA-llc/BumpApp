import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const matchpic = './assets/matchprofilepic.jpg';
const name = 'Krish';
const age = 18;
const yearAndMajor = 'Freshman Currently Studying CS';
const displayBio = 'I like rizzing, touching grass, and Crosland. I\'m looking forward to making friends I can nerd out and relax with.'

const hingePrompt1 = 'You get too political when...';
const hingeAnswer1 = 'arguing why Nav is the best dining hall';
const hingePrompt2 = 'Defund...';
const hingeAnswer2 = 'big daata';

// Home Screen
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.parentcontainer}>

      <View style={styles.profilepiccontainer}>
        <Image style={styles.profilepic} source={require(matchpic)}/>
      </View>

      <View style={styles.bottomHalf}>

        <View style={styles.one}>
          <Text style={styles.firstName}>{name}, {age}</Text>
        </View>

        <View style={styles.two}>
          <Text style={styles.description}>{yearAndMajor}</Text>
          <Text style={styles.bio}> </Text>
          <Text style={styles.bio}>{displayBio}</Text>
        </View>
        <View style={styles.three}>
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>Hey!</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>Tell me about yourself!</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingePrompt1}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingeAnswer1}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingePrompt2}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingeAnswer2}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>Nice to meet you! Do you want to hang out?</Text>
          </View>
        </View>
        
        <View style={styles.four}>
          <View style={styles.swipebuttons}>
            <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
              <Image style={styles.reject} source={require('./assets/xmark.webp')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
              <Image style={styles.accept} source={require('./assets/checkmark.webp')}/>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

const win = Dimensions.get('window');

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
    width: '100%',
  },
  profilepiccontainer: {
    flex: 1,
    alignItems: 'center',
  },
  profilepic: {
    width: '100%',
    height: win.height*(9/16),
  },

  bottomHalf: {
    flex: 1,
  },
  one: {
    justifyContent: 'center',
  },
  two: {
    flexDirection: 'column',
    padding: 10,
  },
  three: {
    padding: 10,
    marginBottom: 24,
  },
  four: {
    alignItems: 'center',
    marginBottom: 24,
  },

  swipebuttons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  reject: {
    width: 86,
    height: 88
  },
  accept: {
    width: 86,
    height: 88,
  },

  firstName: {
    flex: 1,
    fontFamily: 'Baskerville',
    fontSize: 55,
    fontWeight: '400',
    marginLeft: 10,
  },
  description: {
    fontFamily: 'Baskerville',
    marginLeft: 10,
    marginTop: '1%',
    fontSize: 25,
  },
  bio: {
    fontFamily: 'Baskerville',
    marginLeft: 10,
    fontSize: 25,
  },
  hingeContainerFrom: {
    alignItems: 'flex-end',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 20,
    marginTop: 2,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  hingeContainerTo: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "purple",
    borderRadius: 20,
    marginTop: 2,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  hingeTextFrom: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'purple',
  },
  hingeTextTo: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'white',
  },
});

export default HomeScreen;