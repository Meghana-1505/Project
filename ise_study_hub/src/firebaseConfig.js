import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";  // optional if you don’t need analytics

const firebaseConfig = {
  apiKey: "AIzaSyBJvpRPIL_MAeXtscVjZXfMJGS7m5iKZUc",
  authDomain: "ise-study-hub.firebaseapp.com",
  projectId: "ise-study-hub",
  storageBucket: "ise-study-hub.appspot.com",   // fix typo: should be appspot.com not firebasestorage.app
  messagingSenderId: "91302855029",
  appId: "1:91302855029:web:31b60be945b3eacaa3d33c",
  measurementId: "G-DNS6LDWN98"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);  // optional

export { db };
