import * as React from "react";
import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./Home";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Pod from "./Pod";
import Settings from "./Settings";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const homeName = "Home";
const profileName = "Profile";
const podName = "Pod";
const settingsName = "Settings";

const ProfileStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const user = {
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJV5PDnfxMoLlHXGzi-7ZbynVckjLn8fI3iC9vVc0EFVKVdkqp2AZAKoGYs02A_Kg4Drc&usqp=CAU",
  name: "Elon Musk",
  userName: "@father_zillionaire",
  location: "US/Space",
  phone: "+00-000000000",
  email: "billionare@capitalism.com",
  gender: "male",
};

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === homeName) {
            iconName = focused ? "home" : "home-outline";
            color = "green";
          } else if (routeName === profileName) {
            iconName = focused ? "person" : "person-outline";
            color = "red";
          } else if (routeName === podName) {
            iconName = focused ? "people" : "people-outline";
            color = "purple";
          } else if (routeName === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
            color = "grey";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home}></Tab.Screen>
      <Tab.Screen
        name={profileName}
        component={ProfileStackScreen}
      ></Tab.Screen>
      <Tab.Screen name={podName} component={Pod}></Tab.Screen>
      <Tab.Screen name={settingsName} component={Settings}></Tab.Screen>
    </Tab.Navigator>
  );
}

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "white",
        shadowColor: "white",
        elevation: 0,
      },
      headerShadowVisible: false,
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerRight: () => (
          <Icon.Button
            name="account-edit"
            size={40}
            backgroundColor="white"
            color="black"
            onPress={() =>
              navigation.navigate("EditProfile", {
                id: Math.floor(Math.random() * 100),
                user: user,
              })
            }
          />
        ),
      }}
    />
    <ProfileStack.Screen
      name="EditProfile"
      options={{
        title: "Edit Profile",
      }}
      component={EditProfile}
    />
  </ProfileStack.Navigator>
);
