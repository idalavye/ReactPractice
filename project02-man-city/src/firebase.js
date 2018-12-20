import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDd6VtBn3EtxLgBs1l7aHVPa04k4YVP9Fs",
    authDomain: "react-project02-man-city.firebaseapp.com",
    databaseURL: "https://react-project02-man-city.firebaseio.com",
    projectId: "react-project02-man-city",
    storageBucket: "react-project02-man-city.appspot.com",
    messagingSenderId: "1074757520738"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
firebaseDB.ref('matches').once('value').then((snapshot) => {
    console.log(snapshot.val());
})