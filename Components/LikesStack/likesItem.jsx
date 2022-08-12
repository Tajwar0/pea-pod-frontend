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

  return (
    <View style={[{ flex: 0.7 }, { width }]}>
      <View style={[{ flex: 0.3 }, styles.container]}>
        <Text>
          {item.name} wants to get to know you{"\n"}
        </Text>
        <Text>What {item.name} liked about you</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Tabs", { screen: "Profile" })}
        >
          <Image
            source={item.image}
            style={[styles.image, { width, resizeMode: "contain" }]}
          />
        </TouchableOpacity>

        <Text style={styles.container}>{item.description}</Text>
      </View>

      <Button title="Peazz not them" style={styles.CrossButton}></Button>
      <Button title="Message" style={styles.messageButton} />
    </View>
  );
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
  },
});
