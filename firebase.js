import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC3LIuIZxtAg-aHe9rW7l5bXQasSkTHNKI",
  authDomain: "whtsupx.firebaseapp.com",
  projectId: "whtsupx",
  storageBucket: "whtsupx.appspot.com",
  messagingSenderId: "247571953846",
  appId: "1:247571953846:web:212727c0547164f9e00e17",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { db, auth, provider } ;