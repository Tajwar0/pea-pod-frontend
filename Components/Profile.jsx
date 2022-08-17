import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Title, Caption } from "react-native-paper";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonMaker from "./ButtonMaker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  proPicContainer: {
    shadowColor: "purple",
    shadowRadius: 30,
    shadowOpacity: 0.7,
    marginBottom: 10,
    alignContent: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    justifyContent: "space-between",
  },
  userName: {
    color: "grey",
    fontWeight: "900",
    textAlign: "center",
    justifyContent: "space-between",
  },
});
export default function Profile({navigation}) {
  
  const user = {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJV5PDnfxMoLlHXGzi-7ZbynVckjLn8fI3iC9vVc0EFVKVdkqp2AZAKoGYs02A_Kg4Drc&usqp=CAU",
    name: "Elon Musk",
    userName: "@father_zillionaire",
    location: "US/Space",
    phone: "+00-000000000",
    email: "billionare@capitalism.com",
    gender: "male",
  };
 
  // const getLikes = async () => {
  //   try{
  //     const response = await fetch("https://pea-pod-api.herokuapp.com/user/Bean/incoming_likes");
  //     setLikes(response);
  //   }catch(error){
  //     console.error(error);
  //   }
  // }

  // useEffect(()=>{
  //   getLikes();
  // }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Caption style={styles.userName}>{user.userName}</Caption>
      <View style={{ marginTop: 24, alignItems: "center" }}>
        <View>
          <Avatar.Image
            style={styles.proPicContainer}
            source={{ uri: user.img }}
            size={300}
          />
        </View>
      </View>

      <View>
      <View>
          <Text>
            <Icon name="cards-heart-outline" size={20} color="black" />
            Likes: 0
          </Text>
        </View>
        <View>
          <Text>
            <Icon name="pin" size={20} color="black" />
            {user.location}
          </Text>
        </View>
        <View>
          <Text>
            <Icon name="phone" size={20} color="black" />
            {user.phone}
          </Text>
        </View>
        <View>
          <Text>
            <Icon name="email" size={20} color="black" />
            {user.email}
          </Text>
        </View>
        <View>
          <Text>
            <Icon name="gender-transgender" size={20} color="black" />
            {user.gender}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
