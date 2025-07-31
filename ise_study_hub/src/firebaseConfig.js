import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// your config
const firebaseConfig = {
  apiKey: "AIzaSyAK7QeJBQQdVifEXeByZ_38WDKB-j2FmxE",
  authDomain: "ise-study-hub-6e6ec.firebaseapp.com",
  projectId: "ise-study-hub-6e6ec",
  storageBucket: "ise-study-hub-6e6ec.appspot.com",
  messagingSenderId: "984967787915",
  appId: "1:984967787915:web:bde6e0c7fb2c7e44352b8e",
  measurementId: "G-40HPMH6STS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export so you can use in your components
export { db, auth, googleProvider };
