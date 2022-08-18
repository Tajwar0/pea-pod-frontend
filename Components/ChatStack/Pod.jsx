import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useState, useContext, useCallback } from "react";
import { Text, View, FlatList, StyleSheet, Image, Button } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from "../../Contexts/User";

export default function Pod({ navigation }) {
  // const user = "Bean";
  const [peasInYourPod, setPeasInYourPod] = useState();
  const { setUserName, userName } = useContext(UserContext);
  let isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      console.log(userName)
      if (isFocused) {
        fetch(`https://pea-pod-api.herokuapp.com/user/${userName}`)
          .then((response) => response.json())
          .then((data) => setPeasInYourPod(data[userName].matches))
          .catch((err) => {
            console.log(err, "<<< err");
          });
      }
    }, [])
  );

  const pressEvent = () => {
    setUserName("")
    navigation.navigate("Login")
  }

  const Item = ({ username, avatar }) => (
        <View style={styles.container}>
            <View style={styles.leftChatCard}>
                <Image style={styles.avatarImg} source={{uri: avatar}}/>
                <Text style={styles.text}>{username}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Chat', { otherUser: username })}
            >
                <Text style={styles.buttonText}>CHAT</Text>
            </TouchableOpacity>
        </View>
    )

    const renderItem = ({ item }) => (
        <Item username={item.name} avatar={item.avatar ? item.avatar : "https://starwarsblog.starwars.com/wp-content/uploads/2021/02/queen-s-hope-padme-_TALL.jpg"} />
    )
    
    return (
      <View>
        <FlatList
          data={peasInYourPod}
          renderItem={renderItem}
          keyExtractor={(item) => Math.random()}
        />
        <Button title="Logout" onPress={pressEvent} />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#e4ffe0',
        padding: 15
    },
    text: {
        fontSize: 24
    },
    button: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold'
    },
    leftChatCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatarImg: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginRight: 15
    }
})
