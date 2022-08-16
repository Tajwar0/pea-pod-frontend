import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

import MatchingPage from "./MatchingStack/MatchingPage";
import Profile from "./Profile";
import Pod from "./Pod";
import LikesPage from "./LikesStack/LikesPage.jsx";

const Tab = createBottomTabNavigator();
const matchingPageName = "MatchingPage";
const profileName = "Profile";
const podName = "Pod";
const LikesName = "LikesPage";

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="MatchingPage"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === matchingPageName) {
            iconName = focused ? "home" : "home-outline";
            color = "green";
          } else if (routeName === profileName) {
            iconName = focused ? "person" : "person-outline";
            color = "orange";
          } else if (routeName === podName) {
            iconName = focused ? "people" : "people-outline";
            color = "purple";
          } else if (routeName === LikesName) {
            iconName = focused ? "heart" : "heart-outline";
            color = "red";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={matchingPageName} component={MatchingPage}></Tab.Screen>
      <Tab.Screen name={LikesName} component={LikesPage}></Tab.Screen>
      <Tab.Screen name={podName} component={Pod}></Tab.Screen>
      <Tab.Screen name={profileName} component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
}

// const ProfileStackScreen = ({ navigation}) => (
//   <ProfileStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: "white",
//         shadowColor: "white",
//         elevation: 0,
//       },
//       headerShadowVisible: false,
//       headerTintColor: "white",
//       headerTitleStyle: {
//         fontWeight: "bold",
//       },
//     }}
//   >
//     <ProfileStack.Screen
//       name="profile"
//       component={Profile}
//       options={{
//         headerRight: () => (
//           <Icon.Button
//             name="account-edit"
//             size={40}
//             backgroundColor="white"
//             color="black"
//             onPress={() =>
//               navigation.navigate("EditProfile", {
//                 id: Math.floor(Math.random() * 100),
//                 user: user,
//               })
//             }
//           />
//         ),
//       }}
//     />
//     <ProfileStack.Screen
//       name="EditProfile"
//       options={{
//         title: "Edit Profile",
//         headerLeft: () => (
//           <Icon.Button
//             name="account"
//             size={40}
//             backgroundColor="white"
//             color="black"
//             onPress={() =>
//              navigation.navigate("profile")
//             }title="Go back from Edit Profile"
//           />
//         )
//       }}
//       component={EditProfile}
//     />
//   </ProfileStack.Navigator>
// );
