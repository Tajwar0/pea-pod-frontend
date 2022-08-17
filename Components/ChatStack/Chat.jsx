import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import { useEffect, useState, useRef, useContext, useCallback } from 'react'
import { StyleSheet, View, Text, TextInput, Image, FlatList, Button } from 'react-native'
import io from 'socket.io-client'
// import { UserContext } from '../contexts/User';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function Chat ({ route }) {
    const [ input, setInput ] = useState()
    const [ messages, setMessages ] = useState([])
    const socketRef = useRef()
    // const { user } = useContext(UserContext)
    const user = 'Bean'
    const { otherUser } = route.params
    
    const roomId = [user, otherUser].sort().join("%")

    let isFocused = useIsFocused()

        useFocusEffect(
        useCallback(() => {
            if (isFocused) {
                const urlRoomId = roomId.split("%").join("%25")
                fetch(`https://pea-pod-api.herokuapp.com/chat/${urlRoomId}/messages`)
                .then((response) => response.json())
                .then(( oldMsgs ) => setMessages(oldMsgs))
                  .catch(err => {
                    console.log(err)
                })
            } 
        }, [])
    )


    useEffect(() => {
        socketRef.current = io('https://pea-pod-chat-express-server.herokuapp.com/')
        socketRef.current.on('connect', () => {
           socketRef.current.emit('connected', roomId)
        })
        socketRef.current.on('load message', (oldMsgs) => {
            setMessage(oldMsgs)
        })
        socketRef.current.on('message', (newMsg) => {
            setMessages([...messages, newMsg])
        })
        return () => {
            socketRef.current.disconnect()
        }
    }, [messages])

    const pressEvent = () => {
        const newMsg = {
            room_id: roomId,
            sender: user,
            msg: input.trim(),
            created_at: moment().format()
        }

        socketRef.current.emit('message', newMsg, roomId)
        setInput('')
    }

    const Item = ({ sender, msg }) => (
        <View style={styles.item}>
            <Text>{sender}: {msg}</Text>
        </View>
      )
    
    const renderItem = ({ item }) => (
        <Item sender={item.sender} msg={item.msg}/>
      )

      return (
        <View style={styles.container}>
        <Image
            source={{
            uri: 'https://image.shutterstock.com/image-illustration/trio-cute-peas-pod-600w-1943165422.jpg',
            }}
            style={{ width: 300, height: 150 }}
        />
        <FlatList 
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        <View>
            <TextInput
                style={styles.input}
                onChangeText={text => setInput(text)}
                value={input}
                multiline={true}
                blurOnSubmit={true}
            />
            <Button
                style={styles.button} 
                title="send"
                onPress={pressEvent}
                color="green"
            />
        </View>
        <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 30
    },
    input: {
        height: 40,
        width: 350,
        margin: 12,
        padding: 10,
        borderWidth: 1,
    },
    item: {
        backgroundColor: '#e4ffe0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      }
});