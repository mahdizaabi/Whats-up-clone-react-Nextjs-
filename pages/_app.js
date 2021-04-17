import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import "./login.css";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import "../components/loading.css";
import firebase from "firebase";
import "../components/SmallChatBox.css";
import "../components/chatsScreen.css";
import "./index.css";
import { useCollection } from "react-firebase-hooks/firestore";
import "../pages/chat/chat.css";
import "../components/message.css";

function MyApp({ Component, pageProps }) {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [isLaoding, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setIsSignedIn(true);
        setLoading(false);
        db.collection("users").doc(user.id).set(
          {
            email: user.email,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            photoUrl: user.photoURL,
          },
          { merge: true }
        );
      } else {
        setIsSignedIn(false);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      <Loading isLaoding={isLaoding}></Loading>
      <Login isSignedIn={isSignedIn} laoding={isLaoding}></Login>
      {isSignedIn ? <Component {...pageProps} /> : ""}
    </div>
  );
}

export default MyApp;
