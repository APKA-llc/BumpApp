import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, FlatList, Keyboard, TouchableWithoutFeedback, Dimensions, KeyboardAvoidingView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { createUserWithEmailAndPassword, getAuth, user, getIdToken} from "firebase/auth";
import {auth, firestore, storage} from "./firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import MainHub from './MainHub';
import OpeningScreen from './OpeningScreen';
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, getMetadata, uploadBytes, putFile} from "firebase/storage";
import SelectDropdown from 'react-native-select-dropdown';


//Style Standardization
const purpleStandard = '#7851A9';
const darkGrayStandard = '#9e9e9e';
const lightGrayStandard = '#d3d3d3';

const fontLight = 'Montserrat-Light';
const fontRegular = 'Montserrat-Regular';
const fontMedium = 'Montserrat-Medium';
const fontSemiBold = 'Montserrat-SemiBold';
const fontBold = 'Montserrat-Bold';


// page numbers
const chooseCollegePage = 0;
const emailVerificationPage = 1;
const inputFirstNamePage = 2;
const inputAgePage = 3;
const choosePicPage = 4;
const inputYearAndMajorPage = 5;
const inputBioPage = 6;
const chooseHingePromptsPage = 7;
const answerHingePromptsPage = 8;
const previewProfilePage = 9;
const inputPhoneNumberPage = 10;


// list of 10 hinge prompts
const hinge = [
  {
    id: 1,
    prompt: 'Most British Thing',
    fullPrompt: 'The most british thing I do on the daily ____',
    selected: false,
    answer: '',
  },
  {
    id: 2,
    prompt: 'I\'m a Hardcore',
    fullPrompt: 'I\'m a hardcore ____',
    selected: false,
    answer: '',
  },
  {
    id: 3,
    prompt: 'Fan of',
    fullPrompt: 'If ____ has a million fans, I am one of them. If ____ has 10 fans, I am one of them. If ____ only has one fan, then that one fan is me.',
    selected: false,
    answer: '',
  },
  {
    id: 4,
    prompt: 'Secret Talent',
    fullPrompt: 'My secret talent ____',
    selected: false,
    answer: '',
  },
  {
    id: 5,
    prompt: 'Dying Wish',
    fullPrompt: 'My dying wish is ____',
    selected: false,
    answer: '',
  },
  {
    id: 6,
    prompt: 'Most Irrational Fear',
    fullPrompt: 'My most irrational fear ____',
    selected: false,
    answer: '',
  },
  {
    id: 7,
    prompt: 'Never-ending Nightmare',
    fullPrompt: 'My never-ending nightmare ____',
    selected: false,
    answer: '',
  },
  {
    id: 8,
    prompt: 'At a Party',
    fullPrompt: 'If you find me at a party, I\'m the one ____',
    selected: false,
    answer: '',
  },
  {
    id: 9,
    prompt: 'Geek Out',
    fullPrompt: 'I geek out on ____',
    selected: false,
    answer: '',
  },
  {
    id: 10,
    prompt: 'Cheddar News',
    fullPrompt: 'Cheddar News is ____',
    selected: false,
    answer: '',
  },
];

// colleges that offer Bump (just GT for now)
const collegesThatBump = ["Georgia Tech"];

// Profile Screen
const ProfileScreen = () => {
  // page flow ---- check if the user can continue to the next page

  const [college, setCollege] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [year, setYear] = useState(null);
  const [major, setMajor] = useState(null);
  const [displayBio, setDisplayBio] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [image, setImage] = useState(null);

  async function createNewUser() {
    var firestoreDone, storageDone = false;
    const db = firestore;
    const rawUser = await AsyncStorage.getItem('user');
    const userCred = JSON.parse(rawUser);
    const userEmail = userCred.email;
    const userId = userCred.uid;
    //console.log(userEmail);
    const userRef = doc(db, "users", userId.toString());
    setDoc(userRef, {
      id: userId,
      name: name,
      age: age,
      year: year,
      major: major,
      displayBio: displayBio,
      // Array called QA with 3 'hingePrompt - hingeResponse' strings concatenated
      QA: [selectedItems[0].fullPrompt + '-' + selectedItems[0].answer, selectedItems[1].fullPrompt + '-' + selectedItems[1].answer, selectedItems[2].fullPrompt + '-' + selectedItems[2].answer],
      phoneNumber: phoneNumber,
      email: userEmail
    })
    .then(() => {
      console.log("Document written with ID: ", userId);
      firestoreDone = true;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });


    //Upload the users profile picture to firebase storage in the users folder with the image name being the users id. use the image variable to get the image
    const storageRef = ref(storage, 'users/');
    const imageRef = ref(storageRef, userId.toString() + '.jpg');
    const response = await fetch(image);
    const blob = await response.blob();
    uploadBytes(imageRef, blob)
    .then((snapshot) => {
      console.log('Uploaded file!');
      storageDone = true;
    })
    .catch((error) => {
      console.error("Error uploading: ", error);
    });
    
  }

  // email verification process
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveUser = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log(user)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignUp = () => {
    // Perform login logic here, such as sending a request to a server
    //console.log(`Username: ${username}, Password: ${password}`);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      saveUser(userCred.user);
      console.log('signed up');
      formComplete();
    })
    .catch((error) => {
      const { code, message } = error;
      var errorMessage;
      
      switch (code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "Email address not found.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is weak. Enter at least 6 characters.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "An account with this email already exists.";
          break;
        default:
          errorMessage = code;
          break;
      }
      
      Alert.alert('Error', errorMessage, [{ text: 'Try Again' }]);
      //setShowErrorDialog(true);

      console.log(errorMessage);
    });

  };

  const handleDismiss = () => Keyboard.dismiss();


  const [currentGroup, setCurrentGroup] = useState(0);
  const navigation = useNavigation();
  //const [profilePic, setProfilePic] = useState(defaultProfilePic);

  // display hinge question selection & full prompt
  const [numSelected, setNumSelected] = useState(0);
  const [currentFullPrompt, setCurrentFullPrompt] = useState('Please Select a Prompt');

  // hides keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // image picker with expo (old)
  
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

  // image picker with react native (new) - will need to use when transfering

  /*const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 600,
        maxWidth: 800,
        quality: 1,
      },
      (response) => {
        if (!response.didCancel && !response.error) {
          setImage(response.uri);
        }
      }
    );
  };*/

  // form is complete if currentGroup is 7 (we are on the 7th page)
  const formComplete = async () => {
    if (currentGroup === inputPhoneNumberPage) {
      if(phoneNumber == null || !(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNumber))) {
        Alert.alert('Error', 'Please enter a valid phone number.', [{ text: 'Try Again' }]);
        return;
      }

      const seenProfiles = [];
      const likedProfiles = [];
      try {
        await AsyncStorage.setItem('seenProfiles', JSON.stringify(seenProfiles));
        await AsyncStorage.setItem('likedProfiles', JSON.stringify(likedProfiles));
        await AsyncStorage.setItem('userNotReady', JSON.stringify(true));
      } catch (error) {
        console.log(error);
      }

      await createNewUser();
      navigation.navigate(MainHub);
      
    } else {
      if (currentGroup === chooseCollegePage) {
        if (college === null) {
          Alert.alert('Error', 'Please select your college.', [{ text: 'Try Again' }]);
          return;
        }
      }
      if(currentGroup === inputFirstNamePage){
        if(name == null || name == '') {
          Alert.alert('Error', 'Please enter your name.', [{ text: 'Try Again' }]);
          return;
        }
      }
      else if(currentGroup === inputAgePage){
        if(age == null || age == '') {
          Alert.alert('Error', 'Please enter your age.', [{ text: 'Try Again' }]);
          return;
        }

        // make sure the age is above 17
        if(age < 17) {
          Alert.alert('Error', 'You must be at least 17 years old to use this app.', [{ text: 'Try Again' }]);
          return;
        }
        // make sure the age is valid
        if(age > 100 || age % 1 != 0) {
          Alert.alert('Error', 'Please enter a valid age.', [{ text: 'Try Again' }]);
          return;
        }
      }
      else if(currentGroup === inputYearAndMajorPage){
        if(year == null || year == '') {
          Alert.alert('Error', 'Please enter your year.', [{ text: 'Try Again' }]);
          return;
        }
        if(major == null || major == '') {
          Alert.alert('Error', 'Please enter your major.', [{ text: 'Try Again' }]);
          return;
        }
      }
      else if(currentGroup === inputBioPage){
        if(displayBio == null || displayBio == '') {
          Alert.alert('Error', 'Please enter your bio.', [{ text: 'Try Again' }]);
          return;
        }
        // if the bio is less than 100 characters say its too short
        if(displayBio.length < 100) {
          Alert.alert('Error', 'Bio is too short. Please enter a bio that is more than 100 characters.', [{ text: 'Try Again' }]);
          return;
        }
        // if the bio is more than 150 characters say its too long
        if(displayBio.length > 150) {
          Alert.alert('Error', 'Bio is too long. Please enter a bio that is less than 150 characters.', [{ text: 'Try Again' }]);
          return;
        }
      }
      else if(currentGroup === answerHingePromptsPage){
        if(selectedItems[0].answer == null || selectedItems[0].answer == '') {
          Alert.alert('Error', 'Please enter your answer for the first prompt.', [{ text: 'Try Again' }]);
          return;
        }
        if(selectedItems[1].answer == null || selectedItems[1].answer == '') {
          Alert.alert('Error', 'Please enter your answer for the second prompt.', [{ text: 'Try Again' }]);
          return;
        }
        if(selectedItems[2].answer == null || selectedItems[2].answer == '') {
          Alert.alert('Error', 'Please enter your answer for the third prompt.', [{ text: 'Try Again' }]);
          return;
        }
      }
      
      setCurrentGroup(currentGroup + 1);
      
      
    }
  };

  // if going "Back" from the first page, then go to the OpeningScreen
  const formEscape = () => {
    if (currentGroup === chooseCollegePage) {
      navigation.navigate(OpeningScreen);
    } else {
      setCurrentGroup(currentGroup - 1);
    }
  };

  // update continue/back button messages
  let messageTop;
  let messageBottom = 'Back';
  if (currentGroup === previewProfilePage) {
    messageTop = 'Finalize';
  } else if (currentGroup === inputPhoneNumberPage) {
    messageTop = 'Finish';
  } else {
    messageTop = 'Continue';
  }

  // an array containing the hinge prompts the user selects
  const [selectedItems, setSelectedItems] = useState([]);

  const handleInputChange = (id, text) => {
    setSelectedItems(prevSelectedItems => {
      const updatedSelectedItems = prevSelectedItems.map(item => {
        if (item.id === id) {
          return {...item, answer: text}
        }
        return item;
      });
      return updatedSelectedItems;
    });
  };

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

  const yearAndMajor = year + " Currently Studying " + major;
  const [numCharactersBio, setNumCharactersBio] = useState(0);

  // "text" conversation
  const mockConversation = currentGroup === previewProfilePage ? [
    {
      id: 100,
      text: "Introductions",
      direction: "subheading",
    },
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
      id: 200,
      text: "Prompt Time",
      direction: "subheading",
    },
    {
      id: 6,
      text: selectedItems[0].fullPrompt,
      direction: "from",
    },
    {
      id: 7,
      text: selectedItems[0].answer,
      direction: "to",
    },
    {
      id: 8,
      text: selectedItems[1].fullPrompt,
      direction: "from",
    },
    {
      id: 9,
      text: selectedItems[1].answer,
      direction: "to",
    },
    {
      id: 10,
      text: selectedItems[2].fullPrompt,
      direction: "from",
    },
    {
      id: 11,
      text: selectedItems[2].answer,
      direction: "to",
    },
    {
      id: 12,
      text: "Let's hang out!",
      direction: "from",
    },
  ] : [];

  return (
    <View style={[styles.container, {paddingHorizontal: (currentGroup !== previewProfilePage ? '8%' : '0%'), paddingVertical: (currentGroup !== previewProfilePage ? '12%' : '0%')}]}>

      {currentGroup === chooseCollegePage && ( // choose college
        <View style = {styles.vanish}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select Your College</Text>
          </View>

          <View style={styles.inputContainer}>
            
            <SelectDropdown
              data={collegesThatBump}
              onSelect={(item, index) => {
                setCollege(item);
              }}
              defaultButtonText={"Tap to Select"}
              buttonTextAfterSelection={(item, index) => {return college}}
              buttonStyle={styles.dropdownBox}
              buttonTextStyle={styles.dropdownInput}
              rowTextStyle={styles.dropdownRow}
            />
            <Text style={styles.text}>More colleges coming soon!</Text>
          </View>
        </View>
      )}

      {currentGroup === emailVerificationPage && (
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <View style={styles.vanish}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create Account</Text>
            </View>
            
            <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={purpleStandard}
                  onChangeText={text => setEmail(text)}
                  value={email}
                  autoCapitalize="none"
                  keyboardType="email-address"
              />
              <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={purpleStandard}
                  onChangeText={text => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
              />
              <Text style={styles.text}>Must register with a valid college email.</Text>
              <Text style={styles.text}>Email will be verified.</Text>
              
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
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
              defaultValue={name ? name : ''}
              onChangeText={(text) => setName(text)}
              // TODO: Add proper data input code. I think i did this with the 2 lines above - ayush
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
              keyboardType="numeric"
              returnKeyType="done"
              defaultValue={age ? age : ''}
              onChangeText={(text) => setAge(text)}
            
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
              placeholder="e.g. First-year"
              defaultValue={year ? year : ''}
              onChangeText={(text) => setYear(text)}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Enter Your Major</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g. Computer Science"
              defaultValue={major ? major : ''}
              onChangeText={(text) => setMajor(text)}
              
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
            defaultValue={displayBio ? displayBio : ''}
            onChangeText={(text) => {
              setDisplayBio(text)
              setNumCharactersBio(text.length);
            }}
            minLength={100}
          />
          <Text style={styles.text}>{Math.max(100 - numCharactersBio, 0)} More Characters Needed</Text>
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

          <KeyboardAvoidingView behavior={'padding'} style={styles.answersView}>
            <FlatList
            data={selectedItems}
            renderItem={({item}) => {
              return (
                <View style={styles.answerPromptContainer}>
                  <Text style={[styles.hingePrompt, styles.hingeQuestion]}>{item.fullPrompt}</Text>
                  <TextInput
                    style={styles.hingeInput}
                    placeholder="Enter Response"
                    defaultValue={item.answer}
                    onChangeText={(text) => handleInputChange(item.id, text)}
                  />
                </View>
              )
            }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            />
          </KeyboardAvoidingView>
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
              onChangeText={(number) => setPhoneNumber(number)}
            />
            <Text style={styles.text}>Only to be used to contact for feedback during app testing. :-)</Text>
          </View>
        </View>
      )}

      <View style = {[styles.buttonContainer, {
          flex: currentGroup === chooseHingePromptsPage ? 3 : 1,
          marginHorizontal: currentGroup === previewProfilePage ? '8%' : '0%',
          marginBottom: currentGroup === previewProfilePage ? '12%' : '0%',
        }]}>

        {currentGroup === chooseHingePromptsPage && (
          <View style={styles.promptCard}>
            <Text style={styles.fullPromptSubtitle}>Full Prompt</Text>
            <View style={styles.fullPromptContainer}>
              <Text adjustsFontSizeToFit style={styles.fullPromptText}>{currentFullPrompt}</Text>
            </View>
            <Text style={styles.promptSelection}>{numSelected}/3 SELECTED</Text>
          </View>
        )}

        {currentGroup === previewProfilePage && (
          <View style={styles.previewHeadingContainer}>
            <Text style={styles.previewHeading}>Scroll to Preview Profile</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {backgroundColor: currentGroup === chooseHingePromptsPage && numSelected < 3 ? lightGrayStandard : purpleStandard,},
          ]}
          onPress={currentGroup === emailVerificationPage ? handleSignUp : formComplete}
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
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  vanish: {
    flex: 3,
    
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize:"15%",
    color: purpleStandard,
    textAlign: 'center',
    marginBottom: '2%',
    width: '84%',
    lineHeight: '22%',
    fontFamily: fontRegular,
  },
  title: {
    fontSize: '38%',
    textAlign: 'center',
    color: purpleStandard,
    marginBottom: '5%',
    fontFamily: fontBold,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '5%',
  },
  input: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: purpleStandard,
    alignContent: 'center',
    fontSize: "20%",
    padding: '4%',
    paddingHorizontal: '12%',
    marginBottom: '6%',
    fontFamily: fontMedium,
  },
  dropdownInput: {
    color: purpleStandard,
    textAlign: 'center',
    fontFamily: fontMedium,
  },
  dropdownBox: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: purpleStandard,
    fontSize: "20%",
    paddingHorizontal: '8%',
    marginBottom: '6%',
    backgroundColor: 'white',
  },
  dropdownRow: {
    color: purpleStandard,
    fontFamily: fontMedium,
  },
  bioInput: {
    height: "60%",
    width: "80%",
    lineHeight: '24%',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: purpleStandard,
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: fontRegular,
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
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontSemiBold,
  },
  choosePhoto:{
    backgroundColor: purpleStandard,
    borderRadius: 25,
    padding: 15,
    marginVertical:"1%"
  },
  hingeQuestion:{
    fontSize:'18%',
    fontFamily: fontMedium,
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
    fontFamily: fontRegular,
  },
  hingeInput:{
    borderWidth: 2,
    borderRadius: 25,
    borderColor: purpleStandard,
    textAlign: 'center',
    fontSize: "20%",
    padding:'2%',
    width:'66%',
    marginBottom:"5%",
    padding: '3%',
    fontFamily: fontRegular,
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
    fontFamily: fontRegular,
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
    fontFamily: fontSemiBold,
  },
  promptSelection: {
    flex: 1,
    color: darkGrayStandard,
    fontSize: '16%',
    marginTop: '2%',
    fontFamily: fontBold,
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
    fontFamily: fontRegular,
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
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E1E1E1',
    padding: '1%',
    marginBottom: '1%',
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
    fontFamily: fontBold,
    fontSize: 55,
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

export default ProfileScreen;