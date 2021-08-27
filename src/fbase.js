import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//   appId: process.env.REACT_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCAgr71XIrR3kJtCfHG_KVWoc8igyIk-gE",
  authDomain: "nwitter-72fa9.firebaseapp.com",
  projectId: "nwitter-72fa9",
  storageBucket: "nwitter-72fa9.appspot.com",
  messagingSenderId: "572376417994",
  appId: "1:572376417994:web:b4213fdb164e64c092d633"
}
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();