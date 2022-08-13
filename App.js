import { StyleSheet, Text, View } from "react-native";
import Tabs from "./Components/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./Components/SignUp";
import LikedProfile from "./Components/LikesStack/LikedProfile";
import LikesPage from "./Components/LikesStack/LikesPage";
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
            component={LikedProfile}
            options={{ headerShown: true }}
          />
        </Stack.Group>
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
