import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, FlatList, Keyboard, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

//Style Standardization
const purpleStandard = '#7851A9';
const darkGrayStandard = '#9e9e9e';
const lightGrayStandard = '#d3d3d3';

// page numbers
const chooseCollegePage = 1;
const inputFirstNamePage = 2;
const inputAgePage = 3;
const choosePicPage = 4;
const inputYearAndMajorPage = 5;
const inputBioPage = 6;
const chooseHingePromptsPage = 7;
const answerHingePromptsPage = 8;
const previewProfilePage = 9;
const inputPhoneNumberPage = 10;




// ====================================================================================================================================//

// placeholder data for preview profile
const college = 'Georgia Institute of Technology';
const name = 'Alex';
const age = 19;
// profilepic variable is called "image" (see code below)
const year = 'Freshman';
const major = 'Computer Science';
const displayBio = 'Enjoyer of photography, Enjoyer of photography, punk rock (playboi carti), and rowing. My question to you: do you got that boom boom pow?';

const hingePrompt1 = 'hinge1';
const hingePrompt2 = 'hinge2';
const hingePrompt3 = 'hinge3';

const hingeResponse1 = 'VHS/Hi8 cameras';
const hingeResponse2 = 'The inevitable heat death of the universe';
const hingeResponse3 = 'To trek through Antarctica (not joking lol)';

const phoneNumber = '123-456-7890';

// ====================================================================================================================================//







// list of 10 hinge prompts
const hinge = [
  {
    id: 1,
    prompt: 'Most British Thing',
    fullPrompt: 'The most british thing I do on the daily ____',
    selected: false,
  },
  {
    id: 2,
    prompt: 'I\'m a Hardcore',
    fullPrompt: 'I\'m a hardcore ____',
    selected: false,
  },
  {
    id: 3,
    prompt: 'Fan of',
    fullPrompt: 'If ____ has a million fans, I am one of them. If ____ has 10 fans, I am one of them. If ____ only has one fan, then that one fan is me.',
    selected: false,
  },
  {
    id: 4,
    prompt: 'Secret Talent',
    fullPrompt: 'My secret talent ____',
    selected: false,
  },
  {
    id: 5,
    prompt: 'Dying Wish',
    fullPrompt: 'My dying wish is ____',
    selected: false,
  },
  {
    id: 6,
    prompt: 'Most Irrational Fear',
    fullPrompt: 'My most irrational fear ____',
    selected: false,
  },
  {
    id: 7,
    prompt: 'Never-ending Nightmare',
    fullPrompt: 'The most british thing I do on the daily____',
    selected: false,
  },
  {
    id: 8,
    prompt: 'At a Party',
    fullPrompt: 'If you find me at a party, I\'m the one ____',
    selected: false,
  },
  {
    id: 9,
    prompt: 'Geek Out',
    fullPrompt: 'I geek out on ____',
    selected: false,
  },
  {
    id: 10,
    prompt: 'Cheddar News',
    fullPrompt: 'Cheddar News is ____',
    selected: false,
  },
];

// Profile Screen
const ProfileScreen = () => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const navigation = useNavigation();
  //const [profilePic, setProfilePic] = useState(defaultProfilePic);

  // display hinge question selection & full prompt
  const [numSelected, setNumSelected] = useState(0);
  const [currentFullPrompt, setCurrentFullPrompt] = useState('Please Select a Prompt');

  // hides keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // image picker
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // form is complete if currentGroup is 7 (we are on the 7th page)
  const formComplete = () => {
    if (currentGroup === inputPhoneNumberPage) {
      navigation.navigate('HomeScreen');
    } else {
      setCurrentGroup(currentGroup + 1);
    }
  };

  // if going "Back" from the first page, then go to the OpeningScreen
  const formEscape = () => {
    if (currentGroup === chooseCollegePage) {
      navigation.navigate('OpeningScreen');
    } else {
      setCurrentGroup(currentGroup - 1);
    }
  };

  // update continue/back button messages
  let messageTop;
  let messageBottom;
  if (currentGroup === previewProfilePage) {
    messageTop = 'Finalize';
    messageBottom = 'Revise';
  } else if (currentGroup === inputPhoneNumberPage) {
    messageTop = 'Finalize';
  } else {
    messageTop = 'Continue';
    messageBottom = 'Back';
  }

  // updates FlatList when a prompt is selected
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOptionPress = (item) => {
    setSelectedItems((selectedItems) => {
      if (selectedItems.find((selectedItem) => selectedItem.id === item.id)) { // check whether the tapped item is already selected
        setNumSelected(numSelected - 1);
        if (numSelected === 0) {
          setCurrentFullPrompt('Please Select a Prompt');
        }
        return selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      }
      // if the tapped item is not selected
      if (numSelected < 3) { // if the limit has not been reached, then select the tapped item
        setNumSelected(numSelected + 1);
        setCurrentFullPrompt(item.fullPrompt);
        return [...selectedItems, item];
      }
      // the limit has been reached, so nothing should be done
      return selectedItems;
    });
  };
  const isItemSelected = (item) => {
    return selectedItems.find((selectedItem) => selectedItem.id === item.id);
  };

  // records the hinge response (INCOMPLETE)
  // const [hingeResponse1, setHingeResponse1] = useState('');
  // const [hingeResponse2, setHingeResponse2] = useState('');
  // const [hingeResponse3, setHingeResponse3] = useState('');

  const yearAndMajor = year + " Currently Studying " + major;

  // check if the user can continue to the next page
  const canContinue = () => {
    if (currentGroup === chooseHingePromptsPage) {
      return numSelected === 3;
    }
    // add more conditions for the other pages here (to be discussed)
    return true;
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>

        {currentGroup === chooseCollegePage && ( // choose college
            <View style = {styles.vanish}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Select Your College</Text>
              </View>

              <View style={styles.inputContainer}>
                
                <TextInput
                  style={styles.input}
                  placeholder="This will be a dropdown soon"
                  // TODO: Add proper data input code
                />
              </View>
            </View>
          )}

          {currentGroup === inputFirstNamePage && ( // enter first name
            <View style = {styles.vanish}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter Your Name</Text>
              </View>

              <View style={styles.inputContainer}>
                
                <TextInput
                  style={styles.input}
                  placeholder="First Name Only"
                  // TODO: Add proper data input code
                />
              </View>
            </View>
          )}

          {currentGroup === inputAgePage && ( // choose age
            <View style = {styles.vanish}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>What is your age?</Text>
              </View>

              <View style={styles.inputContainer}>
                
                <TextInput
                  style={styles.input}
                  placeholder="Years Old"
                  
                  // TODO: Add proper data input code
                />
             </View>
            </View>
          )}

          {currentGroup === choosePicPage && ( // pick profile pic
           <View style = {styles.vanish}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Choose a photo</Text>
            </View>

            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.choosePhoto} onPress={pickImage}>
                <Text style={styles.buttonText}>Select a Photo</Text>
              </TouchableOpacity>

              {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
            </View>

          </View>
          )}

          {currentGroup === inputYearAndMajorPage && ( // input year and major
            <View style = {styles.vanish}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter Your Year in College</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Freshman"
                  // TODO: Add proper data input code
                />
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.title}>Enter Your Major</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Computer Science"
                  // TODO: Add proper data input code
                />
              </View>
            </View>
          )}

          {currentGroup === inputBioPage && ( // write your introduction/bio
           <View style = {styles.vanish}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.titleContainer}>
              <Text style={styles.title}>Introduce Yourself</Text>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.inputContainer}>
                
              <TextInput
                style={styles.bioInput}
                multiline
                numberOfLines={5}
                placeholder="Write Your Bio"
              />
            </View>
          </View>
          )}

          {currentGroup === chooseHingePromptsPage && ( // choose hinge questions
            <View style = {styles.hingePromptPageContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose Prompts</Text>
              </View>

              <View style={styles.promptView}>
                <FlatList
                  data={hinge}
                  renderItem={({item}) => {
                    const isSelected = isItemSelected(item);
                    return (
                      <TouchableOpacity
                        style={[
                          styles.promptContainer,
                          {backgroundColor: isSelected ? purpleStandard : 'white'},
                        ]}
                        onPress={() => handleOptionPress(item)}
                      >
                        <Text style={[styles.hingeQuestion, {color: isSelected ? 'white' : purpleStandard}]}>
                          {item.prompt}
                        </Text>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          )}

          {currentGroup === answerHingePromptsPage && ( // write hinge responses
           <View style = {styles.hingePromptPageContainer}>
              <View style={styles.titleContainer}>
              <Text style={styles.title}>Answer Prompts</Text>
              </View>

            <View style={styles.answersView}>
              <FlatList
                data={selectedItems}
                renderItem={({item}) => {
                  return (
                    <View style={styles.answerPromptContainer}>
                      <Text style={[styles.hingePrompt, styles.hingeQuestion]}>{item.fullPrompt}</Text>
                      <TextInput style={styles.hingeInput}/>
                    </View>
                  )
                }}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                />
            </View>
          </View>
          )}

          {currentGroup === previewProfilePage && ( // preview profile --- copy of MyProfileScreen
          <View style = {styles.previewProfileContainer}>
              <View style={styles.previewScrollContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>

                  <View style={styles.profilepiccontainer}>
                    <Image style={styles.profilepic} source={{uri: image}}/>
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
                        <Text style={styles.hingeTextTo}>{selectedItems[0].fullPrompt}</Text>
                      </View>
                      <View style={{marginTop: 10}}></View>
                      <View style={styles.hingeContainerFrom}>
                        <Text style={styles.hingeTextFrom}>{hingeResponse1}</Text>
                      </View>
                      <View style={{marginTop: 10}}></View>

                      <View style={styles.hingeContainerTo}>
                        <Text style={styles.hingeTextTo}>{selectedItems[1].fullPrompt}</Text>
                      </View>
                      <View style={{marginTop: 10}}></View>
                      <View style={styles.hingeContainerFrom}>
                        <Text style={styles.hingeTextFrom}>{hingeResponse2}</Text>
                      </View>
                      <View style={{marginTop: 10}}></View>

                      <View style={styles.hingeContainerTo}>
                        <Text style={styles.hingeTextTo}>{selectedItems[2].fullPrompt}</Text>
                      </View>
                      <View style={{marginTop: 10}}></View>
                      <View style={styles.hingeContainerFrom}>
                        <Text style={styles.hingeTextFrom}>{hingeResponse3}</Text>
                      </View>
                      <View style={{marginTop: 10}}></View>

                    </View>
                  </View>
                </ScrollView>
              </View>
          </View>
          )}

          {currentGroup === inputPhoneNumberPage && ( // input phone number
            <View style = {styles.vanish}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Please Enter Your Phone Number</Text>
              </View>

              <View style={styles.inputContainer}>
                
                <TextInput
                  style={styles.input}
                  placeholder="***-***-***"
                  // TODO: Add proper data input code
                />
              </View>
            </View>
          )}

          <View style = {[styles.buttonContainer, {flex: currentGroup === chooseHingePromptsPage ? 3 : 1}]}>
            {currentGroup === chooseHingePromptsPage && (
              <View style={styles.promptCard}>
                <Text style={styles.fullPromptSubtitle}>Full Prompt</Text>
                <View style={styles.fullPromptContainer}>
                  <Text adjustsFontSizeToFit style={styles.fullPromptText}>{currentFullPrompt}</Text>
                </View>
                <Text style={styles.promptSelection}>{numSelected}/3 SELECTED</Text>
              </View>
            )}
            {currentGroup === previewProfilePage &&(
              <View style={styles.previewHeadingContainer}>
                <Text style={styles.previewHeading}>Scroll to Preview Profile</Text>
              </View>
            )}
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {backgroundColor: currentGroup === chooseHingePromptsPage && numSelected < 3 ? lightGrayStandard : purpleStandard},
              ]}
              onPress={formComplete}
              disabled={currentGroup === chooseHingePromptsPage && numSelected < 3}
            >
              <Text style={styles.buttonText}>{messageTop}</Text>
            </TouchableOpacity>
            {currentGroup !== inputPhoneNumberPage && (
              <TouchableOpacity style={styles.buttonStyle} onPress={formEscape}>
                <Text style={styles.buttonText}>{messageBottom}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
 
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  vanish:{
    flex: 3
  },
  titleContainer:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontSize: '45%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: purpleStandard,
    marginBottom: '5%'
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '5%'
  },
  input: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: purpleStandard,
    alignContent: 'center',
    fontSize: "20%",
    padding: '5%',
    paddingHorizontal: '8%',
    
  },
  bioInput: {
    height: "80%",
    width: "80%",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: purpleStandard,
    fontSize: 16,
    textAlignVertical: 'top',
  },

  buttonContainer:{
    justifyContent: "flex-end",
  },
  buttonStyle:{
    backgroundColor: purpleStandard,
    borderRadius: 25,
    padding: 10,
    marginVertical:"1%"
  },
  buttonText:{
    color: "white",
    fontWeight:'bold', 
    fontSize:20,
    textAlign:'center'
  },
  choosePhoto:{
    backgroundColor: purpleStandard,
    borderRadius: 25,
    padding: 15,
    marginVertical:"1%"
  },
  hingeQuestion:{
    fontSize:'18%',
    fontWeight: '500',
  },
  promptContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 12,
    borderWidth: 3,
    borderColor: purpleStandard,
    borderRadius: '24%',
    marginBottom: '8.25%',
  },
  hingePrompt: {
    textAlign: 'center',
    marginBottom: '5%',
  },
  hingeInput:{
    borderWidth: 2,
    borderRadius: 25,
    borderColor: purpleStandard,
    alignContent:'center',
    fontSize: "20%",
    padding:'2%',
    width:'50%',
    marginBottom:"5%"
  },

  hingePromptPageContainer: {
    flex: 5,
    alignItems: 'center',
  },
  promptView: {
    flex: 5,
    width: '90%',
  },
  answersView: {
    flex: 6,
    width: '90%',
    alignItems: 'center',
    marginTop: '20%',
  },
  answerPromptContainer: {
    alignItems: 'center',
    marginVertical: '4%',
  },

  promptCard: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderTopColor: purpleStandard,
    borderTopWidth: 2,
  },
  fullPromptSubtitle: {
    flex: 1,
    color: darkGrayStandard,
    marginTop: '2%',
  },
  fullPromptContainer: {
    flex: 4,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: darkGrayStandard,
    width: '96%',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullPromptText: {
    color: purpleStandard,
    fontSize: 18,
    fontWeight: '700',
  },
  promptSelection: {
    flex: 1,
    color: darkGrayStandard,
    fontWeight: '700',
    fontSize: '16%',
    marginTop: '2%',
  },
  imageStyle: {
    aspectRatio: 4/5,
    height: '80%',
    marginTop: '8%'
  },





  previewHeadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2%',
  },
  previewHeading: {
    textAlign: 'center',
    fontSize: '14%',
    color: darkGrayStandard,
  },
  previewProfileContainer: {
    flex: 5,
  },
  previewScrollContainer: {
    flex: 7,
  },
  profilepiccontainer: {
    flex: 1,
    alignItems: 'center',
  },
  profilepic: {
    width: '100%',
    aspectRatio: 4/5,
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
    fontFamily: 'Arial',
    fontSize: 20,
    color: purpleStandard,
  },
  hingeTextTo: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'white',
  },
});

export default ProfileScreen;