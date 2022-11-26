
# Nordstone Assignment

This is a react native project created for Nordstone.




## Packages Used

react-native-firebase/auth

react-native-firebase/firestore

react-native-firebase/storage

react-navigation/native-stack

react-native-notifications

react-native-progress

react-native-tab-view

react-native-toast-message
## Authentication

Used Firebase email authentication. Also provided forgot password option which sends password reset link over email. Email validation is done in javascript and minimum password length should be 8.

## Notification

Used react-native-notifications package to push local notifications.
## Image

Used react-native-image-picker package to get images from both camera and gallery.
Storing the image link for the photo  user to Firestore and fetching it from there.
## Text Data

Created a collection in firestore and adding text data for each user.
## Calculator

Created calculator APIs for addition, subtraction, multplication with node + express and hosted it on render.com (as Heroku free tier is expiring after 28 nov). [API Github](https://github.com/shubham7799/nordstone-server)

