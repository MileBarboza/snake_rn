import React from 'react'
import { Text } from 'react-native'
import colors from '../styles/colors'

interface ScoreProps {
  score: number
}   

export default function Score({score}:ScoreProps):JSX.Element { 
  return (
    <Text style={{fontSize:30, fontWeight:'bold', color: colors.primary, textAlign:'center'}}>
        {score}🏆 
    </Text> 
  )
}
