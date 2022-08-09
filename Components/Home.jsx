import * as React from 'react';
import {View, Text} from 'react-native';

export default function Home(navigation){
    return (
        <View><Text 
        onPress={()=> alert('This is the Home screen')}>This is the home page!</Text></View>
        
    )
}
