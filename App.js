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
import Pod from "./Components/ChatStack/Pod";
import Chat from "./Components/ChatStack/Chat";

const Stack = createStackNavigator();
import { UserContext } from "./Contexts/User";

export default function App() {
  const [isLogged, setLogged] = useState(false);
  const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   console.log(userName);
  //   if (userName.length > 0) {
  //     setLogged(true);
  //   } else setLogged(false);
  // }, [userName]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLogged ? "Tabs" : "Login"}>
          <Stack.Group>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: true }}
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
          <Stack.Group>
            <Stack.Screen
              name="Pod"
              component={Pod}
              options={{ title: "The Pod" }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{ title: "Pea Pod Chat" }}
            />
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
