import { useState, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import slides from "../../assets/slides";
import LikesItem from "./likesItem";

export default function Likes({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreCoveragePercentThreshold: 50 }).current;
  return (
    <View style={{ flex: 3 }}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <LikesItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
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
        navigation={navigation}
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
