import { View, Text } from "react-native-web"


export default function Settings(){
    return (
        <View><Text 
        onPress={()=> alert('This is the Settings screen')}>This is the settings page!</Text></View>
        
    )
}