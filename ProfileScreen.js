import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

//Style Standardization
let purpleStandard = '#7851A9'

// Profile Screen
const ProfileScreen = () => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const navigation = useNavigation();
  //const [profilePic, setProfilePic] = useState(defaultProfilePic);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const formComplete = () => {
    if (currentGroup === 7) {
      navigation.navigate('HomeScreen');
    } else {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const formEscape = () => {
    if (currentGroup === 1) {
      navigation.navigate('OpeningScreen');
    } else {
      setCurrentGroup(currentGroup - 1);
    }
  };

  let messageTop;
  let messageBottom;
  if (currentGroup === 7) {
    messageTop = 'Finish';
    messageBottom = 'Revise';
  } else {
    messageTop = 'Continue';
    messageBottom = 'Return';
  }

  const numSelected = 0;

  const [hingeSelected, setHingeSelected] = useState(false);
  const toggleHingePrompt = () => {
    setHingeSelected(!hingeSelected);
  }

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
                <ScrollView showsVerticalScrollIndicator={false}>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Most British Thing</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>I'm a Hardcore</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Fan of</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Secret Talent</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Dying Wish</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Most Irrational Fear</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Never-ending Nightmare</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>At a Party</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Geek Out</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.promptContainer, hingeSelected ? styles.promptSelected : styles.promptUnselected]} onPress={toggleHingePrompt}>
                    <Text style={[styles.hingeQuestion, hingeSelected ? styles.hingeSelected : styles.hingeUnselected]}>Cheddar News</Text>
                  </TouchableOpacity>
                </ScrollView>
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
                <View style={styles.fullPromptContainer}>
                  <Text style={styles.fullPromptText}>If you see me at a party, I'm the one...</Text>
                </View>
                <Text style={styles.fullPromptSubtitle}>Full Prompt</Text>
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
    //backgroundColor:'red',
    flex: 1,
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
  hingeSelected: {
    color: 'white',
  },
  hingeUnselected: {
    color: purpleStandard,
  },
  promptContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 12,
    borderWidth: 3,
    borderColor: purpleStandard,
    borderRadius: '24%',
    marginBottom: 24,
  },
  promptSelected: {
    backgroundColor: purpleStandard,
  },
  promptUnselected: {
    backgroundColor: 'white',
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
    flex: 2,
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
  fullPromptContainer: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#9e9e9e',
    width: '96%',
    paddingHorizontal: '5%',
    paddingVertical: '8%',
    alignItems: 'center',
    marginTop: '2%',
  },
  fullPromptText: {
    color: purpleStandard,
    fontSize: 18,
    fontWeight: '700',
  },
  fullPromptSubtitle: {
    color: '#9e9e9e',
    marginVertical: '3%',
  },
  promptSelection: {
    color: '#9e9e9e',
    fontWeight: '700',
    fontSize: '16%',
    flex: 1,
  }
});

export default ProfileScreen;