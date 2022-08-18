import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';
import { UserContext } from "../../Contexts/User";

export default function MatchProfiles({ item, navigation }) {
  const {userName} = useContext(UserContext)
  const { width, height } = useWindowDimensions();
  const [user, setUser] = useState(item[item._id]);
  return (
    <SafeAreaView style={[styles.container, { width, height }]}>
      <ScrollView>
        <Text style={styles.headerText}>{item._id}</Text>
        <View style={[{ flex: 0.3 }]}>
        <TouchableOpacity
            style={{width}}
            onPress={async () => {
              try {
                const response = await fetch(
                  "https://pea-pod-api.herokuapp.com/user/" + item._id + "/incoming_likes",
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      "incoming_like": userName,
                      "liked_detail": "avatar",
                      "opening_message": "test message"
                    }),
                  }
                );
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Image
              source={{uri: user && user.avatar}}
              style={[styles.avatarImg, { width: '90%', resizeMode: "contain" }]}
            />
          </TouchableOpacity>
          <View style={[styles.locationsContainer, {width}]}>
            <Text style={styles.locationText}>
              {user.location}</Text>
            <Text style={styles.locationText}>{user.gender}</Text>
          </View>
          <View style={styles.hr}></View>
          <Text style={styles.subheadingText}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.interests.length === 0 ? <Text>{item._id} has no interests</Text> : user.interests.map((interest) => {
              return (
                      <TouchableOpacity
                        key={uuid.v4()}
                        style={styles.interestsButton}
                        onPress={async () => {
                          try {
                            const response = await fetch(
                              "https://pea-pod-api.herokuapp.com/user/" + item._id + "/incoming_likes",
                              {
                                method: "PATCH",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  "incoming_like": userName,
                                  "liked_detail": "interest in " + interest,
                                  "opening_message": "test message"
                                }),
                              }
                            );
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                          <Text style={styles.interestsText}>{interest}</Text>
                      </TouchableOpacity> 
                     );
            })}
          </View>
          <View style={styles.hr}></View>
          <TouchableOpacity
            onPress={async () => {
              try {
                const response = await fetch(
                  "https://pea-pod-api.herokuapp.com/user/" + item._id + "/incoming_likes",
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      "incoming_like": userName,
                      "liked_detail": "bio",
                      "opening_message": "test message"
                    }),
                  }
                );
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Text style={styles.subheadingText}>A little bit about {item._id}...</Text>
            <View style={styles.bioContainer}>
              {user.bio? <Text style={styles.bioText}>{user.bio}</Text>: <Text>{item._id} has nothing to say!</Text>}
            </View>
          </TouchableOpacity>    
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    paddingTop: 20
  },
  headerText: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: "bold",
    paddingBottom: 10
  },
  subheadingText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  hr: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '70%',
    alignSelf: 'center',
    marginBottom: 5
  },
  avatarImg: {
    borderRadius: 80,
    height: 250,
    margin: 18, 
    borderWidth: 1,
    borderColor: "lightgrey"
  },
  locationsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    marginBottom: 15
  },
  locationText: {
    fontSize: 20
  },
  bioContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  bioText: {
    alignSelf: 'center'
  },
  interestsContainer: {
    backgroundColor: '#f7f7f7',
    alignSelf: 'center',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 20,
    width: '80%',
    marginBottom: 15
  },
  interestsButton: {
    backgroundColor: '#aadea2',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 5,
    padding: 3
   },
  interestsText: {
    fontSize: 20,
    padding: 5

  },
});
