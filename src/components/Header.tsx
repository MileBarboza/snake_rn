import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

interface HeaderProps {
    reloadGame: () => void;  
    pauseGame: () => void;
    children: JSX.Element;   
    isPaused: boolean;  
}

export default function Header({children, reloadGame, pauseGame, isPaused}: HeaderProps ):JSX.Element {  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        <Ionicons name="reload-circle" size={35} color={colors.primary}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseGame}>
        <FontAwesome name={isPaused ? "play-circle" : "pause-circle"} size={35} color={colors.primary}/>
      </TouchableOpacity>
        {children}
    </View>
  )
}
const styles = StyleSheet.create ({
 container: {
   flex: 0.05,
   flexDirection: 'row',
   alignItems:'center',
   justifyContent:'space-between',
   borderColor: colors.primary,
   marginHorizontal:12,
   marginTop:12,
   borderRadius:20,
   padding: 15,
   backgroundColor: colors.background,
 },
})