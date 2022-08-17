import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useState, useContext, useCallback } from "react";
import { Text, Button, View, FlatList, StyleSheet, Image } from "react-native";
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

  const Item = ({ username }) => (
    <View style={styles.container}>
      <Text style={styles.text}>{username}</Text>
      <Button
        title="Chat"
        onPress={() => navigation.navigate("Chat", { otherUser: username })}
        color="green"
      />
    </View>
  );

  const renderItem = ({ item }) => <Item username={item} />;

  return (
    <View>
      <FlatList
        data={peasInYourPod}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Logout" onPress={pressEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    backgroundColor: "#e4ffe0",
    padding: 15,
  },
  text: {
    fontSize: 24,
  },
});
