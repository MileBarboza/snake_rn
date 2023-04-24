import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../styles/colors';


export function BtnPlay({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn,styles.btnPausa]}>
       <FontAwesome name="play-circle" size={45} color="white" style={styles.txt}/>
    </TouchableOpacity>
  )
}

export function BtnReload({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
       <Ionicons name="reload-circle" size={28} color="white" style={styles.txt}/>
    </TouchableOpacity>
  )
}

export function BtnHome({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <FontAwesome name="home"size={28} color="white" style={styles.txt}/>
    </TouchableOpacity>
  )
}

export function BtnStart({txt, onPress}) {
  return (
    <TouchableOpacity  onPress={onPress} >
      <LinearGradient colors={['#ea3458', '#f16480', '#ca0b31']} style={styles.btnStart}>
        <Text style={styles.Text}>{txt}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor:'crimson',
    width:50,
    height:50,
    borderRadius:50,
    marginBottom:60,
    borderColor:"#fff",
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.62,
    elevation: 2,
  },
  btnPausa:{
    width:70,
    height:70,
    marginBottom:40,
  },
  btnStart:{
    width:110,
    borderRadius:15,
    padding:10,
    borderWidth:1.3,
    borderColor: '#edf6d9',
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    elevation: 4,
  },
  txt:{
    textAlign:'center',
    textShadowColor: '#00000073', 
    textShadowOffset: {width: -1, height: 1}, 
    textShadowRadius: 2
  },
  Text:{
    fontFamily:'PassionOne-Regular',
    fontSize:25,
    textAlign:'center',
    color:colors.secondary,
    textShadowColor: '#00000073',
    textShadowOffset: {width: -1, height: 1}, 
    textShadowRadius: 2
  }
})



