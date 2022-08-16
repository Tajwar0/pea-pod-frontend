import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Tabs from "./Components/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Components/LoginPages/Login";
import SignUp from "./Components/LoginPages/SignUp";
import LikesPage from "./Components/LikesStack/LikesPage";
import UserProfile from "./Components/LikesStack/UserProfile";
import MatchingPage from "./Components/MatchingStack/MatchingPage";
import MatchProfiles from "./Components/MatchingStack/MatchProfiles";
import Profile from "./Components/Profile";
import EditProfile from "./Components/EditProfile";
const Stack = createStackNavigator();
import { UserContext } from "./Contexts/User";

export default function App() {
  const [isLogged, setLogged] = useState(true);
  const [user, setUser] = useState("");
  useEffect(() => {
    if (user !== "") setLogged(true);
    else setLogged(false);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLogged ? "Tabs" : "Login"}>
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: true }}
            />
          </Stack.Group>
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
          <Stack.Group>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
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
