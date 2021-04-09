import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getContactEmail from "../../utils/getContactEmail";

function ChatPage({ chatMetaDada, messages, fake }) {
  console.log(`messages: ${messages}`)

  const [user] = useAuthState(auth);
  return (
    <div className="chatPage__container">
      <Head>
        <title>chat with {getContactEmail(chatMetaDada.users, user)} </title>
      </Head>  
      <Sidebar />
      <div className="chatbox__container">
        <div className="chatPage__Screen">
          <ChatScreen chat={chatMetaDada} messages={messages}></ChatScreen>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
 
  const messagesResponse = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  /*  map first through the message and return all the messages and document id of the chat fileed iside of it  */
  
/* the returned aray from the first map, map it over it again and convert it's timestamp */
const messages = messagesResponse.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
})).map((messages) => ({
  ...messages,
  timestamp: messages.timestamp.toDate().getTime(),
}))

  const chatRes = await ref.get();
  /* id: document id    
    [email1, email2]
  */
  const chatMetaDada = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chatMetaDada: chatMetaDada,
      fake: 25,
    },
  };
}
