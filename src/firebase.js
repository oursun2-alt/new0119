import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "ctx7sk-8e7216d5-5e8b-474a-a051-e6b290bb0b12",
    authDomain: "test-ef24c.firebaseapp.com",
    projectId: "test-ef24c",
    storageBucket: "test-ef24c.firebasestorage.app",
    messagingSenderId: "861206371163",
    appId: "1:861206371163:web:235fc87883c42efdbb587e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
