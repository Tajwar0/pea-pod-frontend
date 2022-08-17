import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MatchProfiles from "./MatchProfiles";

export default function MatchingPage({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userList, setUserList] = useState();
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("https://pea-pod-api.herokuapp.com/users");
        const json = await response.json();
        console.log(json[0])
        setUserList(json);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <View style={{flex:1}}>
      <ScrollView style={{ flex: 1 }}>
        {/* <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}> */}
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <MatchProfiles item={item} navigation={navigation} />
          )}
          horizontal
          // showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item._id}
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
      </ScrollView>
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
