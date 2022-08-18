import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { UserContext } from "../../Contexts/User";
import MatchProfiles from "./MatchProfiles";

export default function MatchingPage({ navigation }) {
  const {userName} = useContext(UserContext)
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [userList, setUserList] = useState();
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreCoveragePercentThreshold: 50 }).current;

  useFocusEffect(() => {
    const getUsers = async () => {
      try {
        const userObj = await fetch("https://pea-pod-api.herokuapp.com/user/" + userName)
        const user = await userObj.json()
        const response = await fetch("https://pea-pod-api.herokuapp.com/users");
        let json = await response.json();
        json = json.filter((item) => item._id !== userName)
        json = json.filter((item) => !user[userName].incoming_likes.map(el => el.name).includes(item._id))
        json = json.filter((item) => !user[userName].matches.map(el => el.name).includes(item._id))
        json = json.filter((item) => !item[item._id].incoming_likes.map(el => el.name).includes(userName))
        setUserList(json);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  });

  return (
    <View style={{flex:1}}>
      <ScrollView style={{ flex: 1 }}>
        {/* <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}> */}
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <MatchProfiles item={item} navigation={navigation} setUserList={setUserList} />
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
