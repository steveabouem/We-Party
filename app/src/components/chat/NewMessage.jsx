import React from "react";
import { sendMessage } from "../../actions";
import { connect } from "react-redux";

class NewMessage extends React.Component {
  sendMessage = (e) => {
    
    e.preventDefault();
    let message = document.getElementsByName("new-message")[0].value,
    name = this.props.userInfo.userInfo.name,
    email = this.props.userInfo.userInfo.email,
    roomId = this.props.userInfo.chatInfo.chatkey,
    messageObject = {
      "message": message,
      "name": name,
      "email": email,
      "roomId": roomId
    };

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
          {this.props.userInfo.chatInfo? 
          <input type="text" placeholder="Type here..." name="new-message"/>
          :
          <input type="text" placeholder="Click on the 'Start chat' button" name="new-message" disabled/>
           }
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