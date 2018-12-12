import React from "react";
import { sendMessage } from "../../actions";
import { connect } from "react-redux";


class NewMessage extends React.Component {

  sendMessage = (e) => {
    e.preventDefault();
    // LOCK INPut UNTIL CHAT BUTON IS CLICKED. IT WILL AVOID HAVING TO REASSIGN roomId VALUE

    let message = document.getElementsByName("new-message")[0].value,
        name = this.props.userInfo.userInfo.name,
        email = this.props.userInfo.userInfo.email,
        roomId = this.props.userInfo.chatInfo.chatkey,
        messageObject = {
          "message": message,
          "sender": name,
          "email": email,
          "roomId": roomId
        };
        console.log("name", name);
        
     this.props.sendMessage(messageObject);
    document.getElementsByName("new-message")[0].value = "";
  }

  render() {
    return (
      <div className="chat-composer">
        <form onSubmit={e => {this.sendMessage(e)}}>
          <label htmlFor="chat-input">
            Your messages
          </label>
          <input type="text" placeholder="Type here..." name="new-message" />
          <button type="submit">
            Send
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
});

export default connect (mapStateToProps, {sendMessage}) (NewMessage);