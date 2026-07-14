// =================================
// FashionAI Firebase Configuration
// =================================

// Import Firebase functions
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth 
}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Replace these with your Firebase project details

const firebaseConfig = {
    apiKey: "AIzaSyD1__ACDdxUFjawiBr4_b6K42N-mbqe9_4",
    authDomain: "fashionai-b443e.firebaseapp.com",
    projectId: "fashionai-b443e",
    storageBucket: "fashionai-b443e.firebasestorage.app",
    messagingSenderId: "625810899658",
    appId: "1:625810899658:web:5a0cc4cd4fbf26eaeeea33"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Authentication

export const auth = getAuth(app);
