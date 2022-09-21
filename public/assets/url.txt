// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGZAFx1EheBH_aLRKlFPpR-mTNk-pNpJ8",
  authDomain: "admin-medicine.firebaseapp.com",
  projectId: "admin-medicine",
  storageBucket: "admin-medicine.appspot.com",
  messagingSenderId: "318431352105",
  appId: "1:318431352105:web:0aa03ca8f50d572e979338",
  measurementId: "G-29E8C4QSZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
