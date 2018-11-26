import React from "react";
import { connect } from "react-redux";
import { openChatRoom } from "../actions";

class MatchedActs extends React.Component {
  currentUser = this.props.userInfo.userInfo;
  joinedGroups = [];

  

  render(){
    console.log("matched props", this.props);
    
    return(
        <div className="matched-activities-container">
        <h2> Your groups </h2>
        {this.props.activitiesList.length > 0 ? this.props.activitiesList.map(match => {
          if(match.creator.email === this.currentUser.email && match.members.length > 1) {
            return(
            <ul className="matched-item" key={this.props.activitiesList.indexOf(match)}>
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
            </ul>
            )
            
          } else {
            return null
          }
          
        })
        :
        <p className="login-prompt"> No activity available. Go ahead and create yours!</p>
      }
      {this.props.userInfo.joinedList.length > 1? this.props.userInfo.joinedList.map( match =>{
        console.log(this.props);
        
        return (
        <ul className="matched-item" key={this.props.activitiesList.indexOf(match)}>
          <h3> Created by {match.activity.activity.creator.name} </h3>
          <li> 
            Member contribution: { match.activity.activity.contribution }
          </li>
          <li>
            Venue: { match.activity.activity.venue}, {match.activity.activity.location}.
          </li>
          <li> <b>For</b>: { match.activity.activity.group } people ({ match.activity.activity.genders.split(" ")[0]}, 
            { match.activity.activity.group - match.activity.activity.members.length} missing) </li>
            <li>
              Including yourself, there are {match.activity.activity.members.length -1} people partying:
              - {match.activity.activity.members.map( member => {
                return <span> <b>{ member.name }</b> { member.email } )</span>
              })
            } -
          </li>
          <li><b>Created</b> on { match.activity.activity.created }.</li>
          <button type="button" onClick={this.props.openChatRoom(match)}>
          Group Chat
          </button>
        </ul>
        
        )
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

export default connect(mapStateToProps, {openChatRoom}) (MatchedActs)