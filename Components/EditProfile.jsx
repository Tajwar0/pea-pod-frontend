import * as React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
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
  
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const interestChoices = [
    "Football",
    "Cinema",
    "Dancing",
    "Tennis",
    "Gaming",
    "Make Up",
  ];
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

  useEffect(() => {
    setSelectedInterests([...user.userName.interests])
  }, [user])


  useEffect(async () => {
    if (isFirstRender) return setIsFirstRender(false);

    try {
      const response = await fetch('https://pea-pod-api.herokuapp.com/user/' + userName + '/details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          interests: selectedInterests
        })
      })
      const json = await response.json();
      setResponseBack(json);
    } catch (error) {
      console.error(error);
    }
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
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage granted</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.name} placeholder={user._id} />
      <TextInput style={styles.userName} placeholder={user.userName} />
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <View>
          <Avatar.Image 
            style={styles.proPicContainer}
            source={{ uri: proPic }}
            size={300}
          />
        </View>

        <Button mode="elevated" onPress={() => chooseFromLibrary()}>
          Upload Photo
        </Button>
      </View> 
  
      <View>
        <Text>Updated Interests: {strInterest}</Text>
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
        {interestChoices.map((interest) => (
          <ButtonMaker
            key={interest}
            interest={interest}
            selectedInterests={selectedInterests}
            setSelectedInterests={setSelectedInterests}
          />
        ))}
      </View>

      <View>
        <Text>User Details: {JSON.stringify(responseBack)}</Text>
      </View>  
    </ScrollView>
  );
}
