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
        <Text style={styles.text}>
          {item.name} wants to get to know you{"\n"}
        </Text>
        <Text style={styles.text}>What {item.name} liked about you</Text>
        <TouchableOpacity
          style={{backgroundColor: "green"}}
          onPress={() =>
            navigation.navigate("UserProfile", {
              item,
            })
          }
        >
          <Image
            source={item.image}
            style={[styles.image, { width, resizeMode: "contain" }]}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          // onPress removes the profile from interested profiles and refreshes the page
        >
          <Text style={styles.buttonText}>Peazz not them!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          //  onPress? Allows user to open message in new text box? with reply functionality?
          >
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    backgroundColor: "orange"
  },
  text: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
    backgroundColor: "red"
  },
  image: {
    flex: 0.7,
    justifyContent: "center",
    margin: 15,
    borderRadius: '50%',
    backgroundColor: "blue"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  button: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "green",
    borderRadius: 20,
    alignSelf: 'center',
    width: 110
  },
  buttonText: {
    color: "white",
  },
});
