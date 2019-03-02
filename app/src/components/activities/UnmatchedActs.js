import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import firebase from "firebase";
import { deleteActivity, loadActivitiesCollection, retrieveJoinedProps } from "../../actions";
import Modal from "../modals";

class UnmatchedActs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false
    };
  };

  openModal = () => {
    this.setState({
      isModalOpened: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpened: false
    })
  };

  deleteActivity = async(e, activity) => {
    await this.props.deleteActivity({key: activity.key, isMatched: "no"});
    window.location.reload();
  };

  modalMessage = "Are you sure you want to delete this activity? No user will be able to match with you if you proceed.";

  async componentDidMount() {
    await this.props.loadActivitiesCollection();
  }

  render(){
    let key = 0;
    return(
      <div className="unmatched-activities-container">
        <h2>Activities pending match</h2>
          {this.props.userInfo.activitiesList && this.props.userInfo.activitiesList.unmatched? this.props.userInfo.activitiesList.unmatched.map(match => {
            let dateDiff = moment(match.eventDate).diff(moment().startOf('day'), "days");
            if (match.creator.email === firebase.auth().currentUser.email) {
              return(
                <ul className="unmatched-item" key={key += 0.43}>
                  {this.state.isModalOpened && 
                  <Modal callBack={e => {this.deleteActivity(e, match)}} 
                    isOpened={this.state.isModalOpened} 
                    hasConfirm={true}
                    hasCancel={true}
                    message={this.modalMessage}
                    cancel={this.closeModal}
                    top="20%"
                    left="33%"
                  />}
                  <h3> Details </h3>
                  <li> 
                    <b>Contribution</b>: { match.budget }
                  </li>
                  <li>
                    <b>Venue</b>: { match.venue }, { match.location }.
                  </li>
                  <li>Created on {match.created}.</li>
                  <li> Event occurs on {moment(match.eventDate).format("ddd, MMM Do YY")} (in {dateDiff} {dateDiff > 1 && " days"} {dateDiff === 1 && " day"})</li>
                  <li><b>You wanted</b>: { match.group } {match.genders === "Random" ? "people" : match.genders === "Boyz Night Out" ? "gentlemen" :  match.genders === "Girls Night Out" ? "ladies" : ""}.</li>
                  <button key={key += 0.034} type="button" onClick={this.openModal}>
                    Delete
                  </button>
                </ul>
              )
            } 
          })
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {deleteActivity, loadActivitiesCollection, retrieveJoinedProps}) (UnmatchedActs)