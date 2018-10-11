import React from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import { connect } from "react-redux";
import { loadActivities, deleteActivity } from "../actions";
import location  from "./icons/location.svg";
import phone  from "./icons/smartphone.svg";
import trash from "./icons/trash.svg";


class MatchedActs extends React.Component {
  componentDidMount(){
  }

  render(){
    let usersList = this.props.userInfo.usersList, matched;
    return(
      <div className="matched-activities-container">
      <h2> People also looked for this </h2>
        {
          usersList.map(user =>{
            let cardToRender = [], singleActivity;
            for(let activityKey in user.activities){
              singleActivity = user.activities[activityKey].activity;
              console.log("single val", singleActivity);
              if(singleActivity.match){
                cardToRender.push(singleActivity)
              }
            }
            console.log("final val", cardToRender);
            return(
              <div className="single-matched-activity">
                {cardToRender.map(match => {
                  return(
                  <ul className="matched-item">
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
                  </ul>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, { loadActivities, deleteActivity }) (MatchedActs)