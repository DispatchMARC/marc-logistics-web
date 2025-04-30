import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCotobfCFmDz5Iw_0TlU9rmS_KxnEikGGe8",
  authDomain: "marc-logistics.firebaseapp.com",
  projectId: "marc-logistics",
  storageBucket: "marc-logistics.appspot.com",
  messagingSenderId: "382025474227",
  appId: "1:382025474227:web:108e54e07d04d02a9990c6",
  measurementId: "G-YLM6S4ZR54"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);