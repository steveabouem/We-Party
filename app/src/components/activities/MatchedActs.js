import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import firebase from "firebase";
import { openChatRoom, getMsgHistory, deleteActivity, loadActivitiesCollection, retrieveJoinedProps } from "../../actions";
import Modal from "../modals";


class MatchedActs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: false,
      isLoading: true,
      activitiesList: {}
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

  deleteActivity = async(activity) => {
    console.log("delete",{activity});
    
    await this.props.deleteActivity({key: activity.key, isMatched: "yes"});
    this.setState({activitiesList: {...this.state.activitiesList, matched: this.state.activitiesList.unmatched.splice(1,activity)}});
  };
  
  modalMessage = "Are you sure you want to delete this activity? All users will lose this information if you proceed";

  async componentDidMount() {
    await this.props.loadActivitiesCollection();
    this.setState({activitiesList: this.props.userInfo.activitiesList});
  }

  componentDidUpdate(prevProps) {
    if(prevProps.userInfo.activitiesList && prevProps.userInfo.activitiesList.matched !== this.props.userInfo.activitiesList.matched) {
      this.setState({activitiesList: this.props.userInfo.activitiesList, isModalOpened:false})
    }
  }

  render(){
    const {isModalOpened, activitiesList} = this.state;
    return(
        <div className="matched-activities-container">
        <h2> Groups Created </h2>
        {
          activitiesList
          && activitiesList.matched
          ?
          activitiesList.matched.map(match => {
            let dateDiff = moment(match.eventDate).diff(moment().startOf('day'), "days");
            if(match.creator && match.creator.email === firebase.auth().currentUser.email && match.members.length > 1) {
              return(
                <ul className="matched-item" key={match.id}>
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
                  <h4> Created by you <span className="material-icons yellow">account_circle</span></h4>
                  <li> 
                    <b>Member contribution</b>: { match.contribution }
                  </li>
                  <li>
                    <b>Venue</b>: { match.venue}, {match.location}.
                  </li>
                  <li> <b>For</b>: { match.group } {match.genders === "Random" ? "people" : match.genders === "Boyz Night Out" ? "gentlemen" :  match.genders === "Girls Night Out" ? "ladies" : ""} ({ match.group - match.members.length} missing) </li>
                    <li>
                      So far there are {match.members.length -1} people joining:
                      - {match.members.map( member => {
                        return <span key={match.id + "group-size"}> <b>{ member.name }</b> { member.email } )</span>
                      })
                    } -
                  </li>
                  <li>
                    Event occurs on {moment(match.eventDate).format("ddd, MMM Do YY")} (in {dateDiff} {dateDiff > 1 ? " days" : " day"}) 
                  </li>
                  <li>Created on { match.created }.</li>
                  <button key={match.id + "-chat"} type="button" onClick={e => {this.openChatRoom(e, match)}}>
                    Start Chat? <span className="material-icons">chat_bubble</span>
                  </button>
                  <button key={match.id + "-delete"} type="button" onClick={this.openModal}>
                    Delete
                  </button>
                </ul>
              )
            } else {
              return(
                <ul className="matched-item" key={match.id + "-container"}>
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
                  <h4> Created by {match.creator && match.creator.displayName} <span className="material-icons">supervised_user_circle</span></h4>
                  <li> 
                    <b>Member contribution</b>: { match.contribution }
                  </li>
                  <li>
                    <b>Venue</b>: { match.venue}, {match.location}.
                  </li>
                  <li> <b>For</b>: { match.group } 
                    {match.genders === "Random" ? "people" 
                    : match.genders === "Boyz Night Out" ? " gentlemen" 
                    :  match.genders === "Girls Night Out" ? " ladies" 
                    : ""} 
                    ({ match.group - match.members.length} missing) </li>
                    <li>
                      So far there are {match.members.length -1} people joining:
                      <br/>
                      {match.members.map( (member, i) => {
                        return <span key={match.id + `-${i}`}> {member.displayName} ({member.email})<br/></span>
                      })
                    }
                  </li>
                  <li>
                  Event occurs on {moment(match.eventDate).format("ddd, MMM Do YY")} (in {dateDiff} {dateDiff > 1 ? " days" : " day"}) 
                  </li>
                  <li>Created on { match.created }.</li>
                  <button key={match.id + "-chat"} type="button" onClick={e => {this.openChatRoom(e, match)}}>
                    Start Chat?
                  </button>
                  <button key={match.id + ".delete"} type="button" onClick={this.openModal}>
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