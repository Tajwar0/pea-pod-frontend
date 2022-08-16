import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useState, useContext, useCallback } from 'react';
import { Text, Button, View, FlatList, StyleSheet, Image } from 'react-native'
// import { UserContext } from '../contexts/User';

export default function Pod ({ navigation }) {
    // const { user } = useContext(UserContext)
    const user = 'Bean'
    const [ peasInYourPod, setPeasInYourPod ] = useState()

    let isFocused = useIsFocused()

    useFocusEffect(
    useCallback(() => {
        if (isFocused) {
            fetch(`https://pea-pod-api.herokuapp.com/user/${user}`)
            .then((response) => response.json())
            .then((data) => setPeasInYourPod(data[user].matches))
            .catch(err => {
                console.log(err, "<<< err")
            })
        } 
    }, [])
    ) 

    const Item = ({ username }) => (
        <View style={styles.container}>
            <Text style={styles.text}>{username}</Text>
            <Button
                title='Chat'
                onPress={() => navigation.navigate('Chat', { otherUser: username })}
                color="green"
            />
        </View>
    )

    const renderItem = ({ item }) => (
        <Item username={item}/>
    )
    
    return (
        <FlatList 
            data={peasInYourPod}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        backgroundColor: '#e4ffe0',
        padding: 15
    },
    text: {
        fontSize: 24
    },
})