import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
import { getDatabase } from 'firebase/database';
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
 import {getStorage} from "firebase/storage";

// Initialize Firebase
const firebaseConfig  = {
    apiKey: "AIzaSyCynY_RqaDNAn1xKznQiUSC_Sybxy_SvIY",
    authDomain: "bumpapp-be48a.firebaseapp.com",
    projectId: "bumpapp-be48a",
    storageBucket: "bumpapp-be48a.appspot.com",
    messagingSenderId: "1044541594473",
    appId: "1:1044541594473:web:84b3b5a36d5d78bb54fbf8",
    measurementId: "G-RNHZ8Q4645"
  };
const app = initializeApp(firebaseConfig); //initialize the firebase app
const firestore = getFirestore(app); //initialize firestore
const storage = getStorage(app); //initialize storage

const auth = getAuth(app); //initialize authentication
const db = getDatabase(app);

auth.enablePersistence;
export {app, auth, db, firestore, storage};
