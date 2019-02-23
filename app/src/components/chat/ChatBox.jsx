import React from "react";
import NewMessage from "./NewMessage.jsx";
import PastMessages from "./PastMessages.jsx";
import Modal from "../modals";
import { getMsgHistory, clearPastMessages } from "../../actions";
import { connect } from "react-redux";
import firebase from "firebase";

class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      opened: true,
      isModalOpened: false
    };
    this.key = props.userInfo.chatInfo.chatkey;
    this.listen();
  }

  listen() {
    firebase.database().ref().child(`chatRooms/${this.key}`).on("value", snapshot => {
      if(snapshot.val()){
        this.setState({
          messages: [snapshot.val().messages]
        });
      }
    })
  };

  toggleChat = () => {
    this.setState({
      opened: !this.state.opened,
    });
  }

  openModal = () => {
    this.setState({
      isModalOpened: true
    });
  };

  closeModalAndClear = () => {
    this.props.clearPastMessages;
    this.setState({
      opened: !this.state.opened,
      isModalOpened: false,
      messages: []
    });
  };

  closeModal = () => {
    this.setState({
      opened: !this.state.opened,
      isModalOpened: false
    });
  };

  modalMessage = "Clear history before hiding chat?";

  render() {
    let tagKey = 3.01;
    return (
      <div>
        {this.state.isModalOpened && 
        <Modal callBack={this.closeModalAndClear} 
          isOpened={this.state.isModalOpened} 
          message={this.modalMessage}
          cancel={this.closeModal}
          hasConfirm={true}
          hasCancel={true}
          top="25%"
          left="33%"
          height="40%"
          width="40%"
        />}
      <div className="ChatBox" >
        {this.state.opened?
        <button className="close-x" onClick={this.openModal}>
          Minimize
        </button>
        :
        <button className="close-x" onClick={this.toggleChat}>
          CHAT
        </button>
        }
        <div style={{display:(!this.state.opened? "none" : "inherit")}}>
          <ul className="chat-messages-list" >
            <li>{this.props.userInfo.chatInfo? this.props.userInfo.chatInfo.room:null}</li>
            {this.state.messages && this.state.messages.length > 0 && this.state.messages && this.state.messages[0]? Object.keys(this.state.messages[0]).map(key => {
              let 
              // list = Object.keys(this.state.messages[0]),
              msgs = this.state.messages[0],
              content = msgs[key];
              return (
                <PastMessages key={tagKey += 1} msg={content}/>
              )
            })
            :
            null
            }
          </ul>
          <NewMessage />
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  userInfo: state.userInfo
});

export default connect (mapStateToProps, {getMsgHistory, clearPastMessages}) (ChatBox)