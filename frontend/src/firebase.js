import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Твои реальные ключи из консоли Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAp5qyGStE9UjCXVj6t4_hCCIq-rDeQ06M",
  authDomain: "appcycling.firebaseapp.com",
  projectId: "appcycling",
  storageBucket: "appcycling.appspot.com",
  messagingSenderId: "1041586401684",
  appId: "1:1041586401684:web:4c3606eb240ef107a11f81",
  measurementId: "G-V6PRRM5R7F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);