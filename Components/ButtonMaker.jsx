import { Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";

export default function ButtonMaker({
  interest,
  selectedInterests,
  setSelectedInterests,
}) {
  const [isPressed, setIsPressed] = useState("white");

  useEffect(() => {
    if (selectedInterests.includes(interest)) setIsPressed("#E4FFE0");
    else setIsPressed("white");
  }, [selectedInterests]);

  const styles = StyleSheet.create({
    button: {
      height: 35,
      width: 120,
      backgroundColor: `${isPressed}`,
      borderColor: "black",
      borderWidth: 1,
      marginBottom: 10,
      marginLeft: 10,
      borderRadius: 70,
    },
    text: {
      fontSize: 12,
    },
  });

  function handleClick() {
    if (selectedInterests.includes(interest))
      setSelectedInterests(() => {
        interestsCopy = [...selectedInterests];
        return interestsCopy.filter((item) => item != interest);
      });
    else
      setSelectedInterests(() => {
        interestsCopy = [...selectedInterests];
        interestsCopy.push(interest);
        return interestsCopy;
      });
  }

  return (
    <Button style={styles.button} onPress={handleClick}>
      <Text style={styles.text}>{interest}</Text>
    </Button>
  );
}
