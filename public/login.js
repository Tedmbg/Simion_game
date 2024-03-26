// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"; // Import Firebase Auth functions

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgKtX9j40_NhZNwSSjA-TBgeKcZvHpJUg",
  authDomain: "simon-game-81d81.firebaseapp.com",
  projectId: "simon-game-81d81",
  storageBucket: "simon-game-81d81.appspot.com",
  messagingSenderId: "515616434095",
  appId: "1:515616434095:web:fdc3fafc4929e941cb715a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.querySelector("#submit");
submit.addEventListener("click", function (event) {
  event.preventDefault(); // prevent form submission

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  // Trim whitespace from email input
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  // Perform basic email validation
  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      history.pushState({}, '', '/game.html'); // Redirect to game page
    })
    .catch((error) => {
      // Handle sign-in errors
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error occurred: " + errorMessage);
    });
});


