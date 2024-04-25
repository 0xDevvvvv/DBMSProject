// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM9KuNInf42HnlfQMUlcelDVZnoPQY9IQ",
  authDomain: "tempproject-949ce.firebaseapp.com",
  projectId: "tempproject-949ce",
  storageBucket: "tempproject-949ce.appspot.com",
  messagingSenderId: "903905507436",
  appId: "1:903905507436:web:fb0ff5b14ec34ab89b8049"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);