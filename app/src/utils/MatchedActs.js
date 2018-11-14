import React from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import { connect } from "react-redux";
import location  from "./icons/location.svg";
import phone  from "./icons/smartphone.svg";
import trash from "./icons/trash.svg";


class MatchedActs extends React.Component {

  render(){
    console.log(this.props);
    let keys = 0;
    
    return(
      <div className="matched-activities-container">
      <h2> People also looked for this </h2>
          {this.props.activitiesList.length > 0 ? this.props.activitiesList.map(match => {
              if(match.creator.email === this.props.userInfo.userInfo.email && match.members.length > 1) {
                return(
                <ul className="matched-item" key={this.props.activitiesList.indexOf(match)}>
                  <h3> Details </h3>
                  <li> 
                    Contribution: { match.budget }
                  </li>
                  <li>
                    Venue: { match.venue}, {match.location}.
                  </li>
                  <li>
                    So far there are {match.group} people partying
                  </li>
                  <li>Created on { match.created }.</li>
                </ul>
              )
            
            } else if ( match.creator.email === this.props.userInfo.userInfo.email && match.members.length <= 1 ) {
              
              return null

              } else {
                return (
                  <p></p>
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