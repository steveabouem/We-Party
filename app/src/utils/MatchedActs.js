import React from "react";
import { connect } from "react-redux";
import { openChatRoom, getMsgHistory } from "../actions";

class MatchedActs extends React.Component {
  currentUser = this.props.userInfo.userInfo;
  joinedGroups = [];
  index = 0;

  openChatRoom = async(e, match) => {
    e.preventDefault();
    e.stopPropagation();
    this.index += 1;
    await this.props.openChatRoom(this.index, match, this.currentUser);
    if(this.props.userInfo.chatInfo && this.props.userInfo.chatInfo.chatkey)
    this.props.getMsgHistory(this.props.userInfo.chatInfo.chatkey)
  }

  render(){
    let key = 0;
    return(
        <div className="matched-activities-container">
        <h2> Your groups </h2>
        {this.props.activitiesList.matched ? this.props.activitiesList.matched.map(match => {
          if(match.creator.email === this.currentUser.email && match.members.length > 1) {
            return(
            <ul className="matched-item" key={this.props.activitiesList.matched.indexOf(match)}>
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
                    return <span> <b>{ member.name }</b> { member.email } )</span>
                  })
                } -
              </li>
              <li>Created on { match.created }.</li>
              <button key={key += 1.4} type="button" onClick={e => {this.openChatRoom(e, match)}}>
                Start Chat?
              </button>
            </ul>
            )
            
          } else {
            return(
              <ul className="matched-item" key={this.props.activitiesList.matched.indexOf(match)}>
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
                      return <span> <b>{ member.name }</b> { member.email } )</span>
                    })
                  } -
                </li>
                <li>Created on { match.created }.</li>
                <button key={key += 1.32} type="button" onClick={e => {this.openChatRoom(e, match)}}>
                  Start Chat?
                </button>
              </ul>
            )}
          
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

export default connect(mapStateToProps, {openChatRoom, getMsgHistory}) (MatchedActs)