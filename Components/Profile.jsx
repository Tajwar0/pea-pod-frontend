import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Image
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useContext } from "react";
import ButtonMaker from "./ButtonMaker";
import { UserContext } from "../Contexts/User";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <Text style={styles.headerText}>{user?._id}</Text>
        <Image 
          style={styles.proPicContainer}
          source={{ uri: user && user[userName].avatar }}
        />
        <View style={styles.locationsContainer}>
          <Text style={styles.locationText}>{user && user[userName].location}</Text>
          <Text style={styles.locationText}>{user && user[userName].gender}</Text>
        </View>
        <View style={styles.hr}></View>
        <Text style={styles.subheadingText}>Interests</Text>
        <View style={styles.interestsContainer}>
          {user && user[userName].interests.map((interest) => (
             <Text style={styles.interestsText} key={interest}>{interest}</Text>
          ))}
        </View>
        <View style={styles.hr}></View>
        <Text style={styles.subheadingText}>A little bit about me...</Text>
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>{user && user[userName].bio}</Text>
        </View>

      </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#f7f7f7',
  },
  proPicContainer: {
    backgroundColor: '#f7f7f7',    
    alignContent: "center",
    alignSelf: 'center', 
    height: 300,
    width: 300,
    borderRadius: 80,
    margin: 10
  },
  headerText: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: "bold",
    paddingBottom: 10
  },
  subheadingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
    },
    hr: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 5
    },
  locationsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    marginBottom: 15
  },
  locationText: {
    fontSize: 20
    },
  interestsContainer: {
    backgroundColor: '#f7f7f7',
    alignSelf: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 10,
    width: '80%',
    marginBottom: 15
  },
  interestsText: {
    backgroundColor: '#aadea2',
    fontSize: 20,
    padding: 8,
    margin: 10,
    borderRadius: 5,
},
bioContainer: {
  backgroundColor: '#f7f7f7',
  alignItems: 'center',
  minHeight: 50,
  padding: 10
  },
  bioText: {
  alignSelf: 'center'
  },
});
