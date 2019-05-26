import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import firebase from "firebase";
import { deleteActivity, loadActivitiesCollection, retrieveJoinedProps } from "../../actions";

class UnmatchedActs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false,
      isLoading: true,
      activitiesList: {}
    };
    this.deleteActivity=this.deleteActivity.bind(this);
  };

  openModal = () => {
    this.setState({
      isModalOpened: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpened: false
    });
  };

  async deleteActivity(activity) {
    await this.props.deleteActivity({key: activity.id, isMatched: "no"});
    this.setState({activitiesList: {...this.state.activitiesList, unmatched: this.state.activitiesList.unmatched.splice(1,activity)}});
  };

  modalMessage = "Are you sure you want to delete this activity? No user will be able to match with you if you proceed.";

  async componentDidMount() {
    await this.props.loadActivitiesCollection();
    this.setState({activitiesList: this.props.userInfo.activitiesList});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.userInfo.activitiesList && prevProps.userInfo.activitiesList.unmatched !== this.props.userInfo.activitiesList.unmatched) {
      this.setState({activitiesList: this.props.userInfo.activitiesList, isModalOpened:false})
    }
  }

  render(){
    let key = 0;
    const {isModalOpened, activitiesList} = this.state;
    return(
      <div className="unmatched-activities-container">
        <h2>Activities with no groups</h2>
          {activitiesList.unmatched && activitiesList.unmatched.map(match => {
            let dateDiff = moment(match.eventDate).diff(moment().startOf('day'), "days");
            if (match.creator && match.creator.email === firebase.auth().currentUser.email) {
              return (
                <ul className="unmatched-item" key={match.id}>
                  {isModalOpened && 
                    <div key={match.id + "-modal"} className='standard-modal' style={{
                      top: "20%", left:"33%"}}
                    >
                      <div>{this.modalMessage}</div>
                      <span className='standard-modal-buttons'>
                        <button onClick={e => {this.setState({isModalOpened: false})}} className="cancel-action">
                          NO
                        </button>
                        <button
                          onClick={e => {this.deleteActivity(match)}}
                          className="confirm-action"
                        >
                          YES
                        </button>
                      </span>
                    </div>
                  }
                  <h4> Details </h4>
                  <li> 
                    <b>Contribution</b>: { match.budget }
                  </li>
                  <li>
                    <b>Venue</b>: { match.venue }, { match.location }.
                  </li>
                  <li>Created on {match.created}.</li>
                  <li> Event occurs on {moment(match.eventDate).format("ddd, MMM Do YY")} (in {dateDiff} {dateDiff > 1 && " days"} {dateDiff === 1 && " day"})</li>
                  <li><b>You wanted</b>: { match.group } {match.genders === "Random" ? "people" : match.genders === "Boyz Night Out" ? "gentlemen" :  match.genders === "Girls Night Out" ? "ladies" : ""}.</li>
                  <button key={match.id + '.delete'} type="button" onClick={this.openModal}>
                    Delete
                  </button>
                </ul>
              )
            } 
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {deleteActivity, loadActivitiesCollection, retrieveJoinedProps}) (UnmatchedActs)