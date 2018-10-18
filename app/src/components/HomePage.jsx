import React from "react";
import { connect } from "react-redux";
import "firebase/database";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from "reactstrap";
import Navigation from "./Navigation.jsx";
import TextField from "../utils/TextField";
import Confirmation from "../utils/ConfirmPopUp";
import { searchActivities, findMatches, createActivity, loadUsersCollection, loadActivitiesCollection } from "../actions";
import location  from "../utils/icons/location.svg";
import phone  from "../utils/icons/smartphone.svg";


class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      loggedIn: null,
      list: null
    }
  }

  async componentDidMount() {
    await this.props.loadUsersCollection();
    await this.props.loadActivitiesCollection();

    console.log("async", this.props);
    
    
  }
  
  recordSearch = async() => {
    console.log("props at record search", this.props);
    
    let input = document.getElementById("SEARCH_VENUE").value; 
    
    await this.props.searchActivities(input);
  }
  
  createActivity = (e,object) => {// use cookies upon deployment, this is just taking in the latest user logged in
    e.stopPropagation();

    const currentUser = this.props.userInfo.userInfo;
    let date = new Date();
    let dateString = date.toString().split(" ").slice(0, 5);
    let created = `${dateString[0]}, ${dateString[1]}/${dateString[2]} ${dateString[3]}`;
    const groupTotal = document.getElementById("how-many").value;
    const budget = document.getElementById("budget-selected").innerHTML;
    const gender = document.getElementById("gender-selected").innerHTML;
    let activityObject = { currentUser: currentUser , creator: currentUser, venue: object.name, location:object.location.address1, contact: object.phone, contribution: budget, group: groupTotal, members: [currentUser], genders: gender, match: "false", created: created };
   
    this.props.createActivity(activityObject);
  }

  focus = async() => {
    let loginButton = document.getElementsByClassName('link-primary')[0];
    loginButton.focus();
    
  }

  render (){
    // console.log("homepage prps", this.props);

    const ApiResponse = this.props.userInfo.searchResults;
     /* LOCATE SITE IN YELP and give yelp page if none, for learn mre bttn*/
    return(
      <div className="home-container">
        <Navigation />
        <div className="image-holder">
          <div className="row">
          <div className="col-lg-8">
            <div className="input-group">
            <span className="instructions-primary">
              <p>Make it happen. Create your party!</p>
            </span>
            <span className="form-wrapper" style={{padding: "1%"}}>
              <TextField style={{margin: "1%"}}/>
              {this.props.userInfo.userInfo.userInfo?
              <button style={{margin: "1%", height: "90%"}} id="disabled-button" onClick={this.focus}>
                Please Login
              </button>
              :
              <button className="button-primary" style={{margin: "1%", height: "90%"}} onClick={this.recordSearch}>
                Find Match!
              </button>
              }
            </span>
            </div>
            <span className="photo-credentials"> Photo by Gades Photography on Unsplash </span>
          </div>
        </div>
        </div>
        <div className="results-cards">
          {ApiResponse !== undefined ? ApiResponse.results.map(result => {
            return(
              <Col md = {{ size: 10 }} key={result.alias}>
                <Card className="result-cards">
                  <Confirmation key = {result.id} yelpResult = {result} createActivity = {this.createActivity} activitiesList={this.props.userInfo.activitiesList} />
                  
                  <CardImg top width="100%" height="200px" src={result.image_url} />
                  <CardBody>
                    <CardTitle> Venue: <br/> {result.name} </CardTitle>
                    {/* <CardSubtitle>Category: {result.categories[0].title} </CardSubtitle> */}
                    <CardText>
                      Description: <br/>
                      Yelp rating: {result.rating} ({result.review_count} reviews) <br/>
                      <span>
                      <img src={phone} alt="phone" className="result-icon" />: {result.display_phone} <br/>
                      </span>
                      <span>
                        <img src={location} alt="location" className="result-icon" />: {result.location.address1} <br/>
                        {/* Stephen Hutchings */}
                      </span>
                      {/* distance:  {result.distance} <br/> */}
                    </CardText>
                    <a href={result.url} target="blank">
                     <Button>Venue details...</Button>
                    </a>
                  </CardBody>
                </Card>
              </Col>
          )}   
           ) :<p className="no-data-prompt"> </p>}
        </div>
      </div>)
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProps, {searchActivities, createActivity, findMatches, loadUsersCollection, loadActivitiesCollection}) (HomePage)
