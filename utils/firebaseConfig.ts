import { initializeApp, getApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm_xnnAABrrO634wmk_gmIGyzMxwxadEI",
  authDomain: "development-e72f0.firebaseapp.com",
  projectId: "development-e72f0",
  storageBucket: "development-e72f0.appspot.com",
  messagingSenderId: "900592571387",
  appId: "1:900592571387:web:70a9fecd0b1e83e4e2315e",
  measurementId: "G-SSVR9HZG25",
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


const storage = getStorage(app);

const db = getFirestore(app);

export { app, storage, db, getApp, getAuth };
