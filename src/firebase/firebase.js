import firebase from 'firebase'
// config firebase
let config = {
    apiKey: "AIzaSyCO6OkWsLuMPtPQmesKhdLk3znS06V_nsw",
    authDomain: "fir-function-ef256.firebaseapp.com",
    databaseURL: "https://fir-function-ef256.firebaseio.com",
    projectId: "fir-function-ef256",
    storageBucket: "fir-function-ef256.appspot.com",
    messagingSenderId: "363532008720",
    appId: "1:363532008720:web:8ee1911736170fc4853995",
    measurementId: "G-K6HFQX4ZP0"
  };
  // Initialize Firebase
  firebase.initializeApp(config)
  window.firebase=firebase;
  export default firebase