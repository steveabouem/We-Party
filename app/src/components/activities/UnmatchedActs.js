import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { deleteActivity, loadActivitiesCollection } from "../../actions";

class UnmatchedActs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activitiesList: props.userInfo.activitiesList? props.userInfo.activitiesList : null
    }
  }

  deleteActivity = async(e, activity) => {
    await this.props.deleteActivity({key: activity.key, isMatched: "no"});
    await this.props.loadActivitiesCollection();
    this.setState({
      activitiesList: this.props.userInfo.activitiesList? this.props.userInfo.activitiesList : null
    });
  };

  render(){
    let key = 0;
    return(
      <div className="unmatched-activities-container">
        <h2> Activities pending match. </h2>
          {this.state.activitiesList && this.state.activitiesList.unmatched? this.state.activitiesList.unmatched.map(match => {
            if(match.creator.email === firebase.auth().currentUser.email) {
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
                  <button key={key += 0.034} type="button" onClick={e => {this.deleteActivity(e,match)}}>
                    Delete
                  </button>
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

export default connect(mapStateToProps, {deleteActivity, loadActivitiesCollection}) (UnmatchedActs)