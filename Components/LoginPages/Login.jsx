import { Formik } from "formik";
import { StyleSheet, Text, TextInput, View, Button, Image } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <View style={styles.screenContainer}>
      <View>
        <Image 
          style={styles.headerImg}
          source={require('../../assets/peapod.png')}
        />
        <Text style={styles.headerText}>
          Login
        </Text>
      </View>
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
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate("SignUp")}>
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
    alignItems: 'center',
    paddingTop: 100,
    height: '100%',
    backgroundColor: '#f7f7f7',
  },
  LoginContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10,
    width: '100%',
    backgroundColor: '#f7f7f7',
  },
  headerImg: {
    height: 100,
    width: 200
  },
  headerText: {
    marginBottom: 20, 
    textAlign: "center", 
    fontSize: 26,
    paddingTop: 20,
  },
  TextInput: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center'
  },
  button: {
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "green",
    borderRadius: 20,
    width: '50%',
    alignSelf: 'center'
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    alignSelf: 'center',
    paddingTop: 10
  },
  linkText: {
    fontSize: 16
  }
});
