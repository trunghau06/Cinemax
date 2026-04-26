import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBp8gxEuuN9QfeQkiPk_nA4Fqkm6PjmkUU",
    authDomain: "cinemax-27832.firebaseapp.com",
    projectId: "cinemax-27832",
    storageBucket: "cinemax-27832.firebasestorage.app",
    messagingSenderId: "176804586442",
    appId: "1:176804586442:web:e2bdad5030cadaf9f12533",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
