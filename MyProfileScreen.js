import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';


//Style Standardization
const purpleStandard = '#7851A9';
const darkGrayStandard = '#9e9e9e';
const lightGrayStandard = '#d3d3d3';

const fontLight = 'Montserrat-Light';
const fontRegular = 'Montserrat-Regular';
const fontMedium = 'Montserrat-Medium';
const fontSemiBold = 'Montserrat-SemiBold';
const fontBold = 'Montserrat-Bold';


const matchpic = './assets/alex.jpg';
const name = 'Alex';
const age = 19;
const yearAndMajor = 'Freshman Currently Studying CS';
const displayBio = 'Enjoyer of photography, Enjoyer of photography, punk rock (playboi carti), and rowing. My question to you: do you got that boom boom pow?'

//my hinge responses
const hingePrompt1 = 'What do you geek out on?';
const hingeAnswer1 = 'VHS/Hi8 cameras';

const hingePrompt2 = 'What\'s your most irrational fear?';
const hingeAnswer2 = 'The inevitable heat death of the universe';

const hingePrompt3 = 'What\'s your dying wish?';
const hingeAnswer3 = 'To trek through Antarctica (not joking lol)';

const hingePrompt4 = 'If I see you in the library, you\'re probably...';
const hingeAnswer4 = 'crying over CS homework';

const hingePrompt5 = 'If I find you at a party, you\'re the one...';
const hingeAnswer5 = 'who requested "Tryna Get Down" (UNRELEASED, HCQ) - Playboi Carti';

const hingePrompt6 = 'What\'s your darkest hour?';
const hingeAnswer6 = '11:59 PM';

const hingePrompt7 = 'What\'s the most british thing you do on the daily?';
const hingeAnswer7 = 'Tea time at 2am';

const hingePrompt8 = 'You\'re not like other guys because...';
const hingeAnswer8 = 'I am an enjoyer of the micro-niche music genre of breakcore';

const hingePrompt9 = 'What\'s your life motto?';
const hingeAnswer9 = 'You can take the man out of Florida, but you can never take the Florida out of the man';

const hingePrompt10 = 'Cheddar News is...';
const hingeAnswer10 = 'a reputable and prestigious news source';

// My Profile Screen
const MyProfileScreen = () => {
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
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>Hey!</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt1}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer1}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt2}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer2}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt3}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer3}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt4}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer4}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt5}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer5}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt6}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer6}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt7}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer7}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt8}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer8}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt9}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer9}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingePrompt10}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingeAnswer10}</Text>
          </View>
          <View style={{marginTop: 10}}></View>

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

  firstName: {
    flex: 1,
    fontFamily: fontLight,
    fontSize: 55,
    fontFamily: fontMedium,
    marginLeft: 10,
  },
  description: {
    fontFamily: fontRegular,
    marginLeft: 10,
    marginTop: '1%',
    fontSize: 25,
  },
  bio: {
    fontFamily: fontRegular,
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
    borderColor: purpleStandard,
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
    backgroundColor: purpleStandard,
    borderRadius: 20,
    marginTop: 2,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  hingeTextFrom: {
    fontFamily: fontRegular,
    fontSize: 20,
    color: purpleStandard,
  },
  hingeTextTo: {
    fontFamily: fontRegular,
    fontSize: 20,
    color: 'white',
  },
});

export default MyProfileScreen;