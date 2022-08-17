import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Request,
  Image,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../../validation/validation";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../../Contexts/User";

export default function SignUp({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const { setUserName } = useContext(UserContext);

  return (
    <View style={styles.screenContainer}>
      <View>
        <Image
          style={styles.headerImg}
          source={require("../../assets/peapod.png")}
        />
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
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
              fetch(
                `https://pea-pod-api.herokuapp.com/user/${values.Username}`,
                {
                  method: "PUT",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    password: values.Password,
                    email: values.Email,
                  }),
                }
              ).then((res) => {
                console.log(JSON.stringify(res));
                setUserName(user);
              });
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
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.linkText}>Already a pea? Log in here!</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <Text
        style={{ justifyContent: "center", color: "red" }}
      >{`${userMessage} ${emailMessage} ${passMessage} `}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: "center",
    paddingTop: 60,
    height: "100%",
    backgroundColor: "#f7f7f7",
  },
  SignUpContainer: {
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
