import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Request,
} from "react-native";
import { useState } from "react";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../../validation/validation";

export default function SignUp({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [user, setUser] = useState({});

  // const createUser = new Request(
  //   `fetch(https://pea-pod-api.herokuapp.com/user/${user.username}`,
  //   {
  //     method: "PUT",
  //     body: `{password: ${user.password}})`,
  //   }
  // );

  return (
    <View>
      <View style={styles.SignUpContainer}>
        <Formik
          initialValues={{
            Username: "",
            email: "",
            Password: "",
            Password2: "",
          }}
          onSubmit={(values) => {
            if (validateUsername(values.Username) === null) {
              setUserMessage("Please enter a valid Username\n\n");
            } else setUserMessage("Username is good\n\n");

            if (validateEmail(values.email) === null) {
              setEmailMessage("Please enter a valid Email address\n\n");
            } else setEmailMessage("email is good\n\n");

            if (values.Password !== values.Password2) {
              setPassMessage("Passwords do not match");
            } else if (validatePassword(values.Password) === null) {
              setPassMessage(
                "Password must have minimum of 8 characters with at least 1 letter and 1 number"
              );
            } else setPassMessage("Password is good");

            if (
              validateUsername(values.Username) !== null &&
              validateEmail(values.email) !== null &&
              validatePassword(values.Password) !== null &&
              values.Password === values.Password2
            ) {
              setUser({ username: values.Username });
              navigation.navigate("Tabs");
              // createUser
              // send to backend
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
                name="email"
                placeholder="Enter your Email Address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
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
              <TextInput
                name="password"
                placeholder="Re-enter your password"
                onChangeText={props.handleChange("Password2")}
                value={props.values.Password2}
                style={styles.TextInput}
                secureTextEntry
              />

              <Button
                style={styles.button}
                title="SignUp"
                color="#50C878"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
      <Text
        style={{ justifyContent: "center" }}
      >{`${userMessage} ${emailMessage} ${passMessage} `}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  SignUpContainer: {
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
});
