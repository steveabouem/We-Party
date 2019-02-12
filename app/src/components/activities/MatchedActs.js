import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { openChatRoom, getMsgHistory, deleteActivity, loadActivitiesCollection, retrieveJoinedProps } from "../../actions";
import Modal from "../modals";


class MatchedActs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false
    };
  };

  currentUser = firebase.auth().currentUser;
  joinedGroups = [];
  index = 0;

  openChatRoom = async(e, match) => {
    e.preventDefault();
    e.stopPropagation();
    this.index += 1;
    await this.props.openChatRoom(this.index, match, this.currentUser);
  }

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

  deleteActivity = async(e, match) => {
    await this.props.deleteActivity({key: match.key, isMatched: "yes"});
    this.setState({
      activitiesList: this.props.userInfo.activitiesList,
      isModalOpened: false
    });
  };
  
  modalMessage = "Are you sure you want to delete this activity? All users will lose this information if you proceed";
  
  // async componentDidMount() {
  //   await this.props.loadActivitiesCollection();
  //   await this.props.retrieveJoinedProps();
  // }

  render(){
    let key = 0;
    return(
        <div className="matched-activities-container">
        <h2> Groups Created </h2>
        {
          this.props.userInfo.activitiesList
          && this.props.userInfo.activitiesList.matched
          ?
          this.props.userInfo.activitiesList.matched.map(match => {
          if(match.creator.email === this.currentUser.email && match.members.length > 1) {
            return(
            <ul className="matched-item" key={key +=.23}>
              {this.state.isModalOpened && 
                <Modal
                  callBack={e => { this.deleteActivity(e, match) }} 
                  isOpened={this.state.isModalOpened} 
                  hasConfirm={true}
                  hasCancel={true}
                  message={this.modalMessage}
                  cancel={this.closeModal}
                  top="20%"
                  left="33%"
              />}
              <h3> Created by you </h3>
              <li> 
                <b>Member contribution</b>: { match.contribution }
              </li>
              <li>
                <b>Venue</b>: { match.venue}, {match.location}.
              </li>
              <li> <b>For</b>: { match.group } people ({ match.genders.split(" ")[0]}, 
                { match.group - match.members.length} missing) </li>
                <li>
                  So far there are {match.members.length -1} people joining:
                  - {match.members.map( member => {
                    return <span key={key += 5.0348594}> <b>{ member.name }</b> { member.email } )</span>
                  })
                } -
              </li>
              <li>Created on { match.created }.</li>
              <button key={key += 1.4} type="button" onClick={e => {this.openChatRoom(e, match)}}>
                Start Chat?
              </button>
              <button key={key += 0.034} type="button" onClick={this.openModal}>
                Delete
              </button>
            </ul>
            )
          } else {
            return(
              <ul className="matched-item" key={key +=.24}>
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
                <h3> Created by {match.creator.name} </h3>
                <li> 
                  <b>Member contribution</b>: { match.contribution }
                </li>
                <li>
                  <b>Venue</b>: { match.venue}, {match.location}.
                </li>
                <li> <b>For</b>: { match.group } people ({ match.genders.split(" ")[0]}, 
                  { match.group - match.members.length} missing) </li>
                  <li>
                    So far there are {match.members.length -1} people joining:
                    - {match.members.map( member => {
                      return <span key={ key += .42}> <b>{ member.name }</b> { member.email } )</span>
                    })
                  } -
                </li>
                <li>Created on { match.created }.</li>
                <button key={key += 3.32} type="button" onClick={e => {this.openChatRoom(e, match)}}>
                  Start Chat?
                </button>
                <button key={key += 0.034} type="button" onClick={this.openModal}>
                  Delete
                </button>
              </ul>
            )}
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

export default connect(mapStateToProps, {openChatRoom, getMsgHistory, deleteActivity, loadActivitiesCollection}) (MatchedActs)