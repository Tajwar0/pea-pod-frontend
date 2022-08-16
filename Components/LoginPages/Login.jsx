import { Formik } from "formik";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useState } from "react";

export default function Login({ navigation }) {
  const [userMessage, setUserMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [user, setUser] = useState();
  const [inputUsername, setInputUsername] = useState("");

  //   useEffect(() => {
  //     const getUser = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://pea-pod-api.herokuapp.com/user/${inputUsername}`
  //         );
  //         const json = await response.json();
  //         console.log(json);
  //         setUser(json._id);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getUser();
  //   }, [userInput]);

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
            setInputUsername(values.Username);
            if (user !== values.Username) {
              SetUserMessage("Username does not exist\n");
            }
            if (password !== values.Password) {
              setPassMessage("password is not valid");
            }
            if (user === values.Username && password === values.Password) {
              //   set context,
              //   set login=true
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
