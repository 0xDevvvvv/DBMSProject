// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxIP3R1Fgzamj98rs9xUcdnmuFh4GH1VQ",
  authDomain: "dbmsproject-6690a.firebaseapp.com",
  projectId: "dbmsproject-6690a",
  storageBucket: "dbmsproject-6690a.appspot.com",
  messagingSenderId: "426479962710",
  appId: "1:426479962710:web:c2d4b61e1e74712793c9f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);