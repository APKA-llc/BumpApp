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
    if (currentGroup === 5) {
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
  if (currentGroup === 6) {
    messageTop = 'Finish';
  } else {
    messageTop = 'Continue';
  }

  let messageBottom;
  messageBottom = 'Return';

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>

          {currentGroup === 1 && (
            <View style = {styles.vanish}>
              <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Enter Your Name</Text>
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

          {currentGroup === 2 && (
            <View style = {styles.vanish}>
              <View style={styles.TitleContainer}>
                <Text style={styles.Title}>What is your age?</Text>
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

          {currentGroup === 3 && (
           <View style = {styles.vanish}>
            <View style={styles.TitleContainer}>
              <Text style={styles.Title}>Choose a photo</Text>
            </View>

            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.choosePhoto} onPress={pickImage}>
                <Text style={styles.buttonText}>Select a Photo</Text>
              </TouchableOpacity>

              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>

          </View>
          )}
          {currentGroup === 4 && (
           <View style = {styles.vanish}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.TitleContainer}>
              <Text style={styles.Title}>Introduce Yourself</Text>
              </View>
            </TouchableWithoutFeedback>

            <View style={styles.inputContainer}>
                
              <TextInput
                style={styles.bioInput}
                multiline
                numberOfLines={5}
              />
            </View>
          </View>
          )}

          {currentGroup === 5 && (
           <View style = {styles.vanish}>
              <View style={styles.TitleContainer}>
              <Text style={styles.Title}>Questions</Text>
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

            <View style = {styles.buttonContainer}>
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
  TitleContainer:{
    //backgroundColor:"blue",
    flex:1,
    justifyContent:"flex-end",
    alignItems:'center',
    
  },
  Title: {
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
    flex:1,
    justifyContent:"flex-end"

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
    fontSize:'25%',
    marginBottom:'3%'
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
  }
});

export default ProfileScreen;