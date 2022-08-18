import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import uuid from 'react-native-uuid';
export default function MatchProfiles({ item, navigation }) {
  const { width } = useWindowDimensions();
  const [name, setName] = useState(item._id);
  const [user, setUser] = useState(item[name]);
  return (
    <View>
      <View style={[{ flex: 0.7 }, { width }]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserProfile", {
              item,
            })
          }
        >
          <Image
            source={require("../../assets/favicon.png")}
            style={{ width, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.container, { flex: 0.3 }]}>
        <Text style={{}}>{name}</Text>
        <Text> {name}</Text>
        <Text style={styles.container}>{user.location}</Text>
        {user.interests.length > 0 && user.interests.map((interest) => {
          return <Text style={styles.container} key={uuid.v4()}>{interest}</Text>;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  crossButton: {},
  messageButton: {
    backgroundColor: "Green",
    color: "white",
    borderRadius: 10,
  },
});
