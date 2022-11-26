import React, { useState } from 'react';
import {Node} from 'react';
import {View,Button,Text,StyleSheet,useColorScheme,TextInput} from 'react-native';
import auth from "@react-native-firebase/auth"
import Toast from 'react-native-toast-message';

const ForgetPassword: () => Node = ({navigation}) => {
    const s = require('./style');
    const [email,setEmail]=useState('');

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
            <Button
                title='Send Reset Link'
                onPress={async ()=>{
                    await auth().sendPasswordResetEmail(email);
                    navigation.goBack();
                }}
                />
        </View>
    );

}

export default ForgetPassword;