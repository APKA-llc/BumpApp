import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Switch, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {signOut} from "firebase/auth";
import {auth} from "./firebaseConfig";
import OpeningScreen from './OpeningScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';


//Style Standardization
let purpleStandard = '#7851A9'

// Settings Screen
const SettingsScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Signed Out!")
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
    //Remove User From Storage
    try {
      AsyncStorage.removeItem('user');
      AsyncStorage.removeItem('seenProfiles');
      AsyncStorage.removeItem('likedProfiles');
      AsyncStorage.removeItem('userNotReady');
    } catch (error) {
      console.log(error);
    }
    navigation.navigate(OpeningScreen);

  };

return (
    
        <SafeAreaView style={styles.parentcontainer}>

            <View style={styles.container}>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'log-out-outline'} size={40} color={purpleStandard} />
                <TouchableOpacity onPress={handleSignOut}>
                  <Text style={styles.settingsButton}>Log Out</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'mail-outline'} size={40} color={purpleStandard} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>Contact Us</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'reader-outline'} size={40} color={purpleStandard} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>Give Feedback</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'help-circle-outline'} size={40} color={purpleStandard} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>How to Use Bump</Text>
                </TouchableOpacity>
              </View>

            </View>
        </SafeAreaView>
   
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  parentcontainer: {
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container:{
    padding:'5%',
  },
  settingsButtonContainer: {
    padding: 26,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingsButton: {
    fontSize: 32,
    color: purpleStandard,
    marginLeft: 20,
  },
  subText:{
    fontSize:'25%',
    color: purpleStandard,
    textAlign:'center',
  }
});

export default SettingsScreen;