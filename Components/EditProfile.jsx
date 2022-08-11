import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import {
  Avatar,
  Button,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import {useState, useEffect} from "react";

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
});

export default function EditProfile({ route, navigation }) {
  const { user } = route.params;
  const [proPic, setProPic] = useState(user.img)
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(()=>{
    (async() =>{
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'Granted');
    })
  }, [])

  const chooseFromLibrary = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality:1,
    });
    console.log(result);

  if(!result.cancelled){
    setProPic(result.uri);
  }
  }

  if(hasGalleryPermission === false){
    return (<Text>No access to Internal Storage granted</Text>)
  }
  
  
  
  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.name} placeholder={user.name} />
      <TextInput style={styles.userName} placeholder={user.userName}/>
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
        {/* {proPic ? <Image source={{uri: proPic}}/> : null} */}
      </View>

      <View>
        <View>
          <Text>
            <Icon name="pin" size={20} color="black" />
            {user.location}
          </Text>
        </View>
        <View>
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
      </View>
    </ScrollView>
  );
}
