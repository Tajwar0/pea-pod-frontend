import * as React from 'react';
import {View, Text} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './Home';
import Profile from './Profile';
import Pod from './Pod';
import Settings from './Settings';
const homeName = 'Home';
const profileName = 'Profile';
const podName = 'Pod';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function Main(){
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({route}) =>({
                tabBarIcon: ({focused, color, size})=>{
                    let iconName;
                    let routeName = route.name;

                    if(routeName === homeName){
                        iconName = focused ? 'home' : 'home-outline'
                        color='green'
                    }else if(routeName === profileName){
                        iconName = focused ? 'person' : 'person-outline'
                        color='red'
                    }else if(routeName === podName){
                        iconName = focused ? 'people' : 'people-outline'
                        color='purple'
                    }else if(routeName === settingsName){
                        iconName = focused ? 'settings' : 'settings-outline'
                        color='grey'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>

                },
            })}
            >
                <Tab.Screen name={homeName} component={Home}></Tab.Screen>
                <Tab.Screen name={profileName} component={Profile}></Tab.Screen>
                <Tab.Screen name={podName} component={Pod}></Tab.Screen>
                <Tab.Screen name={settingsName} component={Settings}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}