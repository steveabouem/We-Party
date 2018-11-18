import React from "react";
import { connect } from "react-redux";
import JoinedGroups from "./joinedGroups";

class MatchedActs extends React.Component {
  currentUser = this.props.userInfo.userInfo;
  joinedGroups = [];
// USE JOINGROUPS COMPONENT IN ACTIVITY PAGE THERE SEEMs TO BE TOO MUCH GOING ON IF I TRY  HERE

  checkJoinedGroups = () =>{
    this.props.activitiesList.map( activity => {

      activity.members.forEach( member => {

        if(member.email === this.currentUser.email) {
          console.log("FOUND", member.email);
          this.joinedGroups.push(activity);
        }

      })
    })

    console.log(this.joinedGroups);
    
  }

 async componentDidMount (){
    await this.checkJoinedGroups();
  }

  render(){
    let keys = 0;
    
    return(
      <div className="matched-activities-container">
      <h2> Activities currently matched </h2>
      <JoinedGroups groups={this.joinedGroups}/>
          {this.props.activitiesList.length > 0 ? this.props.activitiesList.map(match => {
              if(match.creator.email === this.currentUser.email && match.members.length > 1) {
                return(
                <ul className="matched-item" key={this.props.activitiesList.indexOf(match)}>
                  <h3> Details </h3>
                  <li> 
                    Member's contribution: { match.contribution }
                  </li>
                  <li>
                    Venue: { match.venue}, {match.location}.
                  </li>
                  <li> <b>For</b>: { match.group } people ({ match.genders.split(" ")[0]}, 
                  { match.group - match.members.length} missing) </li>
                  <li>
                    So far there are {match.members.length -1} people partying:
                    - {match.members.map( member => {
                      return <span> <b>{ member.name }</b> { member.email } )</span>
                      })
                    } -
                  </li>
                  <li>Created on { match.created }.</li>
                </ul>
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

export default connect(mapStateToProps, {  }) (MatchedActs)