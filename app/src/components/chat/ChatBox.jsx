import React from "react";
import NewMessage from "./NewMessage.jsx";
import PastMessages from "./PastMessages.jsx";
import { getMsgHistory } from "../../actions";
import { connect } from "react-redux";

class ChatBox extends React.Component {
  componentDidMount() {
    if(this.props.userInfo.chatInfo) {
      this.props.getMsgHistory(this.props.userInfo.chatInfo.chatkey);
      console.log('box props', this.props);
    }
  }

  render() {
    
    let key = 3.01;
    return (
      <div className="ChatBox">
        <ul className="chat-messages-list">
          <li>{this.props.userInfo.chatInfo? this.props.userInfo.chatInfo.room:null}</li>
          {this.props.userInfo.messages.length > 0?
            Object.keys(this.props.userInfo.messages[0]).map(key => {
              let list = Object.keys(this.props.userInfo.messages[0]),
              msgs = this.props.userInfo.messages[0];
              console.log('props-messaes-msg-index in msg', msgs[key]);
              
              let content = msgs[key];

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
    )
  }
}

const mapStateToProps = state =>({
  userInfo: state.userInfo
})

export default connect (mapStateToProps, {getMsgHistory}) (ChatBox)