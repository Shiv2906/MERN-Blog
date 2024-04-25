// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-69452.firebaseapp.com",
  projectId: "mern-blog-69452",
  storageBucket: "mern-blog-69452.appspot.com",
  messagingSenderId: "337821039090",
  appId: "1:337821039090:web:48c388e4efe8607223936b"
};

// Initialize Firebas
// We need to export this file 

export const app = initializeApp(firebaseConfig);