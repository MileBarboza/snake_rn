import * as React from 'react'
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View, } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Coordinate, Direction, GestureEventType } from '../types/types'
import Snake from './Snake'
import Food from './Food'
import Header from './Header'
import Cartel from './Cartel'
import Score from './Score'
import Start from './Start'
import colors from '../styles/colors'
import { BtnHome, BtnPlay, BtnReload } from './Buttons'
import { checkGameOver } from '../utils/checkGameOver'
import { checkEatsFood } from '../utils/checkEatsFood'
import { randomFoodPosition } from '../utils/randomFoodPosition'

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 37, yMin: 0, yMax: 74 }; 
const MOVE_INTERVAL = 60; 
const SCORE_INCREMENT = 10; 

export default function Game(): JSX.Element {  
  const [direction, setDirection] = React.useState<Direction>(Direction.Right) 
  const [snake, setSnake] = React.useState<Coordinate[]>(SNAKE_INITIAL_POSITION) 
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION) 
  const [isGamerOver, setIsGamerOver] = React.useState<boolean>(false)
  const [isPaused, setIsPaused] = React.useState<boolean>(false) 
  const [score, setScore] = React.useState<number>(0) 
  const [isStarted, setIsStarted] = React.useState<boolean>(false)
  const background = require("../../assets/img/bkgd.png")


React.useEffect(() => {
  if (!isStarted) return;
  if(!isGamerOver)  { 
    const intervalID = setInterval(() => {  
      !isPaused && moveSnake();                    
    }, MOVE_INTERVAL)
    return () => clearImmediate(intervalID); 
  }
}, [isGamerOver, snake, isPaused, isStarted]) 

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
  
  if (checkEatsFood(newHead, food, 1.2)) { 
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

const StartGame = () => {
  setIsStarted(!isStarted )
  reloadGame()
}

let content = <Game />;
if (isStarted) {
  content = <Start  />;
}

  return (
    <PanGestureHandler  onGestureEvent={handleGesture} >  
      <SafeAreaView style={styles.container} >
      <StatusBar hidden/>
      {!isStarted ? 
        ( <Start StartGame={StartGame}/> )
        :  
        (<>
          <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused} > 
           <Score score={score}/>
          </Header>
          <ImageBackground source={background} resizeMode="cover" style={styles.image} imageStyle={{backgroundColor:'#c1ce9e', borderRadius: 25}}>
            {isGamerOver 
            ? (<Cartel  score={score} >
                <View style={styles.content}>
                  <Text style={[styles.txt, styles.txtOver]}>GAME OVER</Text>
                    <View style={styles.contBtn}>
                      <BtnHome  onPress={StartGame}/>
                      <BtnReload  onPress={reloadGame}/>
                    </View>
                </View>
              </Cartel>)
            : (<><Snake snake={snake} />
                 <Food x={food.x} y={food.y}/>
                 {isPaused && 
                   <Cartel score={score}>
                     <View style={styles.content}>
                       <Text style={styles.txt}>PAUSE</Text>
                        <View style={styles.contBtn}>
                          <BtnHome  onPress={StartGame}/>
                          <BtnPlay  onPress={pauseGame}/>
                          <BtnReload  onPress={reloadGame}/>
                        </View>
                     </View>
                   </Cartel>
                  } 
              </>)
            }
          </ImageBackground> 
        </>)
      }
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
  content:{
    justifyContent:'center',
    alignItems:'center',
  },
  image: {
    flex: 1,
    borderWidth:12,
    borderColor: colors.primary,
  },
  txt:{
    paddingTop:'32%',    
    textAlign:'center', 
    fontSize:45, 
    color:colors.primary,
    fontFamily:'PassionOne-Regular',
    textShadowColor: '#00000073',
    textShadowOffset: {width: -1, height: 1}, 
    textShadowRadius: 1,
  },
  txtOver:{
    color:'#dd4141',
  },
  contBtn:{
    flexDirection:'row',
    gap:30,
    bottom:-140,
  },
})