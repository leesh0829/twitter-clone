// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnoGSNF1LZ-SyOmAQBgER7I9zk6RXjHYs",
  authDomain: "twitter-reloaded-adelie.firebaseapp.com",
  projectId: "twitter-reloaded-adelie",
  storageBucket: "twitter-reloaded-adelie.appspot.com",
  messagingSenderId: "45001207087",
  appId: "1:45001207087:web:c8e00b01ec51ba2ed705da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
