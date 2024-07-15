import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBLWezWA30jfJJmNvYMXZ369VYmkdPm9A",
    authDomain: "housereservation-3ac12.firebaseapp.com",
    projectId: "housereservation-3ac12",
    storageBucket: "housereservation-3ac12.appspot.com",
    messagingSenderId: "890317889172",
    // appId: "1:890317889172:web:3a771f9f25516316395e81"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);