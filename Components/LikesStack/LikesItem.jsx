import React, { useContext } from "react";
import { UserContext } from "../../Contexts/User";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

export default function LikesItem({ item, navigation }) {
  const { userName, setUserName } = useContext(UserContext);
  const { width } = useWindowDimensions();

  return (
    <View style={[{ flex: 0.7 }, { width }]}>
      <View style={[{ flex: 0.3 }, styles.container]}>
        <Text style={styles.titleText}>
          {item.name} wants to get to know you{"\n"}
        </Text>
        <Text style={styles.text}>
          {item.name} liked your {item.liked_detail}
        </Text>
        <TouchableOpacity
          style={{ width }}
          onPress={() =>
            navigation.navigate("UserProfile", {
              item,
            })
          }
        >
          <Image
            source={{ uri: item.avatar }}
            style={[styles.image, { width: "90%", resizeMode: "contain" }]}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Message: {item.opening_message}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() =>
              fetch(
                `https://pea-pod-api.herokuapp.com/user/${userName}/matches`,
                {
                  method: "PATCH",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    new_match: item.name,
                    rejected: "true",
                  }),
                }
              )
            }
          >
            Peazz not them!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chat", { otherUser: item.name })}
        >
          <Text
            style={styles.buttonText}
            onPress={() =>
              fetch(
                `https://pea-pod-api.herokuapp.com/user/${userName}/matches`,
                {
                  method: "PATCH",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    new_match: item.name,
                    rejected: "false",
                  }),
                }
              )
            }
          >
            Message
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f7f7f7",
    paddingTop: 20,
    paddingBottom: 15,
  },
  titleText: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#f7f7f7",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 17,
  },
  image: {
    justifyContent: "center",
    alignContent: "center",
    margin: 15,
    borderRadius: 80,
    height: 250,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "green",
    borderRadius: 20,
    alignSelf: "center",
    width: 140,
  },
  buttonText: {
    color: "white",
  },
});
