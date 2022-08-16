import * as React from "react";
import { View, Text } from "react-native";
export default function UserProfile({ route }) {
  const { item } = route.params;

  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
  );
}
