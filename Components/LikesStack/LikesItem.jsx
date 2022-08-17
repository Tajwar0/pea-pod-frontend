import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Button,
  TouchableOpacity,
} from "react-native";

export default function LikesItem({ item, navigation }) {
  const { width } = useWindowDimensions();
  // Array [
  //   Object {
  //     "liked_detail": "bio",
  //     "name": "Morpungo",
  //     "opening_message": "I like beans",
  //   },
  //   Object {
  //     "liked_detail": "bio",
  //     "name": "Martin",
  //     "opening_message": "I like beans",
  //   },
  // ] <---- usermatches
  return <View style={[{ flex: 0.7 }, { width }]}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
  },
  crossButton: {},
  messageButton: {
    backgroundColor: "Green",
    color: "white",
    borderRadius: 10,
  },
});
