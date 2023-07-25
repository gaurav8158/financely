// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCddnkweNHh2NiTYD8gtC0RSEkjSYnmSJo",
  authDomain: "finance-tracker-d1f7d.firebaseapp.com",
  projectId: "finance-tracker-d1f7d",
  storageBucket: "finance-tracker-d1f7d.appspot.com",
  messagingSenderId: "968896316190",
  appId: "1:968896316190:web:21681635f22f5675e9bf0f",
  measurementId: "G-8Q5CH8RGS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics (app);
const db = getFirestore (app);
const auth = getAuth (app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };