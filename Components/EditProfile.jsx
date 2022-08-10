import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import {
  Avatar,
  Button,
  Title,
  Caption,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";


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
    borderRadius: "50%",
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
  const [proPic, setProPic] = useState([])

  function uploadProfilePicture(){
    let options ={
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
    }

    launchImageLibrary(options, response =>{
        if(response.didCancel){
            alert('User cancelled image picker')
        }else if(response.errorCode === 'permission'){
            alert('Permission denied')
        }else if(response.errorCode === 'others'){
            alert('Others')
        }else if(response.assest[0].fileSize > 2000000){
            alert('Max image size exceeded')
        }else{
            setProPic(response.assets[0].base64)
        }
    } )
  }
  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.name} placeholder={user.name} />
      <TextInput style={styles.userName} placeholder={user.userName}/>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <View>
          <Avatar.Image
            style={styles.proPicContainer}
            source={{ uri: user.img }}
            size={300}
          />
        </View>
        <Button mode="elevated" onPress={() => uploadProfilePicture()}>
          Upload Photo
        </Button>
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
