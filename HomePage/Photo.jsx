import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Alert,
    Image,
    Button
} from 'react-native';
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

const Photo: () => Node = () => {
    
    const [image, setImage] = useState(null);
    const [userImage,setUserImage]=useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const user=auth().currentUser.uid;
    const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
        skipBackup: true,
        path: 'images'
        }
    };

    async function getImageURL(name){
      storage().ref('/' + name)
      .getDownloadURL()
      .then((url) => {
        setUserImage(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
    }

    useEffect(()=>{
      async function fetchData(){
        const usersCollection = await firestore().collection('image').doc(user).get();
        if(usersCollection.exists){
          getImageURL(usersCollection.data()['image']);
        }
      }
      fetchData();
    },[])

    const selectImagefromGallery = () => {
        launchImageLibrary(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.assets[0].uri };
            console.log(response.assets[0].uri );
            setImage(source);
          }
        });
      };

      const selectImagefromCamera = () => {
        launchCamera(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.assets[0].uri };
            console.log(response.assets[0].uri );
            setImage(source);
          }
        });
      };

      const uploadImage = async () => {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = uri.replace('file://', '');
        setUploading(true);
        setTransferred(0);
        const task = storage()
          .ref(filename)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
        });
        try {
          await task;
          firestore().collection('image').doc(user).set({image:filename})
                  .then(()=>{
                    getImageURL(filename);
                  });
        } catch (e) {
          console.error(e);
        }
        setUploading(false);
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);
      };
    
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        {userImage !== null ? (
          <Image source={{ uri:userImage }} style={{ width: 300,height: 300, margin:20 }} />
        ) : <Text style={{ color:'black' , fontSize:30 , marginBottom:50 }}>No image uploaded</Text>}
        <View style={{ margin:10, width: 250 }}>
          <Button onPress={selectImagefromGallery} title='From Gallery' />
        </View>
        <View style={{ margin:10, width: 250 }}>
          <Button onPress={selectImagefromCamera} title='From Camera' />
        </View>
        <View style={{ margin:10}}>
          {image !== null ? (
            <Image source={{ uri: image.uri }} style={{ width: 300,height: 300 , margin: 20}} />
          ) : null}
          {uploading ? (
            <View >
              <Progress.Bar progress={transferred} />
            </View>
          ) : (
              <Button  onPress={uploadImage} color='black' title='Upload image' />
          )}
        </View>
      </View>);
}

export default Photo