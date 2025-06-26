import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDW63Ipux0-Zq2Y_MgrWcDaQ0xqlTnB1xE",
  authDomain: "aunthentication-4fcb3.firebaseapp.com",
  projectId: "aunthentication-4fcb3",
  storageBucket: "aunthentication-4fcb3.firebasestorage.app",
  messagingSenderId: "1482615209",
  appId: "1:1482615209:web:198c74e3fe622cb4cf3cb8",
  measurementId: "G-WPVK8L2NT3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
