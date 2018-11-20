import React from "react";

import Navigation from "./Navigation.jsx";
import MatchedActs from "../utils/MatchedActs";
import ConfirmationModal from "./modals/confirmation";
import UnmatchedActs from "../utils/UnmatchedActs";

import { connect } from "react-redux";
import { retrieveJoinedProps } from "../actions";
import { success } from "./modals/content";
 
class Activities extends React.Component {

  deleteActivity = (activity) => {
  }
  
  async componentWillMount() {
    await this.props.retrieveJoinedProps(this.props.userInfo.userInfo.email);
    // console.log("props", this.props.userInfo.joinedList);
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
          <UnmatchedActs />
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