import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  Platform,
  Alert,
  Image,
  TextInput
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"

const Data: () => Node = ({navigation}) => {

  const [text,setText]=useState([]);
  const [input,setInput]=useState('');
  const user=auth().currentUser.uid;
  const s = require('./../style');
  
  useEffect(() => {
    async function fetchData(){
      const usersCollection = await firestore().collection('text').doc(user).get();
      if(usersCollection.exists){
        setText(text=>(usersCollection.data()['text']));
        console.log(text);
      }
    }
    fetchData();
  }, [])
  

  return (
    <View style={{ flex:1, justifyContent:'space-between', alignItems:'center', paddingVertical: 50}}>
        <View>
        {
          text.length>0?(
            text.map((e,i)=>{
              return (
                <Text style={{ color:'black' , fontSize:18 }}>{(i+1)+'. '+e}</Text>
              );
          })):<Text style={{ color:'black' , fontSize:30 , marginBottom:50 }}>{'No values yet'}</Text>
        }
        </View>
        <View>        
        <TextInput
          placeholder='Add Text'
          value={input}
          style={s.input}
          onChangeText={newText => setInput(newText)}
          placeholderTextColor={'grey'}
        />
        <Button
            style={{ backgroundColor:'red' }}
            title='Add Text to Firestore'
            onPress={async ()=>{
              console.log(text);
              if(input!==''){
                  firestore().collection('text').doc(user).set({text:[...text,input]})
                  .then(()=>{
                    setText([...text,input]);
                    setInput('')
                    console.log('User added!');
                  });
                }
              
            }} />
          </View>
    </View>
  )
}

export default Data