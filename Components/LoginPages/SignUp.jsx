import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Request,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../../validation/validation";
import { UserContext } from "../../Contexts/User";

export default function SignUp({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const { userName, setUserName } = useContext(UserContext);

  return (
    <View>
      <View style={styles.SignUpContainer}>
        <Formik
          initialValues={{
            Username: "",
            Email: "",
            Password: "",
            Password2: "",
          }}
          onSubmit={(values) => {
            if (validateUsername(values.Username) === null) {
              setUserMessage("Please enter a valid Username\n\n");
            } else setUserMessage("Username is good\n\n");

            if (validateEmail(values.Email) === null) {
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
              validateEmail(values.Email) !== null &&
              validatePassword(values.Password) !== null &&
              values.Password === values.Password2
            ) {
              setUserName(values.Username);
              navigation.navigate("Tabs");

              //   fetch(`https://pea-pod-api.herokuapp.com/user/${user}`, {
              //     method: "PUT",
              //     headers: {
              //       Accept: "application/json",
              //       "Content-Type": "application/json",
              //     },
              //     body: JSON.stringify({
              //       password: pass,
              //       Email: email,
              //     }),
              //   }).then((res) => {
              //     console.log(JSON.stringify(res));
              //     setUserName(user);
              //     console.log(user, "<---user");
              //   });
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
                name="Email"
                placeholder="Enter your Email Address"
                onChangeText={props.handleChange("Email")}
                value={props.values.Email}
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
