
import { StyleSheet, Text } from "react-native";
import { Coordinate } from "../types/types";

export default function Food({ x, y }:Coordinate):JSX.Element { 
    return <Text style={[{top: y * 10, left: x * 10}, styles.food]}>🐀</Text>; 
}

const styles = StyleSheet.create({
  food: {
    width:25,
    height:25,
    fontSize:20,
    borderRadius:7,
    position:'absolute',
    color:'#666'
  }
})