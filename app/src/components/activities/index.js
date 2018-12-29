import React from "react";
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
      activitiesList: props.userInfo.activitiesList
    };
    this.retrieveJoinedProps();
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
    return(
      <div className="activities-page">
        <Navigation />
        {( !this.props.userInfo.userInfo.email? 
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