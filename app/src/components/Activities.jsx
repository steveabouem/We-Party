import React from "react";
import { connect } from "react-redux";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
import Navigation from "./Navigation.jsx";
import location  from "../utils/icons/location.svg";
import phone  from "../utils/icons/smartphone.svg";
import trash from "../utils/icons/trash.svg";
import { loadActivities, deleteActivity } from "../actions/index";
import MatchedActs from "../utils/MatchedActs";
import UnmatchedActs from "../utils/UnmatchedActs";

 
class Activities extends React.Component {

  async componentDidMount() {
   await this.props.loadActivities;
  //  console.log(this.props.userInfo.userInfo);
  }

  
  deleteActivity = (activity) => {
    this.props.deleteActivity(activity)    
  }
  
  render(){
    console.log("activities props", this.props);
    
    return(
      <div className="activities-page">
        <Navigation />
        {( !this.props.userInfo.userInfo.activities? 
        <h1 className="login-prompt"> Please log in to consult this page </h1>
        :
        <div className="all-activities-container">
          <MatchedActs />
          <UnmatchedActs />
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