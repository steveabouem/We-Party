import React from "react";
import { connect } from "react-redux";
import location  from "./icons/location.svg";
import phone  from "./icons/smartphone.svg";
import trash from "./icons/trash.svg";


class MatchedActs extends React.Component {

  render(){
    console.log(this.props);
    let keys = 0;
    let currentUser = this.props.userInfo.userInfo
    
    return(
      <div className="matched-activities-container">
      <h2> People also looked for this </h2>
          {this.props.activitiesList.length > 0 ? this.props.activitiesList.map(match => {
              if(match.creator.email === currentUser.email && match.members.length > 1) {
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