import * as React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList } from "react-native";
import { Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useContext } from "react";
import ButtonMaker from "./ButtonMaker";
import { UserContext } from "../Contexts/User";

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
  const userName = useContext(UserContext);
  const [proPic, setProPic] = useState();
  
  const [user, setUser] = useState();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [responseBack, setResponseBack] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch(
        "https://pea-pod-api.herokuapp.com/user/" + userName
      );
      const json = await response.json();
      setUser(json);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.userName}>
        {user._id}
      </Text>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <View>
          <Avatar.Image 
            style={styles.proPicContainer}
            source={{ uri: proPic }}
            size={300}
          />
        </View>
      </View> 
      
      <View>
        <Text>
          <Icon name="pin" size={20} color="black" />
          {user.location}
        </Text>
      </View>
        
      <View>
        <Text>
          <Icon name="gender-transgender" size={20} color="black" />
          {user.gender}
        </Text>
      </View>
      

      <View style={styles.buttonBlock}>
        {user[userName].interests.map((interest) => (
          <FlatList
            key={interest}
          >
            {interest}
          </FlatList>
        ))}
      </View>

      
    </ScrollView>
  );
}