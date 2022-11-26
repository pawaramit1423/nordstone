import React from 'react';
import {Node} from 'react';
import {Notifications} from 'react-native-notifications';
import auth from "@react-native-firebase/auth"
import { View, Button } from 'react-native';

  const Notification: () => Node = () => {
  
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{ margin:30, width: 250 }}>
          <Button
          color='red'
          title='Get Notification'
          onPress={()=>{
            Notifications.postLocalNotification({
              body: 'You got your own notification!',
              title: 'Click',
            }, 1);
          }} />
        </View>
          {/* <Button
            title='Logout'
            onPress={async ()=>{
              await auth().signOut();
          }} /> */}
      </View>
    );
  };
  
  export default Notification;