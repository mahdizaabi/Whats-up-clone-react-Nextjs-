import { db } from "../firebase";
import firebase from "firebase";
import { useState, useEffect } from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { CodeSharp, MicNoneSharp } from "@material-ui/icons";

const Fstore = () => {
  db.collection("chats").doc("0H0VTzX3JY7U0m6XsKF3").update({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
  return (
    <div>
      <h1> hello </h1>
    </div>
  );
};
export default Fstore;
