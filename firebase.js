// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/storage';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA63M_HGFyOM7xGBx61XRTjy1kRV1ux8vs",
  authDomain: "instaclone-42.firebaseapp.com",
  projectId: "instaclone-42",
  storageBucket: "instaclone-42.appspot.com",
  messagingSenderId: "9624890645",
  appId: "1:9624890645:web:e4c3cb962f89d8daaccd1c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };