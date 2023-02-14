import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Button} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';



const hometest = () => {
    const navigation = useNavigation();

return (

    <View style={styles.parentcontainer}>
       
        <View style={styles.profilepiccontainer}>
            <Image style={styles.profilepic} source={require('./assets/matchprofilepic.jpg')}/>
        </View>

        <View style={styles.bottomHalf}>

            <View style={styles.one}>
                <Text style={styles.firstName}>Krish, 19</Text>
            </View>

            <View style={styles.two}>
                <Text style={styles.description}>Sophmore Currently Studying Med</Text>
                <Text style={styles.bio}>   </Text>
                <Text style={styles.bio}>I like art, pizza , and animals . Im looking forward to making friends I can nerd out and relax with. If you get me started on cookout lore i will talk to you for hours and hours there is literally so much cookout lore.</Text> 
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
      },
      profilepiccontainer: {
        flex: 1,
        alignItems:'center',
      },
      profilepic:{
        flex:1,
        width: '100%',
      },
      bottomHalf: {
        flex: 1,
      },
      one:{
        //backgroundColor:'red',
        flex:1,
        justifyContent: 'center'
      },
      two:{
        //backgroundColor:'blue',
        flex:4,
        flexDirection:'column',
      },
      three:{
        //backgroundColor:'yellow',
        flex:3,
      },
      swipebuttons: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      reject: {
        width: 86,
        height: 86,
        marginLeft:"7%",
      },
      accept: {
        width: 86,
        height: 86,
        marginRight:"5%"
      },

      firstName:{
        flex:1,
        fontFamily: 'Baskerville',
        fontSize: 55,
        fontWeight: '400',
        marginLeft:10
      },
      description:{
        fontFamily: 'Baskerville',
        marginLeft:10,
        marginTop:"1%",
        fontSize:25,

      },
      bio:{
        fontFamily: 'Baskerville',
        marginLeft:10,
        fontSize:25
      },
});

export default hometest;