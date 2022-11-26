import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import {Node} from 'react';
import {View,Button,Text,StyleSheet,useColorScheme,TextInput} from 'react-native';

  const Calculator: () => Node = ({navigation}) => {
    const s = require('./../style');
    const [n1,setN1]=useState('');
    const [n2,setN2]=useState('');

    const showToast = (type,text) => {
      Toast.show({
        type: type,
        position:'bottom',
        text1: text,
      });
    }

    async function getData(op){
      let i=parseInt(n1);
      let j=parseInt(n2);
      if(!isNaN(i) && !isNaN(j)){
        let formBody=[];
        formBody.push(encodeURIComponent('n1') + "=" + encodeURIComponent(i));
        formBody.push(encodeURIComponent('n2') + "=" + encodeURIComponent(j));
        formBody=formBody.join("&");
        
        await fetch('https://nordstone-server.onrender.com/'+op, {
          method: 'POST',
          headers: {
            'Accept':'*/*',
            'Connection':'keep-alive',
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: formBody
        }).then((response) => response.json())
        .then((responseJson) => {
          showToast('success',responseJson["value"].toString());
        });
      }
      else{
        showToast('error','Please Enter a valid number');
      }
    }


  
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center',color:'black',}}>
        <TextInput
          placeholder={'Number 1'}
          style={s.input}
          onChangeText={newText => setN1(newText)}
          placeholderTextColor='grey'
          keyboardType="number-pad"
        />
        <TextInput
          style={s.input}
          onChangeText={newText => setN2(newText)}
          placeholder={'Number 2'}
          keyboardType="number-pad"
          placeholderTextColor='grey'
        />
        <Toast />
        <View style={{ margin:20, marginTop:80 , width: 200 }}>
          <Button
           color='black'
          title='Addition'
          onPress={()=>{
            getData('add');
          }} />
        </View>
        <View style={{ margin:20, width: 200 }}>
          <Button
            color='black'
            title='Subtraction'
            onPress={()=>{
              getData('sub');
            }} />
        </View>
        <View style={{ margin:20, width: 200 }}>
          <Button
          color='black'
          title='Multiplication'
          onPress={()=>{
            getData('mult');
          }} />
        </View>
          
      </View>
    );
  };
  
  export default Calculator;