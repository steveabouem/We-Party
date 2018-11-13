import React from "react";
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import Navigation from "./Navigation.jsx";
import location  from "../utils/icons/location.svg";
import phone  from "../utils/icons/smartphone.svg";
import trash from "../utils/icons/trash.svg";
import {retrieveAuthUser} from "../actions/index";
import MatchedActs from "../utils/MatchedActs";
import UnmatchedActs from "../utils/UnmatchedActs";

 
class Activities extends React.Component {

  deleteActivity = (activity) => {
  }
  
  async componentDidMount() {
    await this.props.retrieveAuthUser();
    console.log("props", this.props);
  }
  

  render(){
    
    return(
      <div className="activities-page">
        <Navigation />
        {( !this.props.userInfo.loggedIN? 
        <h1 className="login-prompt"> Please log in to consult this page </h1>
        :
        <div className="all-activities-container">
          <MatchedActs activitiesList={this.props.userInfo.activitiesList}/>
          <UnmatchedActs activitiesList={this.props.userInfo.activitiesList}/>
        </div>
        )}
      </div>
        
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect (mapStateToProps, {retrieveAuthUser}) (Activities)