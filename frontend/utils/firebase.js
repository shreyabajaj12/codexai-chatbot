// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsJBpK7Ffdp-oF0w0WDwpyTF5FN2IZv6M",
  authDomain: "codexai-e72e5.firebaseapp.com",
  projectId: "codexai-e72e5",
  storageBucket: "codexai-e72e5.firebasestorage.app",
  messagingSenderId: "455568745306",
  appId: import.meta.env.VITE_FIREBASE_API_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider=new GoogleAuthProvider()