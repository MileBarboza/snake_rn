 import React, { Fragment } from 'react'
 import { StyleSheet, View } from 'react-native';
import { Coordinate } from '../types/types'
import colors from '../styles/colors';
 
interface SnakeProps {
  snake: Coordinate[]; 
}

 export default function Snake({snake}: SnakeProps): JSX.Element {
   return (
     <Fragment >
        {snake.map((segment: any, index: number ) => { 
            const segmentStyle = {  
                left: segment.x * 10,    
                top: segment.y * 10, 
            }
            return <View key={index} style={[styles.snake, segmentStyle]}/> 
        })} 
     </Fragment>
   )
 }
 
 const styles = StyleSheet.create ({
  snake:{
    width:20,
    height:20,
    borderRadius:11,
    backgroundColor: colors.primary,
    position:'absolute',
  }
 })