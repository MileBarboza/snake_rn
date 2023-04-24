
import { ImageBackground, StyleSheet } from "react-native";
import { Coordinate } from "../types/types";

export default function Food({ x, y }:Coordinate):JSX.Element { 
const background = require("../../assets/img/rat.png")

  return <ImageBackground source={background} resizeMode="cover" style={[{top: y * 10, left: x * 10}, styles.food]} />
}

const styles = StyleSheet.create({
  food: {
    width:22,
    height:22,
    position:'absolute',
  }
})