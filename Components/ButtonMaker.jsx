import {Text, StyleSheet} from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";



export default function ButtonMaker({userInterest, combinedInterests, setCombinedInterests}){
const [isPressed, setIsPressed] = useState('white')
const [clickCount, setClickCount] = useState(0);

const styles = StyleSheet.create({
button: {
      height: 35,
      width: 120,
      backgroundColor: `${isPressed}`,
      borderColor: "black",
      borderWidth: 1,
      marginBottom: 10,
      marginLeft: 10,
      borderRadius: 70,
    },
    text:{
        fontSize: 12,
    }
})

useEffect(()=>{
    if(clickCount % 2 !== 0){
        setIsPressed("#E4FFE0");
        setCombinedInterests((currentCombined) => [...currentCombined, userInterest])
        
        
    }else{
        const index = combinedInterests.indexOf(userInterest);
        if(index > -1){
           combinedInterests.splice(index, 1); 
        }
        
        setIsPressed("white") 
    }

}, [clickCount])

console.log(">>>",combinedInterests);

    return (
        <Button style={styles.button} onPress={()=> setClickCount((currCount) => currCount + 1)}>
            <Text style={styles.text}>{userInterest}</Text>
            </Button>       
    )
}



























// <Button style={styles.button} onPress={() => {setClickCount((currCount) => currCount + 1); setCurrButtonText("Football");}}>
        //   <Text style={styles.text}>Football</Text>
        // </Button>
        // <Button style={styles.button} onPress={() => {setClickCount((currCount) => currCount + 1); setCurrButtonText("Cinema");}}>
        //   <Text style={styles.text}>Cinema</Text>
        // </Button>
        // <Button style={styles.button} onPress={() => {setClickCount((currCount) => currCount + 1); setCurrButtonText("Dancing");}}>
        //   <Text style={styles.text}>Dancing</Text>
        // </Button>
        // <Button style={styles.button} onPress={() => {setClickCount((currCount) => currCount + 1); setCurrButtonText("Tennis");}}>
        //   <Text style={styles.text}>Tennis</Text>
        // </Button>
        // <Button style={styles.button} onPress={() => {setClickCount((currCount) => currCount + 1); setCurrButtonText("Gaming");}}>
        //   <Text style={styles.text}>Gaming</Text>
        // </Button>
        // <Button style={styles.button} onPress={() => {setClickCount((currCount) => currCount + 1); setCurrButtonText("Make Up");}}>
        //   <Text style={styles.text}>Make Up</Text>
        // </Button>