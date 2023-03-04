import React, { useState, useCallback } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList} from 'react-native';
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

  // "text" conversation
  const mockConversation = [
    {
      id: 100,
      text: "Introductions",
      direction: "subheading",
    },
    {
      id: 1,
      text: "Hey!",
      direction: "from",
    },
    {
      id: 2,
      text: "I am " + age + " years old and I'm a " + yearAndMajor,
      direction: "from",
    },
    {
      id: 3,
      text: "Tell me more about yourself!",
      direction: "to",
    },
    {
      id: 4,
      text: displayBio,
      direction: "from",
    },
    {
      id: 200,
      text: "Prompt Time",
      direction: "subheading",
    },
    {
      id: 6,
      text: hingePrompt1,
      direction: "to",
    },
    {
      id: 7,
      text: hingeAnswer1,
      direction: "from",
    },
    {
      id: 8,
      text: hingePrompt2,
      direction: "to",
    },
    {
      id: 9,
      text: hingeAnswer2,
      direction: "from",
    },
    {
      id: 10,
      text: hingePrompt3,
      direction: "to",
    },
    {
      id: 11,
      text: hingeAnswer3,
      direction: "from",
    },
    {
      id: 12,
      text: hingePrompt4,
      direction: "to",
    },
    {
      id: 13,
      text: hingeAnswer4,
      direction: "from",
    },
    {
      id: 14,
      text: hingePrompt5,
      direction: "to",
    },
    {
      id: 15,
      text: hingeAnswer5,
      direction: "from",
    },
    {
      id: 16,
      text: hingePrompt6,
      direction: "to",
    },
    {
      id: 17,
      text: hingeAnswer6,
      direction: "from",
    },
    {
      id: 18,
      text: hingePrompt7,
      direction: "to",
    },
    {
      id: 19,
      text: hingeAnswer7,
      direction: "from",
    },
    {
      id: 20,
      text: hingePrompt8,
      direction: "to",
    },
    {
      id: 21,
      text: hingeAnswer8,
      direction: "from",
    },
    {
      id: 22,
      text: hingePrompt9,
      direction: "to",
    },
    {
      id: 23,
      text: hingeAnswer9,
      direction: "from",
    },
    {
      id: 24,
      text: hingePrompt10,
      direction: "to",
    },
    {
      id: 25,
      text: hingeAnswer10,
      direction: "from",
    },
  ];

  return (
    <ScrollView style={styles.parentcontainer}>

      <View style={styles.profilepiccontainer}>
        <Image style={styles.profilepic} source={require(matchpic)}/>
      </View>

      <View style={styles.bottomHalf}>

        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{name}</Text>
        </View>

        <FlatList
          data={mockConversation}
          renderItem={({item}) => {
            return (
              <View style={item.direction === "to" ? styles.hingeContainerTo : item.direction === "from" ? styles.hingeContainerFrom : styles.hingeContainerSubheading}>
                <Text style={item.direction === "to" ? styles.hingeTextTo : item.direction === "from" ? styles.hingeTextFrom : styles.hingeTextSubheading}>{item.text}</Text>
              </View>
            )
          }}
          style={{marginHorizontal: '0.2%', paddingHorizontal: '1%'}}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />

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
    backgroundColor:'white'
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
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1%',
    backgroundColor: '#E1E1E1',
    paddingVertical: '2%',
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
    fontSize: '35%',
    fontFamily: fontBold,
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
    marginBottom: "2%",
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
    marginBottom: "2%",
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
  hingeContainerSubheading: {
    alignItems: 'center',
    paddingTop: '1%',
    paddingBottom: '1%',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 2,
    alignSelf: 'center',
    maxWidth: '80%',
    marginBottom: "2%",
  },
  hingeTextSubheading: {
    fontFamily: fontSemiBold,
    fontSize: 13,
    color: darkGrayStandard,
  },
});

export default MyProfileScreen;