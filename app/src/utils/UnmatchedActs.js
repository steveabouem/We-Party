import React from "react";
import { connect } from "react-redux";
// import { loadActivities, deleteActivity } from "../actions";
import location  from "./icons/location.svg";
import phone  from "./icons/smartphone.svg";
import trash from "./icons/trash.svg";


class UnmatchedActs extends React.Component {
  render(){
    let currentUser = this.props.userInfo.userInfo;

    return(
      
      <div className="unmatched-activities-container">
        <h2> Activities pending match. </h2>
          {this.props.activitiesList.length > 0 ? this.props.activitiesList.map(match => {
              if(match.creator.email === currentUser.email && match.members.length <= 1) {
                return(
                <ul className="unmatched-item" key={this.props.activitiesList.indexOf(match)}>
                  <h3> Details </h3>
                  <li> 
                    <b>Contribution</b>: { match.budget }
                  </li>
                  <li>
                    <b>Venue</b>: { match.venue}, {match.location}.
                  </li>
                  <li>Created on { match.created }.</li>
                  <li><b>You wanted</b>: { match.group } buddies.</li>
                </ul>
              )
            
            } else  {
                return 
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