
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Switch, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Style Standardization
let purpleStandard = '#7851A9'

// Settings Screen
const ErrorTest = () => {
  const navigation = useNavigation();


  //Switch Button Functions NEEDS PROPER DATA CODE
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const toggleNotificationsSwitch = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const toggleLocationSwitch = () => {
    setLocationEnabled(previousState => !previousState);
  };

return (
    
        <SafeAreaView style={styles.parentcontainer}>

            <View style={styles.container}>

              <View style = {styles.titleContainer}>
                <Text style={styles.title}>Please enable the {"\n"} following settings. </Text>
              </View>

            <View style = {styles.bodyContainer}>

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
                    <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                    <Text style={styles.settingsButton}>What is Bump?</Text>
                    </TouchableOpacity>
                </View>

              </View>
            </View>
        </SafeAreaView>
   
  );
};

//Styles Sheet Please try to Label Descriptively,
const styles = StyleSheet.create({
  parentcontainer: {
    //backgroundColor:'blue',
    backgroundColor:'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  bodyContainer:{
    //backgroundColor:'green',
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchSubContainer: {
    //backgroundColor:'red',
    padding: 26,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingsButton: {
    fontSize: 32,
    color: purpleStandard,
    marginLeft: 20,
  },
  titleContainer:{
    //backgroundColor:'yellow',
    flex:1,
    alignItems: 'center',
    justifyContent:'flex-end'
    
  },
  title: {
    fontWeight: 'bold',
    textAlign:'center',
    fontSize:"40",
    color: purpleStandard,
  }
});

export default ErrorTest;