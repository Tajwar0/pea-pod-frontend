import { useState, useRef, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Animated } from "react-native";
import slides from "../../assets/slides";
import LikesItem from "./LikesItem";
import { UserContext } from "../../Contexts/User";

export default function LikesPage({ navigation }) {
  const { userName } = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userMatches, setUserMatches] = useState();

  useEffect(() => {
    const getUserMatches = async () => {
      try {
        const response = await fetch(
          `https://pea-pod-api.herokuapp.com/user/Morpungo/incoming_likes`
        );
        const json = await response.json();
        setUserMatches(json);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    };
    getUserMatches();
  }, []);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreCoveragePercentThreshold: 50 }).current;

  return (
    <View style={{ flex: 3 }}>
      <FlatList
        data={userMatches}
        renderItem={({ item }) => (
          <LikesItem item={item} navigation={navigation} />
        )}
        horizontal
        // showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.name}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        itemVisiblePercentThreshold={viewConfig}
        scrollEventThrottle={30}
      />
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
