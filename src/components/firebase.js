// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBn8q6hEMsVIwWBTqsQbOkvK_E8cBQ25do",
  authDomain: "ecommerce-d5811.firebaseapp.com",
  databaseURL: "https://ecommerce-d5811-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecommerce-d5811",
  storageBucket: "ecommerce-d5811.appspot.com",
  messagingSenderId: "155028918819",
  appId: "1:155028918819:web:c5cb940104ad82b7869796"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
