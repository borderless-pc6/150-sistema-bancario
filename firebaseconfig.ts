// src/firebaseconfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configurações do seu projeto no Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCGu0aPKe0uA_SGo2dw8NLnsXQDcGvG6Xk",
    authDomain: "bank-e9035.firebaseapp.com",
    projectId: "bank-e9035",
    storageBucket: "bank-e9035.appspot.com", // Atenção aqui: corrigido o ".storage.app" para ".appspot.com"
    messagingSenderId: "81074346132",
    appId: "1:81074346132:web:bd3d99a75265b6939d3c81",
    measurementId: "G-FFEP06QFV0"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Serviços que você vai usar
const auth = getAuth(app);

// Analytics pode dar erro fora do navegador, só use se precisar
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

// Exporta o que for necessário
export { app, auth, analytics };
