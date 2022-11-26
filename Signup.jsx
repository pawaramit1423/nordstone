import React, { useState } from 'react';
import {Node} from 'react';
import {View,Button,TextInput} from 'react-native';
import auth from "@react-native-firebase/auth"
import Toast from 'react-native-toast-message';


  const SignUp: () => Node = ({navigation}) => {
    const s = require('./style');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCPassword]=useState('');

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
          style={s.input}
          onChangeText={newText => setEmail(newText)}
          placeholder={'Email'}
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
        <TextInput
          style={s.input}
          onChangeText={newText => setCPassword(newText)}
          placeholder={'Confirm Password'}
          placeholderTextColor='grey'
          textContentType={"password"}
          secureTextEntry={true}
        />
        <View style={{ margin:30 }}>
        <Button
          color={'red'}
          title='Create Account'
          onPress={async ()=>{
            if(email!=='' && password!==''){
              if(email.toLowerCase().
                match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                  if(password.length>=8){
                    if(password===cpassword){
                      const response = await auth().createUserWithEmailAndPassword(email, password);
                      if (response) {
                        auth().signInWithEmailAndPassword(email,password);
                        console.log(response);
                        navigation.replace('home');
                      }
                    }
                    else{
                      showToast('error','Both passwords should match');
                    }
                  }
                  else{
                    showToast('error','Both passwords should match');
                  }
              }
              else{
                showToast('error','Please enter valid email');
              }
            }
            else{
              showToast('error','Please Enter valid credentials');
            }
            
            
          }} />
          </View>
          <View style={{ marginTop:70 }}>
            <Button
              color={''}
              title='Already have an account? Log In'
              onPress={()=>{
                navigation.navigate('login');
              }} />
          </View>
      </View>
    );
  };
  
  export default SignUp;