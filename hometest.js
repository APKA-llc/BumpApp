import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



const HomeTest = () => {
    const navigation = useNavigation();

return (

    <View style={styles.parentcontainer}>
       
        <View style={styles.profilepiccontainer}>
            <Image style={styles.profilepic} source={require('./assets/matchprofilepic.jpg')}/>

            <View style={styles.one}>
                <Text style={styles.firstName}>Krish</Text>
            </View>
            
          </View>

        <View style={styles.bottomHalf}>

            

            <View style={styles.two}>
                <Text style={styles.description}>19, Sophmore Currently Studying Med</Text>
                <Text style={styles.bio}>   </Text>
                <Text style={styles.bio}>I like art, pizza , and animals . Im looking forward to making friends I can nerd out and relax with. If you get me started on cookout lore i will talk to you for hours and hours.</Text> 
            </View>

            <View style={styles.three}>
                <View style={styles.swipebuttons}>
                    <TouchableOpacity>
                     <Image style={styles.reject} source={require('./assets/xmark.webp')}/>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image style={styles.accept} source={require('./assets/checkmark.webp')}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    </View>
 
  );
};

const styles = StyleSheet.create({
    parentcontainer: {
        flex: 1,
        backgroundColor:"#ffffff"
      },
      profilepiccontainer: {
        flex: 4,
        alignItems:'center',
      },
      profilepic:{
        flex:1,
        width: '100%',
      },
      bottomHalf: {
        flex: 3,
      },
      one:{
        //backgroundColor:'red',
        position: 'absolute',
        bottom: 0,
        backgroundColor:"#a142eb",
        borderRadius:15,
        left:"5%",
        padding:2
      },
      two:{
        //backgroundColor:'blue',
        flex:3,
        flexDirection:'column',
      },
      three:{
        //backgroundColor:'yellow',
        flex:2,
      },
      swipebuttons: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      reject: {
        width: 70,
        height: 70,
        marginLeft:"5%",
      },
      accept: {
        width: 70,
        height: 70,
        marginRight:"5%"
      },

      firstName:{
        flex:1,
        fontSize: 40,
        fontWeight: '500',
        color:'white',
        marginLeft:'5%'
      },
      description:{
        
        marginLeft:"5%",
        marginRight:"5%",
        marginTop:"1%",
        fontSize:25,

      },
      bio:{
        
        marginLeft: "5%",
        marginRight: "5%",
        fontSize:25
      },
});

export default HomeTest;