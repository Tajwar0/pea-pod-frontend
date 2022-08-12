import { Formik } from "formik";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useState } from "react";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../validation/validation";
export default function Login({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");

  return (
    <View>
      <Text style={{ margin: "20px", textAlign: "center", fontSize: 26 }}>
        Login
      </Text>

      <View style={styles.loginContainer}>
        <Formik
          initialValues={{ Username: "", email: "", Password: "" }}
          onSubmit={(values) => {
            if (validateUsername(values.Username) === null) {
              setUserMessage("Please enter a valid Username\n\n");
            } else setUserMessage("Username is good\n\n");
            if (validateEmail(values.email) === null) {
              setEmailMessage("Please enter a validEmail address\n\n");
            } else setEmailMessage("email is good\n\n");
            if (validatePassword(values.Password) === null) {
              setPassMessage(
                "Password must have minimum eight characters, at least one letter and one number"
              );
            } else setPassMessage("Password is good\n\n");
            if (
              validateUsername(values.Username) !== null &&
              validateEmail(values.email) !== null &&
              validatePassword(values.Password) !== null
            ) {
              navigation.navigate("Tabs");
            }
          }}
        >
          {(props) => (
            <View>
              <TextInput
                name="username"
                placeholder="Choose your username"
                onChangeText={props.handleChange("Username")}
                value={props.values.Username}
                style={styles.TextInput}
              />

              <TextInput
                name="email"
                placeholder="Email Address"
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

              <Button
                style={styles.button}
                title="Login"
                color="#50C878"
                onPress={props.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
      <Text>{`${userMessage} ${emailMessage} ${passMessage}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  TextInput: {
    height: 40,
    width: "100%",
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
