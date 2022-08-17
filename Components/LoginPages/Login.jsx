import { Formik } from "formik";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/User";
import {
  validateUsername,
  validatePassword,
} from "../../validation/validation";

export default function Login({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [userCheck, setUserCheck] = useState();
  const [userInput, setUserInput] = useState("");
  const { setUserName } = useContext(UserContext);

  // useEffect(() => {
  //   if (userInput !== "") {
  //     const getUser = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://pea-pod-api.herokuapp.com/user/${userInput}`
  //         );
  //         const json = await response.json();
  //         setUserCheck(json._id);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getUser();
  //   }
  // }, [userInput]);

  return (
    <View>
      <Text style={{ margin: 20, textAlign: "center", fontSize: 26 }}>
        Login
      </Text>

      <View style={styles.LoginContainer}>
        <Formik
          initialValues={{
            Username: "",
            Password: "",
          }}
          onSubmit={(values) => {
            setUserInput(values.Username);
            // if (userCheck !== values.Username) {
            //   setUserMessage("Username does not exist\n");
            // }
            if (validateUsername(values.Username) === null) {
              setUserMessage("Please enter a valid Username\n\n");
            }
            if (validatePassword(values.Password) === null) {
              setPassMessage(
                "Password must have minimum of 8 characters with at least 1 letter and 1 number"
              );
            }
            if (
              validateUsername(values.Username) !== null &&
              validatePassword(values.Password) !== null
            ) {
              setUserName(userInput);
              navigation.navigate("Tabs");
            }
          }}
        >
          {(props) => (
            <View>
              <TextInput
                name="username"
                placeholder="Create a new username"
                onChangeText={props.handleChange("Username")}
                value={props.values.Username}
                style={styles.TextInput}
              />

              <TextInput
                name="password"
                placeholder="Super secret password"
                onChangeText={props.handleChange("Password")}
                value={props.values.Password}
                style={styles.TextInput}
                secureTextEntry
              />
              <Button
                style={styles.button}
                title="Login"
                color="#50C878"
                onPress={props.handleSubmit}
              />
              <View style={styles.space} />
              <Button
                style={styles.button}
                title="Sign up instead"
                color="#50C878"
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              />
            </View>
          )}
        </Formik>
      </View>
      <Text
        style={{ justifyContent: "center" }}
      >{`${userMessage} ${passMessage} `}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  LoginContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  TextInput: {
    height: 40,
    width: 200,
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginBottom: 20,
  },
  space: {
    width: 20,
    height: 10,
  },
});
