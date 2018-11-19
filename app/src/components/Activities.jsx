import React from "react";
import { connect } from "react-redux";

import Navigation from "./Navigation.jsx";
import MatchedActs from "../utils/MatchedActs";
import UnmatchedActs from "../utils/UnmatchedActs";
import { retrieveJoinedProps } from "../actions";
 
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