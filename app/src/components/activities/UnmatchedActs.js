import React from "react";
import { connect } from "react-redux";

class UnmatchedActs extends React.Component {

  render(){
    let key = 0;
    return(
      <div className="unmatched-activities-container">
        <h2> Activities pending match. </h2>
          {this.props.activitiesList.unmatched? this.props.activitiesList.unmatched.map(match => {
            if(match.creator.email === this.props.userInfo.userInfo.email) {
              return(
                <ul className="unmatched-item" key={key += 0.43}>
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
            } else {
              return null
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

export default connect(mapStateToProps) (UnmatchedActs)