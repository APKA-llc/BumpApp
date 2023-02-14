import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import BumpScreen from './BumpScreen';
import SettingsScreen from './Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Tab = createBottomTabNavigator();

export default function MainHub() {
  return (
        <Tab.Navigator 
        initialRouteName="MainHub" 
        screenOptions={({ route }) => ({
            headerShown:false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'ios-home'

                } 
                else if (route.name === 'Settings') {
                    iconName = 'ios-settings'
                }
                else if(route.name === 'Bump'){
                    iconName = 'ios-alert'
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            })}
        >
        

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Bump" component={BumpScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
  );
}