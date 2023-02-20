import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore, storage} from './firebaseConfig';
import { collection, getDocs, getFirestore, query, orderBy, where, doc, getDoc } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";


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
  const [photoURL, setPhotoURL] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoLoaded, setPhotoLoaded] = useState(false);


  const navigation = useNavigation();

  
  
  const getRandomUser = async () => {
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
  };
  
  // create function set data not async
  const setData = async () => {
    let user = await getRandomUser();
    setName(user.Name);
    setAge(user.Age);
    setYearAndMajor(user.YearMajor);
    setDisplayBio(user.Biography);
  
  
    const QA1 = user.QA[Math.floor(Math.random() * 11)];
    const dashIndex1 = QA1.indexOf('-');
    const QA2 = user.QA[Math.floor(Math.random() * 11)];
    const dashIndex2 = QA2.indexOf('-');
    
    const question1 = QA1.substring(0, dashIndex1).trim();
    const answer1 = QA1.substring(dashIndex1 + 1).trim();
    const question2 = QA2.substring(0, dashIndex2).trim();
    const answer2 = QA2.substring(dashIndex2 + 1).trim();
    
    setHingePrompt1(question1);
    setHingeAnswer1(answer1);
    setHingePrompt2(question2);
    setHingeAnswer2(answer2);
  
    
  
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



  return (
    <ScrollView style={styles.parentcontainer}>

      <View style={styles.profilepiccontainer}>
        <Image style={styles.profilepic} source={{ uri: photoURL }}/>
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
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>Hey!</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>Tell me about yourself!</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingePrompt1}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingeAnswer1}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          
          <View style={styles.hingeContainerFrom}>
            <Text style={styles.hingeTextFrom}>{hingePrompt2}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>{hingeAnswer2}</Text>
          </View>
          <View style={{marginTop: 10}}></View>
          <View style={styles.hingeContainerTo}>
            <Text style={styles.hingeTextTo}>Nice to meet you! Do you want to hang out?</Text>
          </View>
        </View>
        
        <View style={styles.four}>
          <View style={styles.swipebuttons}>
            <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
              <Image style={styles.reject} source={require('./assets/xmark.webp')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
              <Image style={styles.accept} source={require('./assets/checkmark.webp')}/>
            </TouchableOpacity>
          </View>
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
  four: {
    alignItems: 'center',
    marginBottom: 24,
  },

  swipebuttons: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  reject: {
    width: 86,
    height: 88
  },
  accept: {
    width: 86,
    height: 88,
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
    borderColor: "purple",
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
    backgroundColor: "purple",
    borderRadius: 20,
    marginTop: 2,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  hingeTextFrom: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'purple',
  },
  hingeTextTo: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: 'white',
  },
});

export default HomeScreen;