import * as React from 'react';
import {View, Text} from 'react-native';
import Home from './Home';

export default function Profile(navigation){
    return (
        <View>
            <Text onPress={() => 
            alert('This is the profile page!')}>Profile Screen</Text>
            </View>
        
    )
}