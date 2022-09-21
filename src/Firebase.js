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
  apiKey: "AIzaSyCDkKDpvI1iaXtUDNszS6iokVYTAAtOmDg",
  authDomain: "adminpannel-ac52a.firebaseapp.com",
  projectId: "adminpannel-ac52a",
  storageBucket: "adminpannel-ac52a.appspot.com",
  messagingSenderId: "187725311989",
  appId: "1:187725311989:web:ba9fbe10c5e581e1557abc",
  measurementId: "G-GEX4KDRPXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app)




