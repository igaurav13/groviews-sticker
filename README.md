// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBNzx6j3AVE-Og-j7O-U_qnyIqS-WD2Lw",
  authDomain: "groviews-sticker.firebaseapp.com",
  projectId: "groviews-sticker",
  storageBucket: "groviews-sticker.firebasestorage.app",
  messagingSenderId: "825342136260",
  appId: "1:825342136260:web:1402fbe25eccbbc6ee5e91",
  measurementId: "G-WSR0FK6M6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);