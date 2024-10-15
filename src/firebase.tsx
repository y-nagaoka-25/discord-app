import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDz2j6yRiwwAmGH6x7ghbYIV9hyCpOeieQ",
    authDomain: "discord-clone-4475d.firebaseapp.com",
    projectId: "discord-clone-4475d",
    storageBucket: "discord-clone-4475d.appspot.com",
    messagingSenderId: "906895312522",
    appId: "1:906895312522:web:919490ef127f4075eacf73"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };