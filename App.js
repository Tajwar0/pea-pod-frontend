import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Tabs from "./Components/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./Components/SignUp";
import LikesPage from "./Components/LikesStack/LikesPage";
import UserProfile from "./Components/LikesStack/UserProfile";
import MatchingPage from "./Components/MatchingStack/MatchingPage";
import MatchProfiles from "./Components/MatchingStack/MatchProfiles";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Group>
          <Stack.Screen
            name="LikesPage"
            component={LikesPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ headerShown: true }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="MatchingPage"
            component={MatchingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MatchProfiles"
            component={MatchProfiles}
            options={{ headerShown: true }}
          />
        </Stack.Group>
        R
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    alignItems: "center",
  },
});
