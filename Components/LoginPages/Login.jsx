import { Formik } from "formik";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useContext } from "react";
import { UserContext } from "../../Contexts/User";
import { validatePassword } from "../../validation/validation";

export default function Login({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const { userName, setUserName } = useContext(UserContext);

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
            if (validatePassword(values.Password) === null) {
              setPassMessage(
                "Password must have minimum of 8 characters with at least 1 letter and 1 number"
              );
            }
            if (validatePassword(values.Password) !== null) {
              setPassMessage("");
              setUserMessage("");
              fetch(
                `https://pea-pod-api.herokuapp.com/user/${values.Username}`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    password: values.Password,
                  }),
                }
              ).then((res) => {
                setUserName(values.Username);
                res.status == 200
                  ? navigation.navigate("Tabs")
                  : setUserMessage("Username or Password is incorrect\n");
              });
            }
          }}
        >
          {(props) => (
            <View>
              <TextInput
                name="username"
                placeholder="Username"
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
                <Text style={styles.buttonText}>Log In</Text>
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
