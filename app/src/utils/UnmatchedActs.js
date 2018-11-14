import React from "react";
import { connect } from "react-redux";
// import { loadActivities, deleteActivity } from "../actions";
import location  from "./icons/location.svg";
import phone  from "./icons/smartphone.svg";
import trash from "./icons/trash.svg";


class UnmatchedActs extends React.Component {
  render(){
    return(
      <div className="unmatched-activities-container">
        <h2> Activities pending match. </h2>
          {this.props.activitiesList.length > 0 ? this.props.activitiesList.map(match => {
              if(match.creator.email === this.props.userInfo.userInfo.email && match.members.length <= 1) {
                return(
                <ul className="unmatched-item" key={this.props.activitiesList.indexOf(match)}>
                  <h3> Details </h3>
                  <li> 
                    Contribution: { match.budget }
                  </li>
                  <li>
                    Venue: { match.venue}, {match.location}.
                  </li>
                  <li>
                    So far there are {match.group} people partying
                  </li>
                  <li>Created on { match.created }.</li>
                </ul>
              )
            
            } else if ( match.creator.email === this.props.userInfo.userInfo.email && match.members.length > 1 ){
              return (
                <p> </p>
                )
              } else {
                return (
                  <p> You most likely haven't created any activity yet </p>
                )
            }
          })
          :
          <p className="login-prompt"> No activity available. Go ahead and create yours!</p>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {  }) (UnmatchedActs)