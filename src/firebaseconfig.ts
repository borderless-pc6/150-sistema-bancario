// src/firebaseconfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCGu0aPKe0uA_SGo2dw8NLnsXQDcGvG6Xk",
    authDomain: "bank-e9035.firebaseapp.com",
    projectId: "bank-e9035",
    storageBucket: "bank-e9035.appspot.com",
    messagingSenderId: "81074346132",
    appId: "1:81074346132:web:bd3d99a75265b6939d3c81",
    measurementId: "G-FFEP06QFV0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { app, auth, analytics };
