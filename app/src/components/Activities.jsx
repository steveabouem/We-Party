import React from "react";
import Navigation from "./Navigation.jsx";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import { loadActivities } from "../actions/index"
import { connect } from "react-redux";


class Activities extends React.Component {

  async componentDidMount() {
   await this.props.loadActivities;
   console.log(this.props.userInfo.userInfo);
   
  }
  render(){
    
    return(
      <div className="activities-page">
        <Navigation />
        <span className="instructions-primary">
          <p>
            Review, update or delete your activities here. 
            <br/> <b style={{textDecoration: "underline"}}> Note</b>: Unmatched activities are listed in the pending section.
          </p>
        </span>
        <div className="all-activities">
        {( this.props.userInfo.userInfo.activities? 
          Object.keys(this.props.userInfo.userInfo.activities).forEach(activityKey => {
            console.log(this.props.userInfo.userInfo.activities[activityKey]);
            return(
            <div>
              <div className="results-cards" id="matched">
              
              </div>
              <div className="results-cards" id="unmatched">

              </div>
           </div>
            )
          })
          :         
          <p className="no-data-prompt"> No activity saved, please save one first </p>
        )}
        </div>
        <span className="photo-credentials">
          Photo by Kym Ellis on Unsplash
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect (mapStateToProps, {loadActivities}) (Activities)