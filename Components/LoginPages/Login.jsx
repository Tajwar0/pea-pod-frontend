import { Formik } from "formik";
import { StyleSheet, Text, TextInput, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
  const { userName, setUserName } = useContext(UserContext);

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
    <View style={styles.screenContainer}>
      <View>
        <Image
          style={styles.headerImg}
          source={require("../../assets/peapod.png")}
        />
        <Text style={styles.headerText}>Login</Text>
      </View>
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
              setUserName(values.Username);
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
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.linkText}>Not a pea? Sign up here!</Text>
              </TouchableOpacity>
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
  screenContainer: {
    alignItems: "center",
    paddingTop: 100,
    height: "100%",
    backgroundColor: "#f7f7f7",
  },
  LoginContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10,
    width: "100%",
    backgroundColor: "#f7f7f7",
  },
  headerImg: {
    height: 100,
    width: 200,
  },
  headerText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 26,
    paddingTop: 20,
  },
  TextInput: {
    height: 40,
    width: "80%",
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "green",
    borderRadius: 20,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    alignSelf: "center",
    paddingTop: 10,
  },
  linkText: {
    fontSize: 16,
  },
});
