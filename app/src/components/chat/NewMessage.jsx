import React from "react";
import { sendMessage } from "../../actions";
import { connect } from "react-redux";


class NewMessage extends React.Component {

  sendMessage = (e) => {
    e.preventDefault();
    
    let message = document.getElementsByName("new-message")[0].value,
        name = this.props.userInfo.userInfo.name,
        email = this.props.userInfo.userInfo.email,
        
        messageObject = {
          message: message,
          sender: name,
          email: email
        };

    this.props.sendMessage(messageObject);
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