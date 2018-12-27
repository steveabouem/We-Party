import React from "react";
import "firebase/database";
import { Card, CardImg, CardText, CardBody,  CardTitle, Button, Col } from "reactstrap";
import Navigation from "../navigation/Navigation.jsx";
import TextField from "./TextField";
import Confirmation from "./ConfirmPopUp";
import ConfirmationModal from "../modals/confirmation";
import { success } from "../modals/content";
import location  from "../../utils/icons/location.svg";
import phone  from "../../utils/icons/smartphone.svg";
import {  searchActivities, createActivity, loadUsersCollection, loadActivitiesCollection, retrieveJoinedProps, randomKey } from "../../actions";
import { connect } from "react-redux";


class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      loggedIn: null,
      list: null
    }
  }
  
  async componentDidMount() {
    console.log(this.props.randomKey());
    
    await this.props.loadUsersCollection();
    await this.props.loadActivitiesCollection();
    if(this.props.userInfo.userInfo) {
      this.props.retrieveJoinedProps(this.props.userInfo.userInfo)
    }
  }
  
  recordSearch = async() => {
    let input = document.getElementById("SEARCH_VENUE").value; 
    
    await this.props.searchActivities(input);
  }
  
  createActivity = (e,object) => {
    let currentUser = this.props.userInfo.userInfo,
    key = this.props.randomKey(),
    groupTotal = document.getElementById("how-many").value,
    budget = document.getElementById("budget-selected").innerHTML,
    gender = document.getElementById("gender-selected").innerHTML,
    date = new Date(), 
    dateString = date.toString().split(" ").slice(0, 5),
    created = `${dateString[0]}, ${dateString[1]} ${dateString[2]} ${dateString[3]}`,
    activityObject = { id: object.id.split("").slice(Math.floor(Math.random(0, 14) * 10), 14).join(""), currentUser: currentUser , creator: currentUser, venue: object.name, location:object.location.address1, contact: object.phone, contribution: budget, group: groupTotal, members: [currentUser], genders: gender, created: created, key: key };

    for( let key in activityObject ) {
      if(activityObject[key] === "" || activityObject[key] === " " || activityObject[key] === "Pitch in") {
        activityObject[key] = "(not provided)"
      }
    };
    
    this.props.createActivity(activityObject);
  }
  
  focus = async() => {
    let loginButton = document.getElementsByClassName('link-primary')[0];
    loginButton.focus();
    
  }

  render (){
    
    const ApiResponse = this.props.userInfo.searchResults;
    
    return(
      <div className="home-container">
        <Navigation />
        <div className="image-holder">
          <div className="row">
            <div className="col-lg-8">
              
              {!this.props.userInfo.userInfo.email? <ConfirmationModal hints={success.homeHint} open={true} index={0} />
                :
                <ConfirmationModal hints={success.homeHint} open={false} index={1} min={6} max={0}/>
              }
              
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
            </div>
          </div>
        </div>
        <div className="results-cards">
          {ApiResponse !== undefined && ApiResponse.length > 0 ? ApiResponse.map(result => {
            
            return(
            <Col md = {{ size: 10 }} key={result.alias}>
              <Card className="result-cards">
                <Confirmation key = {result.id} yelpResult = {result} createActivity = {this.createActivity} activitiesList={this.props.userInfo.activitiesList} />
                
                <CardImg top width="100%" height="200px" src={result.image_url} />
                <CardBody>
                  <CardTitle> Venue: <br/> {result.name} </CardTitle>
                  <CardText>
                    Description: <br/>
                    Yelp rating: {result.rating} ({result.review_count} reviews) <br/>
                    <span>
                      <img src={phone} alt="phone" className="result-icon" />: {result.display_phone} <br/>
                    </span>
                    <span>
                      <img src={location} alt="location" className="result-icon" />: {result.location.address1} <br/>
                    </span>
                    {/* distance:  {result.distance} <br/> */}
                  </CardText>
                  <a href={result.url} target="blank">
                    <Button className="button-secondary">Venue details...</Button>
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
      
      export default connect(mapStateToProps, { searchActivities, createActivity, loadUsersCollection, loadActivitiesCollection, retrieveJoinedProps, randomKey}) (HomePage)
      