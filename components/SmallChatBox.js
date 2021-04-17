import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import getContactEmail from "../utils/getContactEmail";
/***
 * Chat: Display the small chat box on the sidebar
 * @id: id of the chat room
 * @users: list of 2 emails(str): the current user and Contact user
 * Return: display chat box
 *
 ***/
function SmallChatBox({ id, users }) {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const contactEmail = getContactEmail(users, user);

  /***
   * openChatWindow: route to the chat window
   * @chatId: id of the chat room
   *
   * Return:
   *
   ***/
  
  const openChatWindow = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  /* Get the user object from the userS list to extract it's own photoURL */
  const [contactsnapshot] = useCollection(
    db.collection("users").where("email", "==", contactEmail)
  );
  const contact = contactsnapshot?.docs?.[0]?.data();

  const ok = db.collection("users")?.where("email", "==", contactEmail);
  const documentsa = ok.onSnapshot((documents) => {
    const bx3 = documents.docs?.map((doc) => doc.data());
  });

  db.collection("users")
    .where("email", "==", contactEmail)
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.data();
      });
    });

  return (
    <div onClick={() => openChatWindow(id)} className="chat__container">
      {contact ? (
        <Avatar src={contact?.photoURL} className="chat__avatar"></Avatar>
      ) : (
        <Avatar className="chat__avatar"> {contactEmail[0]} </Avatar>
      )}

      <p> {contactEmail} </p>
    </div>
  );
}

export default SmallChatBox;
