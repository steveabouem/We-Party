import React from "react";
import NewMessage from "./NewMessage.jsx";
import PastMessages from "./PastMessages.jsx";
import { getMsgHistory } from "../../actions";
import { connect } from "react-redux";
import firebase from "firebase";

class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      opened: true
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
      opened: !this.state.opened
    });
  }

  render() {
    let key = 3.01;
    return (
      <div className="ChatBox" >
        <button className="close-x" onClick={this.toggleChat}>
          {this.state.opened? "Minimize": "CHAT"}
        </button>
        <div style={{display:(!this.state.opened? "none" : "inherit")}}>
          <ul className="chat-messages-list" >
            <li>{this.props.userInfo.chatInfo? this.props.userInfo.chatInfo.room:null}</li>
            {this.state.messages && this.state.messages.length > 0 && this.state.messages && this.state.messages[0]? Object.keys(this.state.messages[0]).map(key => {
              let list = Object.keys(this.state.messages[0]),
              msgs = this.state.messages[0],
              content = msgs[key];
              return (
                <PastMessages key={key += 1} msg={content}/>
              )
            })
            :
            null
            }
          </ul>
          <NewMessage />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  userInfo: state.userInfo
});

export default connect (mapStateToProps, {getMsgHistory}) (ChatBox)