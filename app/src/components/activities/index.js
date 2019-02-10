import React from "react";
import firebase from "firebase";
import ChatBox from "../chat/ChatBox.jsx";
import Navigation from "../navigation/Navigation.jsx";
import MatchedActs from "./MatchedActs";
import ConfirmationModal from "../modals/confirmation";
import UnmatchedActs from "./UnmatchedActs";
import { connect } from "react-redux";
import { retrieveJoinedProps, loadActivitiesCollection, deleteActivity } from "../../actions";
import { success } from "../modals/content";
 
class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };

    firebase.auth().onAuthStateChanged(async(currentUser) => {
      if(currentUser) {
        this.setState({
          currentUser: currentUser,
         });
      }
    });
  }
  
  render(){
    return(
      <div className="activities-page">
        <Navigation currentUser={this.state.currentUser}/>
        {
          !this.state.currentUser ?
          <h1 className="login-prompt"> Please log in to consult this page </h1>
        :
          <div className="all-activities-container">
            <ConfirmationModal hints={success.activitiesHint} open={false} index={1} min={3} max={0}/>
            <MatchedActs />
            <UnmatchedActs />
            {this.props.userInfo.chatInfo && <ChatBox />}
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect (mapStateToProps, {retrieveJoinedProps, loadActivitiesCollection, deleteActivity}) (Activities)