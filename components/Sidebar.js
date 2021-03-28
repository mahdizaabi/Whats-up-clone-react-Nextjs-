import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/search";

function Sidebar() {
  return (
    <Container>
      <Header>
        <UserAvatar></UserAvatar>
        <IconsContainer>
          <ChatIcon></ChatIcon>

          <MoreVertIcon></MoreVertIcon>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon></SearchIcon>
        <SearchInput placeholder="Search in chats"></SearchInput>
      </Search>

      <SideBarButton> start a new chat</SideBarButton>

      {/*  List of Chats   */}
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
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
