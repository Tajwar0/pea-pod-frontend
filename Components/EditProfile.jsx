import * as React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import ButtonMaker from "./ButtonMaker";

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
  //const { user } = route.params;
  //const [proPic, setProPic] = useState(user.img);
  
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const userInterests = [
    "Football",
    "Cinema",
    "Dancing",
    "Tennis",
    "Gaming",
    "Make Up",
  ];
  const [combinedInterests, setCombinedInterests] = useState([]);
  const [responseBack, setResponseBack] = useState("");
  const [userNameResponse, setUserNameResponse] = useState("");

  const [isPressed, setIsPressed] = useState(false);
  const strInterest = JSON.stringify(combinedInterests)
  const [user, setUser] = useState(JSON.stringify(responseBack));
  const [userId, changeUserId] = useState()

  // useEffect(() => {
  //   async () => {
  //     const galleryStatus =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus.status === "Granted");
  //   };
  // }, []);
  console.log(combinedInterests);
  console.log(strInterest);
  const updateInterests = async () => {
    try{
      const response = await fetch('https://pea-pod-api.herokuapp.com/user/Martin/details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          interests: `${combinedInterests}`
        })
      })
      const json = await response.json();
      setResponseBack(json);
    }catch(error){
      console.error(error);
    }
    setIsPressed(false);
  }

  useEffect(()=>{
    updateInterests();
  }, [isPressed]);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "Granted");
    };
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch(
        "https://pea-pod-api.herokuapp.com/user/Martin"
      );
      const json = await response.json();
      setUserNameResponse(json);
    } catch (error) {
      console.error(error);
    }
    setIsPressed(false);
  };

  useEffect(() => {
    getUser();
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
      <TextInput style={styles.name} 
      placeholder={userNameResponse._id} />
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

        {/* <View>
          <Text>
            <Icon name="phone" size={20} color="black" />
            {user.phone}
          </Text>
        </View>
        <View>
          <Text>
            <Icon name="email" size={20} color="black" />
            {user.email}
          </Text>
        </View>
        <View>
          <Text>
            <Icon name="gender-transgender" size={20} color="black" />
            {user.gender}
          </Text>
        </View>
      </View> */}

      <View style={styles.buttonBlock}>
        {userInterests.map((userInterest) => (
          <ButtonMaker
            key={userInterest}
            userInterest={userInterest}
            combinedInterests={combinedInterests}
            setCombinedInterests={setCombinedInterests}
          />
        ))}
      </View>
      <Button mode="elevated" onPress={() => setIsPressed(true)}>
        Save Changes
      </Button>

      <View>
        <Text>User Details: {JSON.stringify(responseBack)}</Text>
      </View>

        
    </ScrollView>
  );
}
