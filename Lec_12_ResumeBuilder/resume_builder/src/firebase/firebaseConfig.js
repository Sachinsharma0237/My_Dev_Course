import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAeRbzTJlnn4NeB9YtZlMrRRLA4ysmd_dc",
    authDomain: "resumebuilder-afd92.firebaseapp.com",
    projectId: "resumebuilder-afd92",
    storageBucket: "resumebuilder-afd92.appspot.com",
    messagingSenderId: "281651858827",
    appId: "1:281651858827:web:18714a66b4ec24162b338e"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp;