import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBoHi_4IpiBXc4yRM9LWKIZxxRWlLt8A-4",
  authDomain: "iva-social.firebaseapp.com",
  databaseURL: "https://iva-social-default-rtdb.firebaseio.com",
  projectId: "iva-social",
  storageBucket: "iva-social.appspot.com",
  messagingSenderId: "986166095297",
  appId: "1:986166095297:web:ad78f6530e4461adbfd340",
  measurementId: "G-BT1V9GB04V",
};

firebase.initializeApp(FIREBASE_CONFIG);

export const FIREBASE_DB = firebase.database();

export const FIREBASE_STORAGE_REF = firebase.storage().ref();

export const FIREBASE = firebase;
