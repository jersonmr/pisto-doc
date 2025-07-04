
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-MQaFxsKsILlUdYpREtyRrN0bXOP6Lhk",
    authDomain: "pisto-docs.firebaseapp.com",
    projectId: "pisto-docs",
    storageBucket: "pisto-docs.firebasestorage.app",
    messagingSenderId: "598476204791",
    appId: "1:598476204791:web:4c6bde572b83365de501f2"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
    app,
    auth,
};
