import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'
import Score from './Score';

interface CartelProps {
  children: JSX.Element;    
  score: number;
}

export default function Cartel({children,score}: CartelProps):JSX.Element { 
const background = require("../../assets/img/bg.jpg")

  return (
    <ImageBackground source={background} resizeMode="cover"  style={styles.image}  imageStyle={{  borderRadius: 25}}> 
     <View style={styles.cont}>
       <View  style={styles.borderCartel}>
         <View style={styles.cartel}>
           {children}
           <View style={styles.score}>
               <Text style={{color: colors.primary, fontSize:25}}>score</Text>
              <Score score={score} />
           </View>
         </View>
       </View>
     </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create ({
  cont:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:19,
  },
  borderCartel:{
    borderRadius:60,
    borderColor:colors.fourth,
    borderWidth:1.3,
  },
  cartel:{
    width:300,
    height:300,
    backgroundColor:colors.backgroundCartel,
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    elevation: 4,
  },
  score:{
    justifyContent:'center',
    alignItems:'center',
    top:-95
  },
  image: {
    flex: 1,
  },
})