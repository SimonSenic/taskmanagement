import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDyYJFXd5beyAY7mvx44ojJXqGTXL4Vd6A",
    authDomain: "taskmanagement-7a68a.firebaseapp.com",
    projectId: "taskmanagement-7a68a",
    storageBucket: "taskmanagement-7a68a.appspot.com",
    messagingSenderId: "12015605924",
    appId: "1:12015605924:web:651280e976d9fc152b6e31",
    measurementId: "G-5ME2D57FZF"
  });
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

