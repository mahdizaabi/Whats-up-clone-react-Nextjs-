const ChatScreen = () => {
  return (
    <div className="Chatscreen__container">
      <div className="Chatscreen__header">
        <div className="avatar">avatar</div>
        <div className="utility" style={{marginRight: "18px"}}> append ....</div>
      </div>
      <div className="Chatscreen__messagebox"></div>
      <div className="Chatscreen__writingbox"></div>
    </div>
  );
};

export default ChatScreen;
