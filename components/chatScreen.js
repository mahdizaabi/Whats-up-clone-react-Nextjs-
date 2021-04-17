import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useRef, useState } from "react";
import firebase from "firebase";
import Message from "./Message";
import getContactEmail from "../utils/getContactEmail";
import TimeAgo from "timeago-react";
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
  const endOfMessagesRef = useRef(null);

  const [recipSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getContactEmail(chat.users, user))
  );

  const showMessages = () => {
    {
      /* CLIENT SIDE RENDERING TO OUTPUT DATA after the ssr: SWITCHING!!!    */
    }

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
      {
        /* SERVER SIDE RENDERING TO OUTPUT DTA IMMEDITLY    */
      }
      return JSON.parse(messages).map((message) => {
        <Message
          key={message.id}
          user={message.user}
          message={message}
        ></Message>;
      });
    }
  };

  const ScrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

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
    ScrollToBottom()
  };

  const recipient = recipSnapshot?.docs?.[0]?.data();

  const RecipientEmail = getContactEmail(chat.users, user);
  return (
    <div className="Chatscreen__container">
      <div className="header">
        {recipient ? (
          <Avatar src={recipient.photoURL}></Avatar>
        ) : (
          <Avatar> {RecipientEmail[0]} </Avatar>
        )}

        <div className="header__informations">
          <h3>{RecipientEmail}</h3>
          {recipSnapshot ? (
            <p>
              Last active: {""}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()}></TimeAgo>
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>loading last active</p>
          )}
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
        <div className="endofmessage" ref={endOfMessagesRef}></div>
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
