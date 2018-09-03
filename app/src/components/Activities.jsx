import React from "react";
import Navigation from "./Navigation.jsx";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import location  from "../utils/icons/location.svg";
import phone  from "../utils/icons/smartphone.svg";
import trash from "../utils/icons/trash.svg";
import { loadActivities, deleteActivity } from "../actions/index";
import { connect } from "react-redux";


class Activities extends React.Component {

  async componentDidMount() {
   await this.props.loadActivities;
   console.log(this.props.userInfo.userInfo);
  }

  
  deleteActivity = (object) => {

  }
  render(){
    
    return(
      <div>
        <Navigation />
      {( !this.props.userInfo.userInfo.activities? 
        <h1> Please log in to consult this page </h1>
        :
      <div className="activities-page">
      
        <span className="instructions-primary">
          <p>
            Review, update or delete your activities here. 
            <br/> <b style={{textDecoration: "underline"}}> Note</b>: Unmatched activities are listed in the pending section.
          </p>
        </span>
        <div className="all-activities" style={{overflow: "auto"}}>
        {( 
          // this.props.userInfo.userInfo.activities? 
          Object.keys(this.props.userInfo.userInfo.activities).map(activityKey => {
            console.log(this.props.userInfo.userInfo.activities[activityKey].activity);
            const activity = this.props.userInfo.userInfo.activities[activityKey].activity;
            return(
            <div>
              <div className="single-activity">
                <Col md={{ size: 10 }} key={activity.alias}>
                  <Card className="single-activity">
                    {/* <CardImg top width="100%" height="200px" src={result.image_url} /> //ICON Or IMG? */}
                    <CardBody>
                      <CardTitle> {activity.venue} (Insert Creation Date Here) </CardTitle>
                      <CardText key={activityKey}>
                        {/* <span> //SEND WITH RESPONSE, YOU NEED THIS
                        <img src={phone} alt="phone" className="result-icon" />: {result.display_phone} <br/>
                        </span> */}
                          Number of people: {activity.group} <br/>
                          Your budget: {activity.budget} <br/>
                          <img src={phone} alt="phone" className="result-icon" />: {activity.contact? activity.contact : "None saved"} <br/>
                          <span>
                            <img src={location} alt="location" className="result-icon" key={activityKey}/>: Venue: {activity.location}
                          </span>
                      </CardText>
                      <button className="delete-activity" onClick={(e) => {this.deleteActivity(activity)}} style={{bottom:"0.5em"}}>
                        <img src={trash} alt="trash" className="result-icon" />
                      </button>
                    </CardBody>
                  </Card>
                </Col>
              </div>
              <div className="results-cards" id="unmatched">
                {/* will add conditional on object.matched */}
              </div>
           </div>
            )
          })
          // :         
          // <p className="no-data-prompt"> No activity saved, please save one first </p>
        )}
        
        </div>
        <span className="photo-credentials">
          Photo by Kym Ellis on Unsplash
        </span>
      </div>
      )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect (mapStateToProps, {loadActivities, deleteActivity}) (Activities)