import * as React from 'react'
import { SafeAreaView, StyleSheet, Text, View, } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'
import Food from './Food'
import Header from './Header'
import Score from './Score'
import colors from '../styles/colors'
import { checkGameOver } from '../utils/checkGameOver'
import { checkEatsFood } from '../utils/checkEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'

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
  const [isPaused, setIsPaused] = React.useState<boolean>(false) 
  const [score, setScore] = React.useState<number>(0) 

React.useEffect(() => {
  if(!isGamerOver)  { 
    const intervalID = setInterval(() => {  
      !isPaused && moveSnake();                    
    }, MOVE_INTERVAL)
    return () => clearImmediate(intervalID); 
  }
}, [isGamerOver, snake, isPaused]) 

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
  
  if (checkEatsFood(newHead, food, 2)) { 
    setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax)) 
    setSnake([newHead, ...snake]); 
    setScore(score + SCORE_INCREMENT);   
  } else {
    setSnake([newHead, ...snake.slice(0, -1)]) 
  }

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

const reloadGame = () => {
  setSnake(SNAKE_INITIAL_POSITION);
  setFood(FOOD_INITIAL_POSITION);
  setIsGamerOver(false);
  setScore(0);
  setDirection(Direction.Right);
  setIsPaused(false);
}

const pauseGame = () => {
  setIsPaused(!isPaused )
}

  return (
    <PanGestureHandler  onGestureEvent={handleGesture}>  
      <SafeAreaView style={styles.container}>
            <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}> 
              <Score score={score}/>
            </Header>
         <View style={styles.boundaries}>
            <Snake snake={snake} />
            <Food x={food.x} y={food.y}/>
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
    borderRadius:30,
    backgroundColor: colors.background,
  },
})