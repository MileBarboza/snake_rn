import React from 'react';
import { StyleSheet, Text, View,} from 'react-native';

function App(): JSX.Element {
  return (
     <View style={styles.container}>
        <Text style={styles.txt}>Snake🐍</Text>
     </View>
  );
}

const styles = StyleSheet.create({
container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
txt:{
  fontSize: 25,
  color:"#303030"
}
});

export default App;
