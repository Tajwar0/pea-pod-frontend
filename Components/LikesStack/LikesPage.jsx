import { useState, useRef } from "react";
import { View, FlatList, StyleSheet, Animated, Text } from "react-native";
import slides from "../../assets/slides";
import LikesItem from "./LikesItem";

export default function LikesPage({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({ viewableItems, navigation }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreCoveragePercentThreshold: 50 }).current;
  return (
    <View style={{ flex: 3}}>
      <Text style={styles.headerText}>
        See Who Likes You
      </Text>
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <LikesItem item={item} navigation={navigation} />
        )}
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
  headerText: {
    marginBottom: 20, 
    textAlign: "left",
    paddingLeft: 8, 
    fontSize: 20,
    paddingTop: 20,
  }
});
