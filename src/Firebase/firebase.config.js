
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCjvqitkSTgtso8Pwl1v6SdaTLiOinAe7o",
    authDomain: "multimart-eommerce-app.firebaseapp.com",
    projectId: "multimart-eommerce-app",
    storageBucket: "multimart-eommerce-app.appspot.com",
    messagingSenderId: "658123539620",
    appId: "1:658123539620:web:75ea48fa054b8d27499231"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;