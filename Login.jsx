import React, { useState } from 'react';
import {Node} from 'react';
import {View,Button,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import auth from "@react-native-firebase/auth"
import Toast from 'react-native-toast-message';

  const Login: () => Node = ({navigation}) => {
    const s = require('./style');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const showToast = (type,text) => {
      Toast.show({
        type: type,
        position:'bottom',
        text1: text,
      });
    }
  
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center',color:'black',}}>
        <Toast />
        <TextInput
          placeholder={'Email'}
          style={s.input}
          onChangeText={newText => setEmail(newText)}
          placeholderTextColor='grey'
          keyboardType="email-address"
        />
        <TextInput
          style={s.input}
          onChangeText={newText => setPassword(newText)}
          placeholder={'Password'}
          placeholderTextColor='grey'
          textContentType={"password"}
          secureTextEntry={true}
        />
        <Button
          color='green'
          title='Login'
          onPress={async ()=>{
            if(email!=='' && password!==''){
              if(email.toLowerCase().
                match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                  try {
                    let response = await auth().signInWithEmailAndPassword(email, password);
                    if (response && response.user) {
                      navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'home'
                          }
                        ]
                      });
                    }
                  } catch (error) {
                    showToast('error','Invalid Password');
                  }
              }
              else{
                showToast('error','Please enter valid email');
              }
            }
            else{
              showToast('error','Please Enter a valid credentials');
            }
          }} />
          <TouchableOpacity
            style={{ marginTop:70,  }}
            onPress={()=>{
              navigation.navigate('forgot');
            }} >
            <Text style={{ color:'blue' }}>Forgot Password?</Text>
          </TouchableOpacity>
      </View>
    );
  };
  
  export default Login;