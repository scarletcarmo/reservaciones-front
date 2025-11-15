// src/firebase.ts
import { getAuth } from "firebase/auth";

// Copia tu configuración desde la consola de Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    /*apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,*/
    apiKey: "AIzaSyApwi05cdPxvnl4w64iDY36tM2h4z10DzE",
    authDomain: "hotel-proyect.firebaseapp.com",
    projectId: "hotel-proyect",
    storageBucket: "hotel-proyect.firebasestorage.app",
    messagingSenderId: "818211588220",
    appId: "1:818211588220:web:aab59dfa66b371906f21f9"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta auth para usarlo en tu app
export const auth = getAuth(app);
