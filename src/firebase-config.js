import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBud_LsevmB1uut8rTrN1a0wc44yZpCjFw",
    authDomain: "ai-documentation-c475a.firebaseapp.com",
    projectId: "ai-documentation-c475a",
    storageBucket: "ai-documentation-c475a.firebasestorage.app",
    messagingSenderId: "786414479334",
    appId: "1:786414479334:web:db9eb9c64a169336201827",
    measurementId: "G-JMQ0LWX30L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Analytics only if supported (browser environment)
let analytics;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});
export { analytics };
