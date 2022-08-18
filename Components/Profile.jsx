import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useContext } from "react";
import ButtonMaker from "./ButtonMaker";
import { UserContext } from "../Contexts/User";
import { useFocusEffect } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  proPicContainer: {
    shadowColor: "purple",
    shadowRadius: 30,
    shadowOpacity: 0.7,
    marginBottom: 20,
    alignContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "space-between",
  },
  userName: {
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    justifyContent: "space-between",
  },
  buttonBlock: {
    backgroundColor: "white",
    display: "flex",
    marginRight: 10,
  },
});

export default function EditProfile({ route, navigation }) {
  const { userName } = useContext(UserContext);
  const [user, setUser] = useState();

  useFocusEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "https://pea-pod-api.herokuapp.com/user/" + userName
        );
        const json = await response.json();
        setUser(json);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.userName}>{user?._id}</Text>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <View>
          <Avatar.Image
            style={styles.proPicContainer}
            source={{ uri: user && user[userName]?.avatar }}
            size={300}
          />
        </View>
      </View>

      <View>
        <Text>
          <Icon name="pin" size={20} color="black" />
          {user && user[userName]?.location}
        </Text>
      </View>

      <View>
        <Text>
          <Icon name="gender-transgender" size={20} color="black" />
          {user && user[userName]?.gender}
        </Text>
      </View>

      <View>
        {user &&
          user[userName]?.interests.map((interest) => (
            <Text key={interest}>{interest}</Text>
          ))}
      </View>

      <View>
        <Text>{user && user[userName]?.bio}</Text>
      </View>
    </ScrollView>
  );
}
