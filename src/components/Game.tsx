import * as React from 'react'
import { SafeAreaView, StyleSheet, View, } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'
import { checkGameOver } from '../utils/checkGameOver'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 73 }; 
const MOVE_INTERVAL = 60; 
const SCORE_INCREMENT = 10; 

export default function Game(): JSX.Element {  
  const [direction, setDirection] = React.useState<Direction>(Direction.Right) 
  const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION) 
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION) 
  const [isGamerOver, setIsGamerOver] = React.useState<boolean>(false)

React.useEffect(() => {
  if(!isGamerOver)  { 
    const intervalID = setInterval(() => {  
       moveSnake();                   
    }, MOVE_INTERVAL)
    return () => clearImmediate(intervalID); 
  }
}, [isGamerOver, snake]) 

const moveSnake = () => { 
  const snakeHead = snake[0]
  const newHead = {...snakeHead}

if (checkGameOver(snakeHead, GAME_BOUNDS)) { 
  setIsGamerOver((prev) => !prev);
  return;  
}

  switch(direction) {  
    case Direction.Up:
      newHead.y -= 1; 
      break;
    case Direction.Down:
      newHead.y += 1;
      break;
    case Direction.Left:
      newHead.x -= 1;
      break;
    case Direction.Right: 
      newHead.x += 1;
      break;
    default:
      break; 
  }
  
  setSnake([newHead, ...snake.slice(0, -1)])
}

const handleGesture = (event: GestureEventType) => {
  const { translationX, translationY } = event.nativeEvent; 

  if (Math.abs(translationX) > Math.abs(translationY)) {
    if(translationX > 0){ 
      setDirection(Direction.Right);
    } else {
      setDirection(Direction.Left);
    }
  } else {
    if (translationY > 0) { 
      setDirection(Direction.Down);
    } else {
      setDirection(Direction.Up);
    }
  }
}

  return (
    <PanGestureHandler  onGestureEvent={handleGesture}>  
      <SafeAreaView style={styles.container}>
         <View style={styles.boundaries}>
            <Snake snake={snake} />
         </View>
      </SafeAreaView>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create ({
  container: {
    flex:1, 
    backgroundColor: colors.primary,
  },
  boundaries: {
    flex:1,
    borderWidth:12,
    borderColor: colors.primary,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    backgroundColor: colors.background
  },
})