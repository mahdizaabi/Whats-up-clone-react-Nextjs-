import { db } from "../firebase";
import firebase from "firebase";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const Fstore = () => {
  const [contactEmail, setContactEmail] = useState("");
  let listData = [];

  const chatReference = db.collection("chats");
  

  chatReference.onSnapshot((documents) => {
    const listChats = documents.docs.map((document) => document.data().users)
    console.log(listChats)
    
    const findit = listChats.forEach((singlearray) => {const za = singlearray.find((email) => email === "zeze@zez.de")
    if(za){
      setContactEmail(za)
    }
  })
    })
console.log(contactEmail)
  /*Exemple 1: */
  // chatReference.get().then((documents) => {
  //   var x = documents.forEach((doc) => console.log(doc.data().users.filter((itemInSmallArray) => itemInSmallArray !== "1655@holbertonschool.com")?.length))

  //       console.log(x)
  // })
  // example 2 :
  //let PromiseResult = chatSnapshot.then((documents) => documents.forEach((document) => document.data())).then((final) => console.log(final))

  return (
    <div>
      <h1>this is it</h1>
    </div>
  );
};

export default Fstore;
