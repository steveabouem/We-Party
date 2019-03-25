import React from "react";
import "firebase/database";
import firebase from "firebase";
import { Card, CardImg, CardText, CardBody,  CardTitle, Button, Col } from "reactstrap";
import Navigation from "../navigation/Navigation.jsx";
import TextField from "./TextField";
import Confirmation from "./ConfirmPopUp";
import Modal from "../modals";
import {
  retrieveuser, searchActivities, sendEmail,
  createActivity, loadUsersCollection,
  loadActivitiesCollection, retrieveJoinedProps, randomKey
} from "../../actions";
import { connect } from "react-redux";
import { log } from "util";


class HomePage extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      loggedIn: null,
      list: null,
      currentUser: null,
      isModalOpened: false,
      noResultModal: false,
      loginModal: false,
      paymentModal: false
    }

    firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({ currentUser: currentUser });
    });
  }
  
  handleKeyPress = (e) => {
    if (e.keyCode === 13 && !this.state.isModalOpened) {
      this.recordSearch();
    } else if (e.keyCode === 13 && this.state.isModalOpened) {
      this.closeModal();
    }
  }
  
  closeModal = () => {
      this.setState({
        noResultModal: false,
        isModalOpened: false,
        loginModal: false,
        paymentModal: false
      });
  }
  
  recordSearch = async() => {
    let input = document.getElementById("SEARCH_VENUE").value,
      groupTotal = document.getElementById("how-many").value,
      budget = document.getElementById("budget-selected").innerHTML,
      gender = document.getElementById("gender-selected").innerHTML,
      eventDate = document.getElementById("when").value;
    
    if (input === "" || groupTotal === "" || budget === "" 
      || input === " " || groupTotal === " " ||
      budget === "Pick an amount" || gender === "Edit your group" ||
      eventDate === "") {
      
      this.setState({
        isModalOpened: true
      });
    } else {
      await this.props.searchActivities(input);
      if (this.props.userInfo.searchResults === "No results found:(") {
        this.setState({
          	noResultModal: true
        });
      } else {
        window.scrollTo({
          top: 400,
          left: 0,
          behavior: "smooth"
        })
      }
    }
  }
  
  createActivity = (e,object) => {
    let currentUser = this.state.currentUser,
    key = this.props.randomKey(),
    groupTotal = document.getElementById("how-many").value,
    budget = document.getElementById("budget-selected").innerHTML,
    gender = document.getElementById("gender-selected").innerHTML,
    eventDate = document.getElementById("when").value,
    date = new Date(), 
    dateString = date.toString().split(" ").slice(0, 5),
    created = `${dateString[0]}, ${dateString[1]} ${dateString[2]} ${dateString[3]}`,
      activityObject = {
        id: object.id.split("").slice(Math.floor(Math.random(0, 14) * 10), 14).join(""),
        currentUser: currentUser, creator: currentUser, venue: object.name,
        location: object.location.address1, contact: object.phone, contribution: budget,
        group: groupTotal, members: [currentUser], genders: gender, created: created,
        eventDate: eventDate, key: key
      };

    for( let key in activityObject ) {//prevent DB from having empty string. 
      if(activityObject[key] === "" || activityObject[key] === " " || activityObject[key] === "Pitch in") {
        activityObject[key] = null
      }
    };
    this.props.createActivity(activityObject, firebase.auth().currentUser.uid);
  }
  
  focus = async() => {
    this.setState({
      loginModal: true
    });
    let loginButton = document.getElementsByClassName('link-primary')[0];
    loginButton.focus();
  }

  async componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
    {firebase.auth().currentUser ? this.props.retrieveuser(firebase.auth().currentUser.uid) : null }
    await this.props.loadUsersCollection();
    await this.props.loadActivitiesCollection();
    await this.props.retrieveJoinedProps(this.props.userInfo.userInfo);
  }
  

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  render (){
    const ApiResponse = this.props.userInfo.searchResults;
    return(
        <div className="home-container">
          <Navigation />
          {
              this.state.paymentModal
              ?
              <Modal
                isOpen={true}
                hasConfirm={true}
                hasCancel={true}
                top="20%"
                right="45%"
                message="Pay now"
                callback={e => {e.stopPropagation(); this.props.history.push("/payment")}}
                cancel={e=>{this.closeModal()}}
              />
                :
                null
            }
          <div className="image-holder">
            <div className="row">
              <div>
                <div className="input-group">
                  <span className="form-wrapper" style={{padding: "1%"}}>
                    <TextField style={{margin: "1%"}}/>
                    {!firebase.auth().currentUser?
                      <button style={{width: "100px", height: "100%"}} id="disabled-button" onClick={this.focus}>
                        Please Login
                      </button>
                      :
                      <button className="button-primary" style={{width: "100px", height: "100%"}} onClick={this.recordSearch}>
                        Find Match!
                      </button>
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="results-cards">
          {
              !this.state.currentUser && this.state.loginModal
              ?
              <Modal
                isOpen={true}
                hasConfirm={false}
                hasCancel={true}
                top="20%"
                right="45%"
                message="Please login first"
                cancel={e=>{this.closeModal(); this.props.history.push("/");}}
              />
                :
                null
            }
            {
              this.state.isModalOpened
              ?
              <Modal
                isOpen={true}
                hasConfirm={false}
                hasCancel={true}
                top="20%"
                right="45%"
                message="Please complete all the fields."
                cancel={e=>this.closeModal()}
              />
                :
                null
            }
            {
              this.state.noResultModal
              ?
              <Modal
                isOpen={true}
                hasConfirm={false}
                hasCancel={true}
                top="20%"
                right="45%"
                message="No Results Found for this Search..."
                cancel={e=>this.closeModal()}
              />
                :
              null  
            }
            {ApiResponse && ApiResponse !== "No results found:(" && ApiResponse.length > 0 ? ApiResponse.map(result => {
              return (
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
                        <span className="material-icons">phone_android</span>: {result.display_phone} <br/>
                      </span>
                      <span>
                        <span className="material-icons">location_on</span>: {result.location.address1} <br/>
                      </span>
                      distance:  {result.distance} <br/>
                    </CardText>
                    <a href={result.url} target="blank">
                      <Button className="button-secondary">Venue details...</Button>
                    </a>
                  </CardBody>
                </Card>
              </Col>
              )}   
              ) : <p className="no-data-prompt"> </p>}
            </div>
          </div>
      )
        }
      }
      
      const mapStateToProps = state => ({
        userInfo: state.userInfo
      })
      
      export default connect(mapStateToProps, { searchActivities, sendEmail, retrieveuser, createActivity, loadUsersCollection, loadActivitiesCollection, retrieveJoinedProps, randomKey}) (HomePage)
      