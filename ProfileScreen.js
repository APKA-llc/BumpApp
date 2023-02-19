import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

//Style Standardization
let purpleStandard = '#7851A9';

// display hinge question selection & full prompt
let numSelected = 0;
let currentFullPrompt = 'Please Select a Prompt';

//list of hinge prompts
const hingePrompts = [
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
    fullPrompt: 'If ____ has a million fans, I am one of them. If ____ has 10 fans, I am one of them. If ____ only has one fan, then that one fan is me. If ____ has no fans, that mean I am no longer on the earth. If the world is against ____, I am against the world.',
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // form is complete if currentGroup is 7 (we are on the 7th page)
  const formComplete = () => {
    if (currentGroup === 7) {
      navigation.navigate('HomeScreen');
    } else {
      setCurrentGroup(currentGroup + 1);
    }
  };

  // if going "Back" from the first page, then go to the OpeningScreen
  const formEscape = () => {
    if (currentGroup === 1) {
      navigation.navigate('OpeningScreen');
    } else {
      setCurrentGroup(currentGroup - 1);
    }
  };

  // update continue/back button messages
  let messageTop;
  let messageBottom;
  if (currentGroup === 7) {
    messageTop = 'Finish';
    messageBottom = 'Revise';
  } else {
    messageTop = 'Continue';
    messageBottom = 'Back';
  }

  // updates FlatList when a prompt is selected
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOptionPress = (item) => {
    setSelectedItems((selectedItems) => {
      if (selectedItems.find((selectedItem) => selectedItem.id === item.id)) { // check whether the tapped item is already selected
        numSelected--;
        if (numSelected === 0) {
          currentFullPrompt = 'Please Select a Prompt'
        }
        return selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      }
      // if the tapped item is not selected
      if (numSelected < 3) { // if the limit has not been reached, then select the tapped item
        numSelected++;
        currentFullPrompt = item.fullPrompt;
        return [...selectedItems, item];
      }
      // the limit has been reached, so nothing should be done
      return selectedItems;
    });
  };

  const isItemSelected = (item) => {
    return selectedItems.find((selectedItem) => selectedItem.id === item.id);
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>

          {currentGroup === 1 && ( // enter first name
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

          {currentGroup === 2 && ( // choose age
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

          {currentGroup === 3 && ( // pick profile pic
           <View style = {styles.vanish}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Choose a photo</Text>
            </View>

            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.choosePhoto} onPress={pickImage}>
                <Text style={styles.buttonText}>Select a Photo</Text>
              </TouchableOpacity>

              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>

          </View>
          )}
          {currentGroup === 4 && ( // write your introduction/bio
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

          {currentGroup === 5 && ( // choose hinge questions
            <View style = {styles.hingePromptPageContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Choose Prompts</Text>
              </View>

              <View style={styles.promptScrollView}>
                <FlatList
                  data={hingePrompts}
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
                  extraData={selectedItems}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          )}

          {currentGroup === 6 && ( // write hinge responses
           <View style = {styles.vanish}>
              <View style={styles.titleContainer}>
              <Text style={styles.title}>Answer Prompts</Text>
              </View>

            <View style={styles.inputContainer}>
                
                <ScrollView>
                <Text style={styles.hingeQuestion}>My secret talent is...</Text>
                <TextInput style={styles.hingeInput}/>
                  
                <Text style={styles.hingeQuestion}>The voices are telling me to...</Text>
                <TextInput style={styles.hingeInput}/>

                <Text style={styles.hingeQuestion}>My never ending nightmare is...</Text>
                <TextInput style={styles.hingeInput}/>
                </ScrollView>
    
            </View>
          </View>
          )}

          {currentGroup === 7 && ( // preview profile --- show MyProfileScreen here (not sure how to do that yet)
          <View style = {styles.vanish}>
              <View style={styles.titleContainer}>
              <Text style={styles.title}>Preview Profile</Text>
              </View>
          </View>
          )}

          <View style = {styles.buttonContainer}>
            {currentGroup === 5 && (
              <View style={styles.promptCard}>
                <Text style={styles.fullPromptSubtitle}>Full Prompt</Text>
                <View style={styles.fullPromptContainer}>
                  <Text adjustsFontSizeToFit style={styles.fullPromptText}>{currentFullPrompt}</Text>
                </View>
                <Text style={styles.promptSelection}>{numSelected}/3 SELECTED</Text>
              </View>
            )}
            <TouchableOpacity style={styles.buttonStyle} onPress={formComplete}>
              <Text style={styles.buttonText}>{messageTop}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={formEscape}>
              <Text style={styles.buttonText}>{messageBottom}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
 
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
  vanish:{
    //backgroundColor:'green',
    flex:2
  },
  titleContainer:{
    //backgroundColor:"blue",
    flex:1,
    justifyContent:"flex-end",
    alignItems:'center',
  },
  title: {
    fontSize: '45%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: purpleStandard,
    marginBottom: '5%'
  },
  inputContainer: {
    //backgroundColor: 'yellow',
    flex: 1,
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:'5%'
  },
  input: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: purpleStandard,
    alignContent:'center',
    fontSize: "20%",
    padding:'5%',
    paddingHorizontal:'8%',
    
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
    flex: 3,
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
  promptScrollView: {
    flex: 5,
    width: '90%',
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
    color: '#9e9e9e',
    marginTop: '2%',
  },
  fullPromptContainer: {
    flex: 4,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#9e9e9e',
    width: '96%',
    paddingHorizontal: '5%',
    // paddingVertical: '8%',
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
    color: '#9e9e9e',
    fontWeight: '700',
    fontSize: '16%',
    marginTop: '2%',
  }
});

export default ProfileScreen;