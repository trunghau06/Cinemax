import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBp8gxEuuN9QfeQkiPk_nA4Fqkm6PjmkUU",
    authDomain: "cinemax-27832.firebaseapp.com",
    projectId: "cinemax-27832",
    storageBucket: "cinemax-27832.firebasestorage.app",
    messagingSenderId: "176804586442",
    appId: "1:176804586442:web:e2bdad5030cadaf9f12533",
};

// ✅ CHỐNG INIT NHIỀU LẦN (QUAN TRỌNG)
const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

// ✅ AUTH CHUẨN CHO EXPO
export const auth = getAuth(app);

export const db = getFirestore(app);