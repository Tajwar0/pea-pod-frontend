import { StatusBar } from "expo-status-bar";
import moment from "moment";
import { useEffect, useState, useRef, useContext, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Button,
} from "react-native";
import io from "socket.io-client";
import { UserContext } from "../../Contexts/User";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

export default function Chat({ route }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const { userName } = useContext(UserContext);

  const { otherUser } = route.params;

  const roomId = [userName, otherUser].sort().join("%");

  let isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        const urlRoomId = roomId.split("%").join("%25");
        fetch(`https://pea-pod-api.herokuapp.com/chat/${urlRoomId}/messages`)
          .then((response) => response.json())
          .then((oldMsgs) => setMessages(oldMsgs))
          .catch((err) => {
            console.log(err);
          });
      }
    }, [])
  );

  useEffect(() => {
    socketRef.current = io(
      "https://pea-pod-chat-express-server.herokuapp.com/"
    );
    socketRef.current.on("connect", () => {
      socketRef.current.emit("connected", roomId);
    });
    socketRef.current.on("load message", (oldMsgs) => {
      setMessage(oldMsgs);
    });
    socketRef.current.on("message", (newMsg) => {
      setMessages([...messages, newMsg]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [messages]);

  const pressEvent = () => {
    if (input.length !== 0) {
      const newMsg = {
        room_id: roomId,
        sender: userName,
        msg: input.trim(),
        created_at: moment().format(),
      };

      socketRef.current.emit("message", newMsg, roomId);
      setInput("");
    }
  };

  const Item = ({ sender, msg }) => (
    <View
      style={[sender === userName ? styles.user_item : styles.other_user_item]}
    >
      <Text>
        {sender}: {msg}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => <Item sender={item.sender} msg={item.msg} />;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/peapod.png")}
        style={{ width: 200, height: 100 }}
      />
      <FlatList
        style={styles.list}
        data={messages}
        renderItem={renderItem}
        keyExtractor={() => Math.random()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)}
          value={input}
          multiline={true}
          blurOnSubmit={true}
        />
        <Button
          style={styles.button}
          title="send"
          onPress={pressEvent}
          color="green"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 30,
  },
  list: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "77%",
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  user_item: {
    backgroundColor: "#e4ffe0",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  other_user_item: {
    backgroundColor: "#aadea2",
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    alignSelf: "flex-end",
    borderRadius: 10,
  },
});
