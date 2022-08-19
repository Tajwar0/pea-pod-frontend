import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useContext } from "react";
import ButtonMaker from "./ButtonMaker";
import { UserContext } from "../Contexts/User";
import { useFocusEffect } from "@react-navigation/native";

export default function EditProfile({ route, navigation }) {
  const { userName } = useContext(UserContext);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [proPic, setProPic] = useState();
  const [user, setUser] = useState();
  const [responseBack, setResponseBack] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const interestChoices = [
    "Football",
    "Cinema",
    "Dancing",
    "Tennis",
    "Gaming",
    "Make Up",
  ];

  useFocusEffect(() => {
    setProPic(user && user[userName]?.avatar);
  });

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    user && setSelectedInterests([...user[userName]?.interests]);
  }, [user]);

  useEffect(() => {
    if (isFirstRender) return setIsFirstRender(false);

    const updateUser = async () => {
      try {
        const response = await fetch(
          "https://pea-pod-api.herokuapp.com/user/" + userName + "/details",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              interests: selectedInterests,
            }),
          }
        );
        const json = await response.json();
        setResponseBack(json);
      } catch (error) {
        console.error(error);
      }
    };
    updateUser();
  }, [selectedInterests]);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "Granted");
    };
  }, []);

  const chooseFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProPic(result.uri);

      fetch("https://pea-pod-api.herokuapp.com/user/" + userName + "/details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: result.uri,
        }),
      });
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage granted</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{userName}</Text>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <View>
          <Image
            style={styles.proPicContainer}
            source={{ uri: user && user[userName].avatar }}
          />
        </View>

        <Button mode="elevated" onPress={() => chooseFromLibrary()}>
          Upload Photo
        </Button>
      </View>
      <View style={styles.locationsContainer}>
        <View>
          <Text style={styles.locationText}>Your Location</Text>
          <TextInput
            style={styles.locationText}
            placeholder={
              user && user[userName]?.location + "\n" + "(click to change...)"
            }
            onChangeText={(text) => setLocation(text)}
            onBlur={() => {
              fetch(
                "https://pea-pod-api.herokuapp.com/user/" +
                  userName +
                  "/details",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    location: location,
                  }),
                }
              );
            }}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.locationText}>Your Gender</Text>
          <TextInput
            style={styles.locationText}
            placeholder={
              user && user[userName]?.gender + "\n" + "(click to change...)"
            }
            onChangeText={(text) => setGender(text)}
            onBlur={() => {
              fetch(
                "https://pea-pod-api.herokuapp.com/user/" +
                  userName +
                  "/details",
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    gender: gender,
                  }),
                }
              );
            }}
          ></TextInput>
        </View>
      </View>
      <View style={styles.hr}></View>
      <Text style={styles.subheadingText}>Pick Your Interests</Text>
      <View style={styles.interestsContainer}>
        {interestChoices.map((interest) => (
          <ButtonMaker
            key={interest}
            interest={interest}
            selectedInterests={selectedInterests}
            setSelectedInterests={setSelectedInterests}
          />
        ))}
      </View>
      <View style={styles.hr}></View>
      <Text style={styles.subheadingText}>
        Tell us a little bit about you...
      </Text>
      <View style={styles.bioContainer}>
        <TextInput
          style={styles.bioText}
          placeholder={user && user[userName]?.bio + " (click to change...)"}
          onChangeText={(text) => setBio(text)}
          onBlur={() => {
            fetch(
              "https://pea-pod-api.herokuapp.com/user/" + userName + "/details",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  bio: bio,
                }),
              }
            );
          }}
        ></TextInput>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f7f7f7",
  },
  proPicContainer: {
    backgroundColor: "#f7f7f7",
    alignContent: "center",
    alignSelf: "center",
    height: 300,
    width: 300,
    borderRadius: 80,
    margin: 10,
  },
  text: {
    color: "green",
  },
  headerText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 30,
  },
  subheadingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  hr: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "70%",
    alignSelf: "center",
    marginBottom: 5,
  },
  locationsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    marginBottom: 15,
  },
  locationText: {
    fontSize: 20,
  },
  interestsContainer: {
    backgroundColor: "#f7f7f7",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 10,
    width: "85%",
    marginBottom: 15,
  },
  interestsText: {
    backgroundColor: "#aadea2",
    fontSize: 17,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 13,
    paddingRight: 13,
    margin: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "green",
  },
  bioContainer: {
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    minHeight: 50,
    padding: 10,
  },
  bioText: {
    alignSelf: "center",
    fontSize: 20,
  },
});
