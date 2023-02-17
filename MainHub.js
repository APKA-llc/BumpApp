import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MyProfileScreen from './MyProfileScreen';
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

                if (route.name === 'Explore') {
                    iconName = 'people-outline'

                } 
                else if (route.name === 'Settings') {
                    iconName = 'ios-settings'
                }
                else if(route.name === 'My Profile'){
                    iconName = 'person-circle-outline'
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            })}
        >
        

        <Tab.Screen name="My Profile" component={MyProfileScreen} />
        <Tab.Screen name="Explore" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen}/>
      </Tab.Navigator>
  );
}