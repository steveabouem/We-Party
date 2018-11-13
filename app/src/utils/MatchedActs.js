import React from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import { connect } from "react-redux";
// import {  } from "../actions";
import location  from "./icons/location.svg";
import phone  from "./icons/smartphone.svg";
import trash from "./icons/trash.svg";


class MatchedActs extends React.Component {
  async componentDidMount(){

    console.log("props", this.props);
    
  }

  render(){
    console.log(this.props);
    
    return(
      <div className="matched-activities-container">
      <h2> People also looked for this </h2>
        <div className="single-matched-activity">
          {this.props.activitiesList.length > 0 ? this.props.activitiesList.map(match => {
            {
              if(match.creator.email === this.props)
              console.log(match);
            }
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
                <li>Created on { match.created }.</li>
              </ul>
            )
          })
          :
          <p> No activity yet </p>
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {  }) (MatchedActs)