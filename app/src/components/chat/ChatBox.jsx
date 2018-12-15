import React from "react";
import NewMessage from "./NewMessage.jsx";
import PastMessages from "./PastMessages.jsx";
import { getMsgHistory } from "../../actions";
import { connect } from "react-redux";

class ChatBox extends React.Component {

  render() {
    return (
      <div className="ChatBox">
        <ul className="chat-messages-list">
          <li>{this.props.userInfo.chatInfo? this.props.userInfo.chatInfo.room:null}</li>
          {this.props.userInfo.messages.length > 0? this.props.userInfo.messages.map(msg =>{
            let list = Object.keys(msg);
            for( let key in list){
              let content = msg[list[list.length-1]];

              return (
              <PastMessages msg={content}/>
              )
            }
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