import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Image,Switch, Button, Settings, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore, storage} from './firebaseConfig';
import { collection, getDocs, getFirestore, query, orderBy, where, doc, getDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Style Standardization
const purpleStandard = '#7851A9';
const darkGrayStandard = '#9e9e9e';
const lightGrayStandard = '#d3d3d3';

const fontLight = 'Montserrat-Light';
const fontRegular = 'Montserrat-Regular';
const fontMedium = 'Montserrat-Medium';
const fontSemiBold = 'Montserrat-SemiBold';
const fontBold = 'Montserrat-Bold';



// Home Screen
const HomeScreen = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [yearAndMajor, setYearAndMajor] = useState('');
  const [displayBio, setDisplayBio] = useState('');
  const [hingePrompt1, setHingePrompt1] = useState('');
  const [hingeAnswer1, setHingeAnswer1] = useState('');
  const [hingePrompt2, setHingePrompt2] = useState('');
  const [hingeAnswer2, setHingeAnswer2] = useState('');
  const [hingePrompt3, setHingePrompt3] = useState('');
  const [hingeAnswer3, setHingeAnswer3] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const scrollViewRef = useRef();

  // "text" conversation
  const mockConversation = [
    {
      id: 1,
      text: "Hey! My name is " + name,
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
      text: "Great talking to you! Do you want to hang out?",
      direction: "to",
    },
  ];
  


  const navigation = useNavigation();

  
  // OLD: Based on numbers
  /*const getRandomUser = async () => {
    const usersRef = collection(firestore, 'users');
  
    let numUsers = 0;
    await getDocs(usersRef).then((querySnapshot) => {
      numUsers = querySnapshot.size;
    } );
  
    // Generate a random number between 1 and numUsers
    const randomUser = Math.floor(Math.random() * numUsers) + 1;
    setPhotoName('users/' + randomUser.toString() + '.jpg');
    console.log('users/' + randomUser.toString() + '.jpg');
    const querySnapshot = await getDocs(query(usersRef, where('__name__', '==', randomUser.toString())));
    if (querySnapshot.empty) {
      throw new Error(`No user found with name "${randomUser}"`);
    }
    //console.log(querySnapshot.docs[0].data())
    return querySnapshot.docs[0].data();
  };*/

  const getRandomUser = async () => {
    const usersRef = collection(firestore, 'users');
  
    const querySnapshot = await getDocs(usersRef);
    const numUsers = querySnapshot.size;

    // Get array of profiles that have already been seen
    const seenProfiles = await AsyncStorage.getItem('seenProfiles');
    const likedProfiles = await AsyncStorage.getItem('likedProfiles');
    let likedUsersArray = JSON.parse(likedProfiles);
    let seenUsersArray = JSON.parse(seenProfiles);
    if (seenUsersArray == null) {
      seenUsersArray = [];
    }
    if (likedUsersArray == null) {
      likedUsersArray = [];
    }
    const randomIndex = Math.floor(Math.random() * numUsers);
    setRandomIndex(randomIndex);
    if (seenUsersArray.includes(randomIndex) || likedUsersArray.includes(randomIndex)) {
      // If the randomly generated user is in the array of seen or liked users, call the function recursively to generate a new user
      return getRandomUser();
    }

    // reset seenUsersArray if it is 75% of the users
    if (seenUsersArray.length >= numUsers * 0.75) {
      seenUsersArray = [];
    }

    seenUsersArray.push(randomIndex);
    //seenUsersArray = []; // test reset
    //likedUsersArray = []; // test reset
    console.log('Seen Users List:' + JSON.stringify(seenUsersArray));
    console.log('Liked Users List:' + JSON.stringify(likedUsersArray));
    await AsyncStorage.setItem('seenProfiles', JSON.stringify(seenUsersArray));
    //await AsyncStorage.setItem('likedProfiles', JSON.stringify(likedUsersArray)); //test
  
    
    // Get the document at the randomly generated index
    const randomDoc = querySnapshot.docs[randomIndex];
    const randomUserId = randomDoc.id;

    setPhotoName('users/' + randomUserId + '.jpg');
    console.log('users/' + randomUserId + '.jpg');
  
    const userDoc = await getDoc(doc(usersRef, randomUserId));
    if (!userDoc.exists()) {
      throw new Error(`No user found with ID "${randomUserId}"`);
    }
    
    return userDoc.data();
  };

  const handleLike = async () => {
    const likedProfiles = await AsyncStorage.getItem('likedProfiles');
    let likedUsersArray = JSON.parse(likedProfiles);
    if (likedUsersArray == null) {
      likedUsersArray = [];
    }
    likedUsersArray.push(randomIndex);
    await AsyncStorage.setItem('likedProfiles', JSON.stringify(likedUsersArray));
    console.log(likedUsersArray);
    setData();
    // scroll back to the top of the screen
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }

  // handle dislike button
  const handleDislike = async () => {
    setData();
    // scroll back to the top of the screen
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }
  
  // create function set data not async
  const setData = async () => {
    let user = await getRandomUser();
    setName(user.name);
    setAge(user.age);
    // user.year currently studying user.major
    setYearAndMajor(user.year + ' Currently Studying ' + user.major);
    setDisplayBio(user.displayBio);
  
  
    const QA1 = user.QA[Math.floor(Math.random() * 3)];
    const dashIndex1 = QA1.indexOf('-');
    const QA2 = user.QA[Math.floor(Math.random() * 3)];
    const dashIndex2 = QA2.indexOf('-');
    const QA3 = user.QA[Math.floor(Math.random() * 3)];
    const dashIndex3 = QA3.indexOf('-');
    
    const question1 = QA1.substring(0, dashIndex1).trim();
    const answer1 = QA1.substring(dashIndex1 + 1).trim();
    const question2 = QA2.substring(0, dashIndex2).trim();
    const answer2 = QA2.substring(dashIndex2 + 1).trim();
    const question3 = QA3.substring(0, dashIndex3).trim();
    const answer3 = QA3.substring(dashIndex3 + 1).trim();
    
    setHingePrompt1(question1);
    setHingeAnswer1(answer1);
    setHingePrompt2(question2);
    setHingeAnswer2(answer2);
    setHingePrompt3(question3);
    setHingeAnswer3(answer3);
  
    
  
    //get document name of user
    //user.doc
    
  }

  const getPhoto = async (photoName) => {
    const storageRef = ref(storage, photoName);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    setPhotoURL(url);
    //console.log(photoURL);
    return url;
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await setData();
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (photoName && !photoLoaded) {
      getPhoto(photoName);
      //setPhotoLoaded(true);
    }
  }, [photoName, photoLoaded]);



  
  const [userNotReady , setUserNotReady] = useState(null);

  // Switch Button Functions
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  // Toggle switch functions
  const toggleNotificationsSwitch = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const toggleLocationSwitch = () => {
    setLocationEnabled(previousState => !previousState);
  };

  const verifyUserisReady = async () => {
    if(notificationsEnabled && locationEnabled) {
      await AsyncStorage.setItem('userNotReady', JSON.stringify(false));
      setUserNotReady(false);
    }
    else{
      await AsyncStorage.setItem('userNotReady', JSON.stringify(true));
      setUserNotReady(true);
    }
  }
  const checkIfUserReady = async () => {
    try {
      const userNotReady = await AsyncStorage.getItem('userNotReady');
      console.log(userNotReady);
      if (userNotReady === 'true') {
        // The user has not fullfilled the requirements to use the app
        setUserNotReady(true);
      } else {
        // The user has fullfiled the requirements to use the app
        setUserNotReady(false);
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkIfUserReady();
  }, []);
  
  if (userNotReady === null) {
    console.log(userNotReady);
    return null;
  }
  //onsole.log(userNotReady);
  

  return (
    <View style={{flex: 1}}>
   
    {userNotReady ? (
      <View style={styles.parentcontainer}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Please enable the following settings.</Text>
      </View>
    
      <View style={styles.bodyContainer}>
        <View style={styles.switchSubContainer}>
          <Switch
            trackColor={{false: '#767577', true: purpleStandard}}
            thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotificationsSwitch}
            value={notificationsEnabled}
          />
          <Text style={styles.settingsButton}>Push Notifications</Text>
        </View>
        <View style={styles.switchSubContainer}>
          <Switch
            trackColor={{false: '#767577', true: purpleStandard}}
            thumbColor={locationEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLocationSwitch}
            value={locationEnabled}
          />
          <Text style={styles.settingsButton}>Location Services</Text>
        </View>
        <View style={styles.switchSubContainer}>
          <Ionicons name={'help-circle-outline'} size={40} color={purpleStandard} />
          <TouchableOpacity onPress={() => navigation.navigate('')}>
            <Text style={styles.settingsButton}>What is Bump?</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <View style = {styles.exitErrorContainer}>
        <TouchableOpacity style={styles.exitErrorButton} onPress={verifyUserisReady}>
          <Text style = {styles.exitErrorText}>Continue</Text>
        </TouchableOpacity>
      </View>
    
    </View>
    ) : (
      <ScrollView style={styles.parentcontainer} ref={scrollViewRef}>

        <View style={styles.profilepiccontainer}>
          <Image style={styles.profilepic} source={{ uri: photoURL }}/>
        </View>

        <View style={styles.bottomHalf}>
          <View style={styles.one}>
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
            scrollEnabled={false}
          />

          <View style={styles.four}>
            <View style={styles.swipebuttons}>
              <TouchableOpacity style={styles.buttonStyleDislike} onPress={() => handleDislike()}>
                <Text style={styles.buttonTextDislike}>Maybe Later</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonStyleLike} onPress={() => handleLike()}>
                <Text style={styles.buttonTextLike}>Sure!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      )}
    </View>
  );
};

const win = Dimensions.get('window');

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
    width: "100%",
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
    paddingHorizontal: '1%',
  },
  one: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  four: {
    alignItems: 'center',
    marginBottom: 24,
    borderTopWidth: 2,
    borderTopColor: purpleStandard,
  },

  swipebuttons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    marginTop: '5%',
  },
  buttonStyleLike: {
    borderRadius: '100%',
    borderWidth: 3,
    borderColor: purpleStandard,
    backgroundColor:purpleStandard,
    width: '40%',
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyleDislike: {
    borderRadius: '100%',
    borderWidth: 3,
    borderColor: purpleStandard,
    width: '40%',
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextDislike: {
    color: purpleStandard,
    fontSize: '20%',
    textAlign: 'center',
    fontFamily: fontSemiBold,
  },
  buttonTextLike: {
    color: 'white',
    fontSize: '20%',
    textAlign: 'center',
    fontFamily: fontSemiBold,
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
  bodyContainer:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchSubContainer: {
    padding: 26,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingsButton: {
    fontSize: 32,
    color: purpleStandard,
    marginLeft: 20,
    fontFamily: fontRegular,
  },
  titleContainer:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    textAlign: 'center',
    fontSize: "40",
    color: purpleStandard,
    fontFamily: fontBold,
  },
  exitErrorContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  exitErrorButton:{
    borderRadius: '100%',
    borderWidth: 4,
    backgroundColor: purpleStandard,
    borderColor: purpleStandard,
    width: '40%',

  },
  exitErrorText:{
    fontSize: '30%',
    color:'white',
    fontFamily: fontMedium,
    alignSelf:'center'
  }
});

export default HomeScreen;