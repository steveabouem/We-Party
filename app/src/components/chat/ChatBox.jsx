import React from "react";
import NewMessage from "./NewMessage.jsx";
import PastMessages from "./PastMessages.jsx";

class ChatBox extends React.Component {
  render() {
    return (
      <div className="ChatBox">
        <ul className="chat-messages-list">
          <PastMessages />
        </ul>
        <NewMessage />
      </div>
    )
  }
}

export default ChatBox