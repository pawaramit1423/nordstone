import React from 'react';
import {Node} from 'react';
import {
    View,
    Button,
    Text,
    StyleSheet,
    useColorScheme,
  } from 'react-native';

  const Splash: () => Node = ({navigation}) => {

    setTimeout(()=>{navigation.replace( "signup" )},3000);
  
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'black'}}>
        <Text style={{ fontSize:40 , color:'white'}}>Nordstone</Text>
      </View>
    );
  };
  
  export default Splash;