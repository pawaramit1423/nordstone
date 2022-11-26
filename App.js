/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import SignUp from './Signup';
import Login from './Login';
import Splash from './Splash';
import ForgetPassword from './ForgetPassword';
import Notification from './HomePage/Notification';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {

  return (
  <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="splash"
            component={Splash}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="signup"
            component={SignUp}
            options={{title: 'Create an Account'}}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{title: 'Login'}}
          />
          <Stack.Screen
            name="forgot"
            component={ForgetPassword}
            options={{title: 'Forgot Password'}}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="notify"
            component={Notification}
            options={{headerShown:false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};


export default App;
