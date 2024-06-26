// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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

// ref to get database
const db = getDatabase();

const submit = document.querySelector("#submit");
submit.addEventListener("click", function (event) {
  event.preventDefault(); // prevent page from reloading
  // alert("Hello");
  // adding the fields
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  set(ref(db, "user/" + document.getElementById("username").value), {
    score: 0,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    username: document.querySelector("#username").value,
  });
  console.log({ email, password });
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      //   alert("Account created 👍");
      window.location.href = "/game.html"; // redirect user to another email.

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("error occured!: " + errorMessage);
      // ..
    });
});
