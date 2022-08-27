import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBVgoxU-wKeb5846undFbBhyYAHDQ70zlE",
  authDomain: "monkey-blogging-e042a.firebaseapp.com",
  projectId: "monkey-blogging-e042a",
  storageBucket: "monkey-blogging-e042a.appspot.com",
  messagingSenderId: "610935837743",
  appId: "1:610935837743:web:014dc0a226ceaddac322da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
