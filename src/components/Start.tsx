import React from 'react'
import { Image, ImageBackground, StyleSheet, Text } from 'react-native'
import { BtnStart } from './Buttons'
import colors from '../styles/colors'

export default function Start({StartGame}: any):JSX.Element {
  const background = require("../../assets/img/background.jpg")
  const image = require("../../assets/img/snake.png")

  return (
    <ImageBackground source={background} resizeMode="cover" style={styles.image}> 
      <Text style={styles.txt}>Snake</Text>
      <Image source={image}  style={styles.img}/>
      <BtnStart txt='START' onPress={StartGame}/>
    </ImageBackground>
  )
}
const styles = StyleSheet.create ({
  image: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  img:{
    width:200,
    height:200,
    marginVertical:40,
  },
  txt:{
    color: colors.secondary,
    fontSize:90,
    fontFamily:'PassionOne-Regular',
    textShadowColor: '#00000096',
    textShadowOffset: {width: -1, height: 3}, 
    textShadowRadius: 11
  }
})