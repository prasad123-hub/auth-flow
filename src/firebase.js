// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1wp77jpHeGFylvZ6hj-nBfcf5tgVm_IY",
  authDomain: "auth-flow-18235.firebaseapp.com",
  projectId: "auth-flow-18235",
  storageBucket: "auth-flow-18235.appspot.com",
  messagingSenderId: "615052473611",
  appId: "1:615052473611:web:a8e19de64084b774845e0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Signup
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

//login
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout
export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}
