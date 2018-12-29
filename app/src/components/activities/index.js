import React from "react";
import firebase from "firebase";
import ChatBox from "../chat/ChatBox.jsx";
import Navigation from "../navigation/Navigation.jsx";
import MatchedActs from "./MatchedActs";
import ConfirmationModal from "../modals/confirmation";
import UnmatchedActs from "./UnmatchedActs";
import { connect } from "react-redux";
import { retrieveJoinedProps, loadActivitiesCollection } from "../../actions";
import { success } from "../modals/content";
 
class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activitiesList: props.userInfo.activitiesList,
      currentUser: this.props.userInfo.userInfo,
    };
    this.retrieveJoinedProps();
    firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({ currentUser: currentUser });
    });
  }

  retrieveJoinedProps = async() => {
    if( this.props.userInfo.userInfo){
      await this.props.loadActivitiesCollection();
      await this.props.retrieveJoinedProps(this.props.userInfo.userInfo);
      this.setState({
        activitiesList: this.props.userInfo.activitiesList
      })
    }
  }

  render(){
    console.log("act props 7 state", this.props, this.state);
    
    return(
      <div className="activities-page">
        <Navigation currentUser={this.state.currentUser}/>
        {( !this.state.currentUser? 
        <h1 className="login-prompt"> Please log in to consult this page </h1>
        :
        <div className="all-activities-container">
          <ConfirmationModal hints={success.activitiesHint} open={false} index={1} min={3} max={0}/>
          <MatchedActs activitiesList={this.state.activitiesList}/>
          <UnmatchedActs activitiesList={this.state.activitiesList}/>
          {this.props.userInfo.chatInfo? <ChatBox /> : null}
        </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect (mapStateToProps, {retrieveJoinedProps, loadActivitiesCollection}) (Activities)