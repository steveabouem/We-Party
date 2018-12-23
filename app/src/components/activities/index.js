import React from "react";
import ChatBox from "../chat/ChatBox.jsx";
import Navigation from "../navigation/Navigation.jsx";
import MatchedActs from "./MatchedActs";
import ConfirmationModal from "../modals/confirmation";
import UnmatchedActs from "./UnmatchedActs";
import { connect } from "react-redux";
import { retrieveJoinedProps } from "../../actions";
import { success } from "../modals/content";
 
class Activities extends React.Component {

  deleteActivity = (activity) => {
  }
  
  componentDidMount() {
    if( this.props.userInfo.userInfo){
      this.props.retrieveJoinedProps(this.props.userInfo.userInfo);
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
          <MatchedActs activitiesList={this.props.userInfo.activitiesList}/>
          <UnmatchedActs activitiesList={this.props.userInfo.activitiesList}/>
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

export default connect (mapStateToProps, {retrieveJoinedProps}) (Activities)