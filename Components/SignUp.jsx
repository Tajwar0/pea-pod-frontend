import { Formik } from "formik";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useState } from "react";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../validation/validation";
export default function SignUp({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [pass2Message, setPass2Message] = useState("");

  return (
    <View>
      <Text style={{ margin: 20, textAlign: "center", fontSize: 26 }}>
        Sign up
      </Text>

      <View style={styles.SignUpContainer}>
        <Formik
          initialValues={{
            Username: "",
            email: "",
            Password: "",
            Password2: "",
          }}
          onSubmit={(values) => {
            console.log(values.Password, values.Password2);
            console.log(values.Password === values.password2);
            if (validateUsername(values.Username) === null) {
              setUserMessage("Please enter a valid Username\n\n");
            } else setUserMessage("Username is good\n\n");
            if (validateEmail(values.email) === null) {
              setEmailMessage("Please enter a valid Email address\n\n");
            } else setEmailMessage("email is good\n\n");
            if (values.Password2 != values.password) {
              setPass2Message("Passwords do not match");
            } else if (validatePassword(values.Password) === null) {
              setPassMessage(
                "Password must have minimum 8 characters, at least 1 letter and 1 number"
              );
            } else setPass2Message("Password is good\n\n");

            if (
              validateUsername(values.Username) !== null &&
              validateEmail(values.email) !== null &&
              validatePassword(values.Password) !== null &&
              values.Password2 == values.password
            ) {
              navigation.navigate("Tabs");
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
      >{`${userMessage} ${emailMessage} ${passMessage} ${pass2Message}`}</Text>
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
  },
});
