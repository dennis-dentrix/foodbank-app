import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc, getDocs, getDoc  } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlC2s5scj2waVC8SgR_exOkdpFeQfUf4Q",
  authDomain: "communityfoodbank-935d5.firebaseapp.com",
  projectId: "communityfoodbank-935d5",
  storageBucket: "communityfoodbank-935d5.appspot.com",
  messagingSenderId: "798222012468",
  appId: "1:798222012468:web:e40165ea30dbcbab1cba61"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage()

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const updateItemQuantity = async (itemId, newQuantity) => {
  const itemRef = doc(db, "foodList", itemId);
  await updateDoc(itemRef, { quantity: newQuantity });
};

export {app, db, storage, getFirestore, collection, addDoc, getDoc, getDocs, auth }