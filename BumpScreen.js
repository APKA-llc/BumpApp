import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, FlatList} from 'react-native';


//Style Standardization
const purpleStandard = '#7851A9';
const darkGrayStandard = '#9e9e9e';
const lightGrayStandard = '#d3d3d3';

const fontLight = 'Montserrat-Light';
const fontRegular = 'Montserrat-Regular';
const fontMedium = 'Montserrat-Medium';
const fontSemiBold = 'Montserrat-SemiBold';
const fontBold = 'Montserrat-Bold';

// Bump Screen
const BumpScreen = ({ navigation }) => {
  // mid end integration
  let timer = '20:00';

  const [name, setName] = useState('Alex');
  const [age, setAge] = useState('19');
  const [yearAndMajor, setYearAndMajor] = useState('Freshman Currently Studying CS');
  const [displayBio, setDisplayBio] = useState('Enjoyer of photography, punk rock (playboi carti), and rowing. My question to you: do you got that boom boom pow?');
  const [hingePrompt1, setHingePrompt1] = useState('I geek out on __');
  const [hingeAnswer1, setHingeAnswer1] = useState('Cookout lore');
  const [hingePrompt2, setHingePrompt2] = useState('My most irrational fear');
  const [hingeAnswer2, setHingeAnswer2] = useState('The inevitable heat death of the universe');
  const [hingePrompt3, setHingePrompt3] = useState('My darkest hour __');
  const [hingeAnswer3, setHingeAnswer3] = useState('11:59pm');

  // "text" conversation
  const mockConversation = [
    {
      id: 1,
      text: "Hey!",
      direction: "to",
    },
    {
      id: 2,
      text: "I am " + age + " years old and I'm a " + yearAndMajor,
      direction: "to",
    },
    {
      id: 3,
      text: "Tell me more about yourself!",
      direction: "from",
    },
    {
      id: 4,
      text: displayBio,
      direction: "to",
    },
    {
      id: 5,
      text: "Alrighty, whenever I meet someone new I like playing this game. It's like 21 questions, but better. I'll say a prompt, you respond.",
      direction: "from",
    },
    {
      id: 6,
      text: hingePrompt1,
      direction: "from",
    },
    {
      id: 7,
      text: hingeAnswer1,
      direction: "to",
    },
    {
      id: 8,
      text: hingePrompt2,
      direction: "from",
    },
    {
      id: 9,
      text: hingeAnswer2,
      direction: "to",
    },
    {
      id: 10,
      text: hingePrompt3,
      direction: "from",
    },
    {
      id: 11,
      text: hingeAnswer3,
      direction: "to",
    },
    {
      id: 12,
      text: "Let's hang out!",
      direction: "from",
    },
  ];

  // page flow
  const youveBumpedScreen = 1;
  const bumpedInfoScreen = 2;
  const [currentGroup, setCurrentGroup] = useState(youveBumpedScreen);

  const [buttonMessage, setButtonMessage] = useState("Learn More!");
  const handlePress = () => {
    if (currentGroup === youveBumpedScreen) {
      setCurrentGroup(bumpedInfoScreen);
      setButtonMessage("Back");
    } else {
      setCurrentGroup(youveBumpedScreen);
      setButtonMessage("Continue");
    }
  }

  return (
    <View style={styles.parentContainer}>

      <SafeAreaView style={styles.countdownContainer}>
        <Text style={styles.countdown}>{timer}</Text>
      </SafeAreaView>

      <View style={styles.bodyContainer}>
        {currentGroup === youveBumpedScreen && (
          <View style={styles.bumpedScreenContainer}>
            <View style={styles.profilepicContainer}>
              <Image style={styles.profilepic} source={require('./assets/alex.jpg')}/>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>You've Bumped into {name}!</Text>
            </View>
          </View>
        )}

        {currentGroup === bumpedInfoScreen && (
          <View style={styles.bioContainer}>

            <View style={styles.nameContainer}>
              <Text style={styles.firstName}>{name}</Text>
            </View>

            <FlatList
              data={mockConversation}
              renderItem={({item}) => {
                return (
                  <View style={item.direction === "to" ? styles.hingeContainerTo : styles.hingeContainerFrom}>
                    <Text style={item.direction === "to" ? styles.hingeTextTo : styles.hingeTextFrom}>{item.text}</Text>
                  </View>
                )
              }}
              style={{marginHorizontal: '0.2%'}}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />

          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
            <Text style={styles.buttonText}>{buttonMessage}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: purpleStandard,
    flex: 1,
  },
  countdownContainer: {
    backgroundColor: purpleStandard,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdown: {
    color: 'white',
    fontSize: '24%',
    fontFamily: fontMedium,
  },
  bodyContainer: {
    flex: 24,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    height: '20%',
    backgroundColor: purpleStandard,
    justifyContent: 'center',
  },
  title: {
    fontSize: '46%',
    color: 'white',
    textAlign: 'center',
    fontFamily: fontBold,
  },

  bumpedScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepicContainer: {
    width: '100%',
    aspectRatio: 4/5,
    alignItems: 'center',
  },
  profilepic: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  bioContainer: {
    height: "83%",
    width: "100%",
    backgroundColor: 'white',
  },
  nameContainer: {
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E1E1E1',
    marginBottom: '1%',
  },
  firstName: {
    flex: 1,
    fontSize: '40%',
    fontFamily: fontMedium,
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

  buttonContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    padding: '8%',
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    marginVertical: "1%",
    width: '60%',
  },
  buttonText: {
    color: purpleStandard,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontSemiBold,
  },
});

export default BumpScreen;