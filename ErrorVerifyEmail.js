
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Switch, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Style Standardization
let purpleStandard = '#7851A9'

// Settings Screen
const SettingsScreen = () => {
  const navigation = useNavigation();


return (
    
        <SafeAreaView style={styles.parentcontainer}>

            <View style={styles.container}>

              <View style={styles.settingsButtonContainer}>
                <Text style={styles.title}>Please verify your email to continue. </Text>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Text style={styles.subText}>We ask you to verify your valid .edu account to protect each user.</Text>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'mail-outline'} size={40} color={purpleStandard} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>Resend Email</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.settingsButtonContainer}>
                <Ionicons name={'help-circle-outline'} size={40} color={purpleStandard} />
                <TouchableOpacity onPress={() => navigation.navigate('BumpScreen')}>
                  <Text style={styles.settingsButton}>What is Bump?</Text>
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
  settingsButtonContainer: {
    padding: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:"center"
  },
  settingsButton: {
    fontSize: 32,
    color: purpleStandard,
    marginLeft: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign:'center',
    marginTop: 0,
    flex:1,
    fontSize:"40",
    color: purpleStandard,
  },
  subText:{
    fontSize:'25%',
    color: purpleStandard,
    textAlign:'center',
  }
});

export default SettingsScreen;