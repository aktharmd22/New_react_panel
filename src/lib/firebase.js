// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyAbNuYtUnO2mjuuvpD2uW6GewH4BbHf9bc",
    authDomain: "admindashboard-4a777.firebaseapp.com",
    projectId: "admindashboard-4a777",
    storageBucket: "admindashboard-4a777.appspot.com",
    messagingSenderId: "920261959513",
    appId: "1:920261959513:web:5d4e7a81687ed0fa86b648"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);