import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  /*  Get all the current logged in user CHATS*/
  const loadUserChats = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  /* create a listener */
  const [chatsSnapshot] = useCollection(loadUserChats);
  const createChat = () => {
    const input = prompt("Enter and Email");

    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExist(input) &&
      input != user.email
    ) {
      /* we add a new chat to the DB chats collection if the current chat dosent already exist and is valid  */
      /*console.log(chatsSnapshot?.docs.forEach((item) => console.log(item.data().users)))*/
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExist = (contactEmail) =>
    !!chatsSnapshot?.docs.find(
      (document) =>
      document.data().users.find((user) => user === contactEmail)
          ?.length > 0
    );
    /*console.log(chatsSnapshot?.docs.forEach((document) => console.log(document.id)))*/
  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()}></UserAvatar>
        <IconsContainer>
          <ChatIcon></ChatIcon>

          <MoreVertIcon></MoreVertIcon>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon></SearchIcon>
        <SearchInput placeholder="Search in chats"></SearchInput>
      </Search>

      <SideBarButton onClick={createChat}> start a new chat</SideBarButton>

      {/*  List of Chats   */}

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users}></Chat>
      ))}
    </Container>
  );
}

export default Sidebar;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SideBarButton = styled(Button)`
  width: 100%;
  text-align: center;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Container = styled.div`
  display: flex;
  flex:0.4;
  flex-direction: column;
`;

const IconsContainer = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  background-color: green;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
