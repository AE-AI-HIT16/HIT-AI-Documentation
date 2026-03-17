import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvuAp4Y1tlUha9_ehRDK8VpQlliJNfbOQ",
    authDomain: "hit-ai-documentation.firebaseapp.com",
    projectId: "hit-ai-documentation",
    storageBucket: "hit-ai-documentation.firebasestorage.app",
    messagingSenderId: "664576057795",
    appId: "1:664576057795:web:7238a717bf5b3367a05d76",
    measurementId: "G-XJ4TTW7TLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only if supported (browser environment)
let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});
export { analytics };
