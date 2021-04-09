import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useState } from "react";
import firebase from "firebase";
import Message from "./Message";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [input, setInput] = useState("");

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        ></Message>
      ));
    } else {
      return JSON.parse(messages).map((message) => {
        <Message
          
        ></Message>;
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user.id)
      .set(
        { lastSeen: firebase.firestore.FieldValue.serverTimestamp() },
        { merge: true }
      );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore?.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
  };
  return (
    <div className="Chatscreen__container">
      <div className="header">
        <Avatar></Avatar>
        <div className="header__informations">
          <h3>Recipient email</h3>
          <p>Last seen ...</p>
        </div>

        <div className="headericons">
          <IconButton>
            <AttachFileIcon></AttachFileIcon>
          </IconButton>

          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </div>
      </div>
      <div className="chatscreen__messagebox">
        {showMessages()}
        <div className="endofmessage"></div>
      </div>

      <form className="inputContainer" onSubmit={(e) => e.preventDefault()}>
        <InsertEmoticonIcon></InsertEmoticonIcon>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input"
        ></input>
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          {" "}
          Send Message{" "}
        </button>
        <MicIcon></MicIcon>
      </form>
    </div>
  );
};

export default ChatScreen;
