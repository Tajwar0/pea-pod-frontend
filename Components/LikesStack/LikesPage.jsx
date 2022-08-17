import { useState, useRef, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Animated } from "react-native";
import LikesItem from "./LikesItem";
import { UserContext } from "../../Contexts/User";

export default function LikesPage({ navigation }) {
  const userName = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userMatches, setUserMatches] = useState();
  useEffect(() => {
    console.log(userName);
    const getUserMatches = async () => {
      try {
        const response = await fetch(
          `https://pea-pod-api.herokuapp.com/user/${userName}/incoming_likes`
        );
        const json = await response.json();
        setUserMatches(json);
        console.log(json);
      } catch (error) {
        console.log(userName);
        console.error(JSON.stringify(error));
      }
    };
    getUserMatches();
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreCoveragePercentThreshold: 50 }).current;
  
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
    return (
      <View style={[{ flex: 0.7 }, { width }]}>
        <View style={[{ flex: 0.3 }, styles.container]}>
          <Text>
            {item.name} wants to get to know you{"\n"}
          </Text>
          <Text>
            What {item.name} liked your {item.liked_detail}
          </Text>
          <Text>
            {item.name} said {item.opening_message}
          </Text>
          {/* <TouchableOpacity
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
          // </TouchableOpacity>
         */}
        </View>
        <View>
          <Button
            title="Peazz not them"
            style={styles.crossButton}
            // onPress removes the profile from interested profiles and refreshes the page
          />
          <Button
            title="Message"
            style={styles.messageButton}
            //  onPress? Allows user to open message in new text box? with reply functionality?
          />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
