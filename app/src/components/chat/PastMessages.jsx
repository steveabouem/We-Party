import React from "react";
import { getMsgHistory } from "../../actions";
import { connect } from "react-redux";

class PastMessages extends React.Component {


  
  render(){
    console.log("past msg props", this.props);
    
    return(
      <li>
        {  this.props.userInfo.chatInfo ?
         <p>{this.props.userInfo.chatInfo.room}</p>
        :
        null
        }
      </li>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect( mapStateToProps, { getMsgHistory }) (PastMessages);