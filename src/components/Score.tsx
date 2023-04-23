import React from 'react'
import { Text } from 'react-native'
import colors from '../styles/colors'

interface ScoreProps {
  score: number
}   

export default function Score({score}:ScoreProps):JSX.Element { 
  return (
    <Text style={{fontSize:22, fontWeight:'bold', color: colors.primary}}>
        {score}🏆 
    </Text> 
  )
}
