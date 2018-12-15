import React from "react";
import { getMsgHistory } from "../../actions";
import { connect } from "react-redux";

class PastMessages extends React.Component {
  msgHistory = this.props.userInfo.messages;

  render(){
    return(
      <li className="past-message">
        {this.props.msg.email}: {this.props.msg.message}
      </li>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect( mapStateToProps, { getMsgHistory }) (PastMessages);